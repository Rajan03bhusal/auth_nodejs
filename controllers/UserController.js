import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



// user registration controllers
 export const UserController= async (req,res)=>{
    try {
        const {name,email,password,password_confirm,tc}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user){
            res.send({"status":"failed",message:"Email Already exists"})
        }else{
            if(name && email && password && password_confirm && tc){

                if(password === password_confirm){
                   
                    try {
                        const salt=await bcrypt.genSalt(10);
                        const hashpassword=await bcrypt.hash(password,salt);
                        const newUser= new UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                            tc:tc
    
                        })
                        await newUser.save();
                        const Saved_user=await UserModel.findOne({email:email});

                        // generate jwt token
                        const token=jwt.sign({userID:Saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
                        res.status(201).send({"status":"success",message:"User Register Successfully","token":token})

                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                }else{
                    res.send({"status":"failed",message:"Password and Confirm Password doesn't match"})

                }

            }else{
                res.send({"status":"failed",message:"All fields are required"})


            }
        }
        
    } catch (error) {

        console.log(error);
        
    }
}


// user login controllers

 export const userlogin= async(req,res)=>{

    try {
        const {email,password}=req.body;
        if(email && password){

            const user=await UserModel.findOne({email:email});
            if(user!=null){
                const ismatch=await bcrypt.compare(password,user.password);
                if((user.email === email )&& ismatch){

                     // generate jwt token
                     const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
                    res.send({"status":"success",message:"Login Success","token":token})

                }else{
                    res.send({"status":"failed",message:"Invalid email or password try again"})


                }
            }else{
                res.send({"status":"failed",message:"You are not registed user"})

            }

        }else{
            res.send({"status":"failed",message:"All fields are required"})

        }
        
    } catch (error) {
    
        console.log(error);
        
    }
    
}


export const changeUserPassword= async (req,res)=>{

    try {
     const {password,password_confirm}=req.body;
        if(password && password_confirm){
            if(password !== password_confirm){
                res.send({"status":"failed","message":" New Password and Confirm New Password doesn't match"})


            }else{
                const salt=await bcrypt.genSalt(10);
                const hashpassword= await bcrypt.hash(password,salt);
                res.send({"status":"failed","message":"Password Changed Successfully"})


            }
        }
        
    } catch (error) {
        console.log(error);
        
    }
}


// export default UserController

// module exports={UserController,userlogin}