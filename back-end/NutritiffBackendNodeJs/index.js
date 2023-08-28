const express =  require('express');
const cors = require('cors')

// =================================================================
const tiffinRouter = require('./routes/tiffin');
const customerRouter = require('./routes/customer');
const cartRouter = require('./routes/cart');
const vendorRouter = require('./routes/vendor');
const adminRouter = require('./routes/admin');
// =================================================================

const app = express();
app.use(cors('*'))
app.use(express.json())

app.get('/', (request, response) => {
    response.send('welcome to the my APIs')
  })    

// =================================================================
app.use('/tiffin',tiffinRouter)
app.use('/customer',customerRouter)
app.use('/cart',cartRouter)
app.use('/vendor',vendorRouter)
app.use('/admin',adminRouter)
// =================================================================

app.listen(9999,()=>{console.log("Server Started at 9999")})