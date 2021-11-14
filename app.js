const bodyParser = require('body-parser')
const express=require('express')
const path=require('path')
const router=require('./routes/router')

const app=express()
const port =process.env.port||5000

// template engine set
app.set('view-engine','ejs')
// take the input data as a jason format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))
// handle static files
app.use(express.static(path.join(__dirname,'public')))

app.use('/',router)

// listening at port number 5000
app.listen(port,()=>{
    console.log("server is listening")
})