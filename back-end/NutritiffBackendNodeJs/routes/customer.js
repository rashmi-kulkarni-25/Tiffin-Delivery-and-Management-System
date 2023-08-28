const express = require('express')
const customerRouter = express.Router()
const db = require('../db')

//1
//Login: /customer/login
// customerRouter.post('/login', (request, response) => {
//   const statement = `select * from customers where email = '${request.body.email}' and 
//   password = '${request.body.password}' and active_status = 'active'`
  
//   db.query(statement, (error, data) => {
//     if (error) {
//       response.send('error')
//     } else {
//       response.send(data)
//     }
//   })
// })

customerRouter.post('/login', (request, response) => {
  const statement = `SELECT *
  FROM customers
  WHERE email = '${request.body.email}' and password = '${request.body.password}'
  UNION ALL
  SELECT 'not found', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
  WHERE NOT EXISTS (
      SELECT 2
      FROM customers
      WHERE email = '${request.body.email}' and password = '${request.body.password}'
  );`
  
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//2
//Register: /customer/register
customerRouter.post('/register', (request, response) => {
    const statement = `insert into customers values(default,'${request.body.name}',
    '${request.body.home_address}','${request.body.work_address}','${request.body.pincode}',
    '${request.body.email}','${request.body.password}','${request.body.mob_no}',default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//3
//Show tiffins: /customer/tiffins
customerRouter.get('/tiffins', (request, response) => {
    const statement = `select * from tiffins
                          where status = 'active'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//4
//Show tiffins: /customer/tiffins/veg
customerRouter.get('/tiffins/veg', (request, response) => {
    const statement = `select * from tiffins
                          where status = 'active' and tiffin_category='veg'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//5
//Show tiffins: /customer/tiffins/nonveg
customerRouter.get('/tiffins/nonveg', (request, response) => {
    const statement = `select * from tiffins
                          where status = 'active' and tiffin_category='nonveg'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })


customerRouter.get('/placeorder', (request, response) => {
  const statement = `insert into orders values(default, ${request.body.customer_id},
    ${request.body.tiffin_id},${request.body.customer_id},${request.body.tiffin_price},
    default, (select GenerateRandomAlphanumericString(8)) ,default);`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//6
//Add to cart: /customer/cart
customerRouter.post('/cart', (request, response) => {
    const statement = `insert into cart values(default, ${request.body.customer_id},
        ${request.body.tiffin_id}, default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//7
//Update cart: /customer/cart/increase
customerRouter.put('/cart/increase', (request, response) => {
    const statement = `update cart set quantity = quantity + 1 
    where cart_id = ${request.body.cart_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//7
//Update cart: /customer/cart/decrease
customerRouter.put('/cart/decrease', (request, response) => {
  const statement = `update cart set quantity = quantity - 1 
    where cart_id = ${request.body.cart_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//8
//view my orders: /customer/myorders
customerRouter.get('/myorders', (request, response) => {
    const statement = `select * from orders where customer_id=${request.body.customer_id}
     and status='ordered'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//9
//view my orders: /customer/myorders
customerRouter.delete('/myorders', (request, response) => {
    const statement = `update orders set status = 'canceled' where order_id=${request.body.order_id}
     and status='ordered'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  customerRouter.post('/myorders', (request, response) => {
    const statement = `select orders.order_id, order_items.tiffin_id, tiffins.tiffin_name, order_items.quantity, tiffins.tiffin_price,
    orders.transaction_id, orders.timestamp, orders.status from order_items, orders, tiffins
    where order_items.order_id = orders.order_id and order_items.tiffin_id = tiffins.tiffin_id 
    and orders.customer_id = ${request.body.customer_id} and orders.status='ordered';`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  customerRouter.post('/orderhistory', (request, response) => {
    const statement = `select orders.order_id, order_items.tiffin_id, tiffins.tiffin_name, order_items.quantity, tiffins.tiffin_price,
    orders.transaction_id, orders.timestamp, orders.status from order_items, orders, tiffins
    where order_items.order_id = orders.order_id and order_items.tiffin_id = tiffins.tiffin_id 
    and orders.customer_id = ${request.body.customer_id};`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//10
//view canceled orders: /customer/myorders
customerRouter.get('/calceledorders', (request, response) => {
    const statement = `select * from orders where customer_id=${request.body.customer_id}
    and status='canceled'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  customerRouter.post('/cancelorder', (request, response) => {
    const statement = `update orders set status = 'canceled' where order_id = ${request.body.order_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })


customerRouter.post('/getsubscription', (request, response) => {
  const statement = `select subscription_purchases.purchase_id, subscription_purchases.status, subscription_plans.name, 
  subscription_plans.description, subscription_plans.price, subscription_plans.no_of_meals, subscription_purchases.transaction_id 
  from subscription_purchases, subscription_plans where subscription_plans.plan_id = subscription_purchases.plan_id and 
  subscription_purchases.customer_id = ${request.body.customer_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})



//13
//get profile by id: /customer/{id}
customerRouter.post('/getcustomer', (request, response) => {
  const statement = `select * from customers where customer_id = ${request.body.id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

customerRouter.delete('/unlike', (request, response) => {
  const statement = `delete from favorites where customer_id = ${request.body.customer_id} and 
  tiffin_id = ${request.body.tiffin_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//11
//update profile: /customer/updateprofile
customerRouter.put('/updateprofile', (request, response) => {
    const statement = `update customers set name = '${request.body.name}', 
    home_address = '${request.body.home_address}', work_address = '${request.body.work_address}',
    pincode = '${request.body.pincode}', email = '${request.body.email}', 
    mob_no = '${request.body.mob_no}' where customer_id = ${request.body.customer_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//12
//change password: /customer/changepass
customerRouter.put('/changepass', (request, response) => {
    const statement = `update customers set password = '${request.body.password}'
    where customer_id = ${request.body.customer_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  customerRouter.post('/myfavorites', (request, response) => {
    const statement = `select tiffins.tiffin_id, tiffins.tiffin_name, tiffins.description,
     tiffins.tiffin_category, tiffins.tiffin_price, tiffins.image_link
    from favorites, tiffins where tiffins.tiffin_id = favorites.tiffin_id 
    and favorites.customer_id = ${request.body.customer_id};`;
    db.query(statement, (error, data) => {
        if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })
  

  customerRouter.post('/uploadtiffin', (request, response) => {
    const statement = `insert into sample values(default, '${request.body.image}')`;
    db.query(statement, (error, data) => {
        if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
})

customerRouter.post('/getcartitems', (request, response) => {
  const statement = `select cart.cart_id, tiffins.tiffin_id, tiffins.tiffin_name, tiffins.description, tiffins.tiffin_category, 
  tiffins.tiffin_price, tiffins.image_link, cart.quantity
  from cart, tiffins where tiffins.tiffin_id = cart.tiffin_id and cart.customer_id = ${request.body.customer_id};`;
  db.query(statement, (error, data) => {
      if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

customerRouter.post('/getcarttotal', (request, response) => {
  const statement = `select sum(tiffins.tiffin_price*cart.quantity) as tot from cart, 
  tiffins where cart.tiffin_id = tiffins.tiffin_id and cart.customer_id = ${request.body.customer_id};`;
  db.query(statement, (error, data) => {
      if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

customerRouter.post('/removefromcart', (request, response) => {
  const statement = `delete from cart where cart_id = ${request.body.cart_id}`;
  db.query(statement, (error, data) => {
      if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})




module.exports = customerRouter