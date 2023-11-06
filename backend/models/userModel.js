import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
        unique:false
    },
    password:{
        type:String,
        required:true
    },
    accounttype:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    branchname:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    dob:{
        type:String,
        required:false
    },
    identificationdocumentno:{
        type:String,
        required:false
    },
    identifyproof:{
        type:String,
        required:false
    },
    deposit:{
        type:Number,
        required:false
    },
    mobilenumber:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    } ,
    citizenstatus:{
        type:String,
        required:false
    },
    loantype:{
        type:String,
        required:false
    },
    coursefee:{
        type:String,
        required:false
    },
    course:{
        type:String,
        required:false
    },
    fathername:{
        type:String,
        required:false
    },
    fatheroccupation:{ 
        type:String,
        required:false
    },
    annualincome:{ 
        type:String,
        required:false
    },
    companyname:{ 
        type:String,
        required:false
    },
    designation:{ 
        type:String,
        required:false
    },
    totalexpirence:{ 
        type:String,
        required:false
    },
    currentcompanyexp:{ 
        type:String,
        required:false
    },
    loanamount:{ 
        type:String,
        required:false
    },
    loanapplydate:{ 
        type:String,
        required:false
    },
    rateofintrest:{ 
        type:String,
        required:false
    },
    loanduration:{ 
        type:String,
        required:false
    }
}, {
    timeStamps:false
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
     next()
    }

    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchPasswords= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User= mongoose.model('User', userSchema);

export default User;