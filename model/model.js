const mongoose=require('mongoose')

const LoginData=mongoose.model('LoginData',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

module.exports=LoginData