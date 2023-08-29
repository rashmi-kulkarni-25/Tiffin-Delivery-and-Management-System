const express = require('express')
const adminRouter = express.Router()
const db = require('../db')

//1
//To login admin
//   /admin/login
adminRouter.post('/login', (request, response) => {
    const statement = `select * from admin 
    where admin_id = ${request.body.admin_id} and password = '${request.body.password}'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//2
//To display approval requests to admin
//   /admin/approvalrequests
adminRouter.get('/approvalrequests', (request, response) => {
    const statement = `select vendors.vendor_id, vendors.name, vendors.email, vendors.mob_no
    from vendors, approval_requests where approval_requests.vendor_id = vendors.vendor_id 
    and approval_requests.status = 'pending'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//3
//To display approved vendor's list
//   /admin/approvedvendors
adminRouter.get('/approvedvendors', (request, response) => {
    const statement = `select vendors.vendor_id, vendors.name, vendors.email, vendors.mob_no
    from vendors, approval_requests where approval_requests.vendor_id = vendors.vendor_id 
    and vendors.status = 'approved'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//4
//To approve the vendor
//   /admin/approve
adminRouter.put('/approve', (request, response) => {
    const statement = `update approval_requests set status = 'approved' 
    where vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//5
//To approve the vendor
//   /admin/approvevendor
adminRouter.put('/approvevendor', (request, response) => {
    const statement = `update vendors set status = 'approved' 
    where vendor_id = ${request.body.vendor_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

  //7
  //To reject the vendor
//   /admin/reject
adminRouter.put('/reject', (request, response) => {
  const statement = `update approval_requests set status = 'rejected' 
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
//To reject the vendor
//   /admin/rejectvendor
adminRouter.put('/rejectvendor', (request, response) => {
  const statement = `update vendors set status = 'rejected' 
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
//To display feedbacks and complaints to admin
//   /admin/feedbackcomplaints
adminRouter.get('/feedbackcomplaints', (request, response) => {
    const statement = `select fc_id, customers.customer_id, tiffins.tiffin_name, vendors.name, 
    feedback_complaints.category, feedback_complaints.description from feedback_complaints,
    vendors, tiffins, customers where customers.customer_id = feedback_complaints.customer_id 
    and tiffins.tiffin_id = feedback_complaints.tiffin_id and vendors.vendor_id = 
    feedback_complaints.vendor_id`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//10
//To display only 'under review' complaints
//   /admin/underreview
adminRouter.get('/underreview', (request, response) => {
    const statement = `select fc_id, customers.customer_id, tiffins.tiffin_name, vendors.name, 
    feedback_complaints.category, feedback_complaints.description from feedback_complaints,
    vendors, tiffins, customers where customers.customer_id = feedback_complaints.customer_id 
    and tiffins.tiffin_id = feedback_complaints.tiffin_id and vendors.vendor_id = 
    feedback_complaints.vendor_id and feedback_complaints.status = 'under review'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//11
//To display only 'resolved' complaits
//   /admin/resolved
adminRouter.get('/resolved', (request, response) => {
    const statement = `select fc_id, customers.customer_id, tiffins.tiffin_name, vendors.name, 
    feedback_complaints.category, feedback_complaints.description from feedback_complaints,
    vendors, tiffins, customers where customers.customer_id = feedback_complaints.customer_id 
    and tiffins.tiffin_id = feedback_complaints.tiffin_id and vendors.vendor_id = 
    feedback_complaints.vendor_id and feedback_complaints.status = 'resolved'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//12
//To display only 'escalated' complaints
//   /admin/escalated
adminRouter.get('/escalated', (request, response) => {
    const statement = `select fc_id, customers.customer_id, tiffins.tiffin_name, vendors.name, 
    feedback_complaints.category, feedback_complaints.description from feedback_complaints,
    vendors, tiffins, customers where customers.customer_id = feedback_complaints.customer_id 
    and tiffins.tiffin_id = feedback_complaints.tiffin_id and vendors.vendor_id = 
    feedback_complaints.vendor_id and feedback_complaints.status = 'escalated'`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//13
//To mark the complaint as 'resolved'
//   /admin/resolve
adminRouter.put('/resolve', (request, response) => {
    const statement = `update feedback_complaints set status = 'resolved' 
    where fc_id = ${request.body.fc_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//14
//To mark the complaint as 'escalated'
//   /admin/escalate
adminRouter.put('/escalate', (request, response) => {
    const statement = `update feedback_complaints set status = 'escalated' 
    where fc_id = ${request.body.fc_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//15
//To display subscription plans
//   /admin/plans
adminRouter.get('/plans', (request, response) => {
  const statement = `select * from subscription_plans`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//16
//To add new suncription plan
//   /admin/addplan
adminRouter.post('/addplan', (request, response) => {
  const statement = `insert into subscription_plans values (default, '${request.body.name}',
  '${request.body.description}', ${request.body.price}, ${request.body.no_of_meals})`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//17
//To get details of subscription plan by planId
//   /admin/getplanbyid
adminRouter.post('/getplanbyid', (request, response) => {
  const statement = `select * from subscription_plans where plan_id = ${request.body.id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})


//18
//To edit subscription plan details
//   /admin/updateplan
adminRouter.put('/updateplan', (request, response) => {
  const statement = `update subscription_plans set name = '${request.body.name}', 
  description = '${request.body.description}', price = ${request.body.price},
  no_of_meals = ${request.body.no_of_meals} where plan_id = ${request.body.plan_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//19
//To remove the subscription plan
//   /admin/deleteplan
adminRouter.delete('/deleteplan', (request, response) => {
  const statement = `delete from subscription_plans where plan_id = ${request.body.plan_id}`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//20
//To display subscription purchase history
//   /admin/subscriptions
adminRouter.get('/subscriptions', (request, response) => {
  const statement = `select * from subscription_purchases`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//21
//To display order's history
//   /admin/orders
adminRouter.get('/orders', (request, response) => {
  const statement = `select * from orders`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//22
//To display the revenue of year from individual orders
//   /admin/sumofrevenuebyyear
adminRouter.get('/sumofrevenuebyyear', (request, response) => {
  const statement = `select sum(price) as sum from subscription_purchases, subscription_plans where subscription_plans.plan_id = subscription_purchases.plan_id
  and year(subscription_purchases.timestamp) = year(now());`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

module.exports = adminRouter