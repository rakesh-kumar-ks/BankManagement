import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc  Auth User/set token
// route POST/api/users/auth
// @access Public
const authUser= asyncHandler(async (req,res)=>{
   const {username, password}= req.body;
   const user= await User.findOne({username})

   if(user && await user.matchPasswords(password)){
    const token= await generateToken(res, user._id)
    console.log(token)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        username:user.username,
        email:user.email,
        token:generateToken(user._id),
        status:res.statusCode
    })
} else{
    res.status(401);
    throw new Error('Invalid email or password')
}
})


// @desc  Register a new user
// route POST/api/users
// @access Public
const registerUser= asyncHandler(async (req,res)=>{
   
    const {name, username, email, password,accounttype,address,branchname,country,dob,identificationdocumentno,
        identifyproof,deposit,mobilenumber,state,citizenstatus}= req.body;

    const userExists= await User.findOne({username});

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user= await User.create({
        name,username,email,password,accounttype,address,branchname,country,dob,identificationdocumentno,
        identifyproof,deposit,mobilenumber,state,citizenstatus
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            password:user.password,
            accounttype:user.accounttype,
            address:user.address,
            branchname:user.branchname,
            country:user.country,
            dob:user.dob,
            identificationdocumentno:user.identificationdocumentno,
            identifyproof:user.identifyproof,
            deposit:user.deposit,
            mobilenumber:user.mobilenumber,
            state:user.state,
            citizenstatus:user.citizenstatus,
            token: generateToken(user._id),
            status:res.statusCode

        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})


// @desc  User Apply Loan
// route POST/api/users
// @access Public
const applyLoan= asyncHandler(async (req,res)=>{
   
   

    const userId = req.params.id;
    const {loantype, coursefee, course, fathername,fatheroccupation,annualincome,companyname,designation,totalexpirence,currentcompanyexp,
          loanamount,loanapplydate,rateofintrest,loanduration} = req.body;

     const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Add new parameter to the user object
    user.loantype = loantype;
    user.coursefee = coursefee;
    user.course = course;
    user.fathername = fathername;
    user.fatheroccupation = fatheroccupation;
    user.annualincome = annualincome;
    user.companyname = companyname;
    user.designation = designation;
    user.totalexpirence = totalexpirence;
    user.currentcompanyexp = currentcompanyexp;
    user.loanamount = loanamount;
    user.loanapplydate = loanapplydate;
    user.rateofintrest = rateofintrest;
    user.loanduration = loanduration;
    console.log(user)

    if(user){
        res.status(201).json({
            _id:user._id,
            loantype:user.loantype,
            coursefee:user.coursefee,
            course:user.course,
            fathername:user.fathername,
            fatheroccupation:user.fatheroccupation,
            annualincome:user.annualincome,
            companyname:user.companyname,
            designation:user.designation,
            totalexpirence:user.totalexpirence,
            currentcompanyexp:user.currentcompanyexp,
            loanamount:user.loanamount,
            loanapplydate:user.loanapplydate,
            rateofintrest:user.rateofintrest,
            loanduration:user.loanduration,
            token: generateToken(user._id),

        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})


// @desc  Logout user
// route POST/api/users/logout
// @access Public
const logoutrUser= asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'User Logged Out'})
})

// @desc  Get user profile
// route GET/api/users/profile
// @access Private
const getUserProfile= asyncHandler(async (req,res)=>{
    const _id= req.params.id;
     const user = await User.findById(_id);
    console.log(user)

    
    res.status(200).json(user)
})


// @desc  Update user profile
// route POST/api/users/profile
// @access Private
const updateUserProfile= asyncHandler(async (req,res)=>{
    const _id= req.params.id;
   const user = await User.findById(_id);

   if(user){
       user.deposit= (Number(user.deposit) + Number(req.body.deposit)) || user.deposit;

       
       if(req.body.password){
        user.password= req.body.password;
       }
      const updatedUser = await user.save();
      res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            username:updatedUser.username,
            email:updatedUser.email,
            password:updatedUser.password,
            accounttype:updatedUser.accounttype,
            address:updatedUser.address,
            branchname:updatedUser.branchname,
            country:updatedUser.country,
            dob:updatedUser.dob,
            identificationdocumentno:updatedUser.identificationdocumentno,
            identifyproof:updatedUser.identifyproof,
            deposit:updatedUser.deposit,
            mobilenumber:updatedUser.mobilenumber,
            state:updatedUser.state,
            citizenstatus:updatedUser.citizenstatus,
            token: generateToken(updatedUser._id),
            status:res.statusCode

      })
   } else{
    res.status(404);
    throw new Error('User not found')
   }
    res.status(200).json({message: 'Update user profile'});

})



export {authUser,
    registerUser,
    logoutrUser,
    getUserProfile,
    updateUserProfile,
    applyLoan}