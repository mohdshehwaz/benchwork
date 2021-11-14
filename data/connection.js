const mongoose=require('mongoose')
const connUrl='mongodb://127.0.0.1:27017/loginDatabase'
mongoose.connect(connUrl)
.then(()=>{
    console.log("connection has been established to the server")
})
.catch((e)=>{
    console.log(e.message)
})