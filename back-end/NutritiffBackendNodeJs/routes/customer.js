const express = require('express')
const customerRouter = express.Router()
const db = require('../db')


//1
//To login the customer
//   /customer/login
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
//To register the customer
//   /customer/register
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
//To dispplay all tiffins to customer
//   /customer/tiffins
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
//To display only veg tiffins to customer
//   /customer/tiffins/veg
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
//To display only non veg tiffins to customer
//   /customer/tiffins/nonveg
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

//6
//To place order
//   /customer/placeorder
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

//7
//To add a tiffin to cart
//  /customer/cart
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

//8
//To increase the quantity of tiffins in cart
//   /customer/cart/increase
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

//9
//To decrease the quantity of tiffins in cart
//   /customer/cart/decrease
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

//10
//To display customer's order history
//   /customer/myorders
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

//11
//To cancel the order
//   /customer/myorders
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

  //12
  //To display customer's order history where tiffins are still in ordered status
  //   /customer/myorders
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

//13
//To display order history to customer
//   /customer/orderhistory
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

//14
//To display canceled order's history
//   /customer/canceledorders
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

  //15
  //To cancel the order
  //   /customer/cancelorder
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

//16
//To get the subscription plan details by customerId
//   /customer/getsubscription
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



//17
//To get the customer's details by customerId
//   /getcustomer
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

//18
//To remove the tiffin from favorites
//   /customer/unlike
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

//19
//To edit the customer's profile
//   /customer/updateprofile
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

//20
//To change customer's password
//   /customer/changepass
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

  //21
  //To display the favorite tiffins
  //   /customer/myfavorites
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
  
//22
//Deprecated
//   customerRouter.post('/uploadtiffin', (request, response) => {
//     const statement = `insert into sample values(default, '${request.body.image}')`;
//     db.query(statement, (error, data) => {
//         if (error) {
//         response.send('error')
//       } else {
//         response.send(data)
//       }
//     })
// })

//23
//To display cart
//   /customer/getcartitems
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

//24
//To get total amount of cart
//   /customer/getcarttotal
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

//25
//To remove a tififin from cart
//   /customer/removecart
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