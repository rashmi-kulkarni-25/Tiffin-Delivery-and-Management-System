const express = require('express')
const vendorRouter = express.Router()
const db = require('../db')

const multer = require('multer')
const upload = multer({dest: 'uploads'})

//1
//Login: /vendor/login
// vendorRouter.post('/login', (request, response) => {
//     const statement = `select vendor_id, name, email, password from vendors 
//     where email = '${request.body.email}' and password = '${request.body.password}'`
//     db.query(statement, (error, data) => {
//       if (error) {
//         response.send('error')
//       } else {
//         response.send(data)
//       }
//     })
//   })

  vendorRouter.post('/login', (request, response) => {
    const statement = `SELECT *
    FROM vendors
    WHERE email = '${request.body.email}' and password = '${request.body.password}'
    UNION ALL
    SELECT 'not found', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
    WHERE NOT EXISTS (
        SELECT 2
        FROM vendors
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
//Register: /vendor/register
vendorRouter.post('/register', (request, response) => {
    const statement = `insert into vendors values(default,'${request.body.name}',
    '${request.body.address}','${request.body.pincode}','${request.body.email}',
    '${request.body.password}','${request.body.mob_no}',default, default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//3
//Vendor Home: /vendor/home
// vendorRouter.get('/mytiffins', (request, response) => {
//     const statement = `select * from tiffins where vendor_id = ${request.body.vendor_id} 
//     and status = 'active'`
//     db.query(statement, (error, data) => {
//       if (error) {
//         response.send('error')
//       } else {
//         response.send(data)
//       }
//     })
//   })

vendorRouter.post('/getmytiffins', (request, response) => {
  const statement = `select * from tiffins where vendor_id = ${request.body.vendor_id} and status = 'active'`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

  vendorRouter.post('/getmyorders', (request, response) => {
    const statement = `select orders.order_id, customers.name, customers.home_address, 
    customers.work_address, vendors.name as vendor_name, tiffins.tiffin_name,
    order_items.quantity from order_items, orders, customers, tiffins, vendors where
    vendors.vendor_id = tiffins.vendor_id and tiffins.tiffin_id = order_items.tiffin_id and order_items.order_id = orders.order_id
    and orders.customer_id = customers.customer_id and vendors.vendor_id = ${request.body.vendor_id} and orders.status = 'ordered'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  

//4
// vendorRouter.post('/addtiffin', upload.single('image'), (request, response) => {
//   const { tiffin_name, description, tiffin_category, tiffin_price, vendor_id } = request.body

//   // request has a property named file which gives details of uploaded file
//   // console.log(request.file)
//   const filename = request.file.filename

//   db.query(
//     `insert into tiffins (tiffin_name, description, tiffin_category, tiffin_price, vendor_id, 
//       image_link) values (?, ?, ?, ?, ?, ?)`,
//     [tiffin_name, description, tiffin_category, tiffin_price,vendor_id, filename],
//     (error, data) => {
//       if (error) {
//         response.send('error')
//       } else {
//         response.send(data)
//       }
//     })
// })

//4
//Add tiffin: /vendor/addtiffin
vendorRouter.post('/addtiffin', (request, response) => {
    const statement = `insert into tiffins values(default, '${request.body.tiffin_name}', 
    '${request.body.description}', '${request.body.tiffin_category}', 
    ${request.body.tiffin_price} , ${request.body.vendor_id}, '${request.body.image_link}',default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  vendorRouter.post('/orderhistory', (request, response) => {
    const statement = `select customers.name, tiffins.tiffin_name, order_items.quantity, orders.total_price, orders.timestamp from order_items,
    orders, customers, tiffins where customers.customer_id = orders.customer_id and orders.order_id = order_items.order_id
    and order_items.tiffin_id = tiffins.tiffin_id and tiffins.vendor_id = ${request.body.vendor_id}
     and orders.status = 'delivered'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })


vendorRouter.post('/getmytiffin', (request, response) => {
  const statement = `select * from tiffins where tiffin_id = ${request.body.tiffin_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//5
//Update tiffin: /vendor/updatetiffin
vendorRouter.put('/updatetiffin', (request, response) => {
    const statement = `update tiffins set tiffin_name = '${request.body.tiffin_name}', 
    description = '${request.body.description}', tiffin_category = '${request.body.tiffin_category}', 
    tiffin_price = ${request.body.tiffin_price} where tiffin_id = ${request.body.tiffin_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//6
//Delete tiffin: /vendor/deletetiffin
vendorRouter.delete('/deletetiffin', (request, response) => {
    const statement = `update tiffins set status = 'inactive' 
    where tiffin_id = ${request.body.tiffin_id} and vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  vendorRouter.post('/getvendorbyid', (request, response) => {
    const statement = `select * from vendors where vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//7
//Update profile: /vendor/updateprofile
vendorRouter.put('/updateprofile', (request, response) => {
    const statement = `update vendors set name = '${request.body.name}', 
    address = '${request.body.address}', pincode = '${request.body.pincode}', 
    email = '${request.body.email}', mob_no = '${request.body.mob_no}' 
    where vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//8
//Change password: /vendor/changepass
vendorRouter.put('/changepass', (request, response) => {
    const statement = `update vendors set password = '${request.body.password}' 
    where vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//9
//View feedback/complaints: /vendor/feedbackcomplaints
vendorRouter.post('/feedbackcomplaints', (request, response) => {
    const statement = `select customers.name, tiffins.tiffin_name, feedback_complaints.category,
    feedback_complaints.description, feedback_complaints.status from feedback_complaints, 
    tiffins, vendors, customers where customers.customer_id=feedback_complaints.customer_id and
    tiffins.vendor_id = vendors.vendor_id and tiffins.tiffin_id = 
    feedback_complaints.tiffin_id and vendors.vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//10
//View feedback/complaints: /vendor/underreview
vendorRouter.get('/underreview', (request, response) => {
  const statement = `select customers.name, tiffins.tiffin_name, feedback_complaints.category,
  feedback_complaints.description, feedback_complaints.status from feedback_complaints, 
  tiffins, vendors, customers where customers.customer_id=feedback_complaints.customer_id and
  vendors.vendor_id = feedback_complaints.vendor_id and tiffins.tiffin_id = 
  feedback_complaints.tiffin_id and feedback_complaints.vendor_id = ${request.body.vendor_id} 
  and feedback_complaints.status = 'under review'`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//11
//Approval request: /vendor/approvalrequest
vendorRouter.post('/approvalrequest', (request, response) => {
    const statement = `insert into approval_requests values(default, 
        ${request.body.vendor_id}, default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  vendorRouter.put('/deliver', (request, response) => {
    const statement = `update orders set status = 'delivered' where order_id = ${request.body.order_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

module.exports = vendorRouter