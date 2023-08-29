const express = require('express')
const cartRouter = express.Router()
const db = require('../db')

//1
//To display the items in cart to customer
//   /cart
cartRouter.get('/', (request, response) => {
    const statement = `select tiffins.tiffin_name, tiffins.tiffin_category, tiffins.tiffin_price,
     cart.quantity from cart, tiffins
     where tiffins.tiffin_id = cart.tiffin_id and customer_id = ${request.body.customer_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//2
//To remove the tiffin from cart
//   /cart
cartRouter.delete('/', (request, response) => {
    const statement = `delete from cart where cart_id = ${request.body.cart_id}`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//3
//To place order from cart
//   /cart
cartRouter.post('/', (request, response) => {
    const statement = `insert into orders values(default, ${request.body.customer_id},
        ${request.body.tiffin_id}, ${request.body.total_price}, default, default, default)`
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })
  
module.exports = cartRouter