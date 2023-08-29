const express = require('express')
const router = express.Router()
const db = require('../db')

//deprecated
router.get('/', (request, response) => {
  const statement = `select tiffin_name, description, tiffin_category, tiffin_price from tiffins
                        where status = 'active'`
  db.query(statement, (error, data) => {
    if (error) {
      response.send('error')
    } else {
      response.send(data)
    }
  })
})

//deprecated
router.get('/:id', (request, response) => {
    const statement = `select tiffin_name, description, tiffin_category, tiffin_price from tiffins
                          where status = 'active' and tiffin_id = ${request.params.id}`;
    db.query(statement, (error, data) => {
      if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
  })

//deprecated
  router.post('/', (request, response) => {
    const statement = `insert into tiffins values(default, '${request.body.tiffin_name}', '${request.body.description}'
    ,'${request.body.tiffin_category}', ${request.body.tiffin_price}, '${request.body.vendor_id}', default)`;
    db.query(statement, (error, data) => {
        if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
})

//deprecated
router.delete('/:id', (request, response) => {
    const statement = `update tiffins set status = 'inactive' where tiffin_id = ${request.params.id}`;
    db.query(statement, (error, data) => {
        if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
})

//deprecated
router.put('/:id', (request, response) => {
    const statement = `update tiffins set tiffin_name='${request.body.tiffin_name}',
    description = '${request.body.description}', tiffin_category =  '${request.body.tiffin_category}'
    ,tiffin_price = ${request.body.tiffin_price} where tiffin_id = ${request.params.id}`;
    db.query(statement, (error, data) => {
        if (error) {
        response.send('error')
      } else {
        response.send(data)
      }
    })
})

module.exports = router