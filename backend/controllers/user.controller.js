// registration 

import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const registration = async (req, res) => {
    try {
        const { fullName, email, password, phoneNo, role } = req.body;
        // console.log(fullName, email, password, phoneNo, role);

        // Check for missing fields
        if (!fullName || !email || !password || !phoneNo || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNo,
            role
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


// login 

export const login = async(req, res)=>{
    try {
        const{email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "all fields are required",
                success: false
            });
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "user dosen't exist",
                success: false
            });
        }

        const isPasswordMatch = bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "invalid creditienals",
                success: false
            })
        }
        if(role !== user.role){
            return res.status(400).json({
                message:"user dosent' exist",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phoneNo: user.phoneNo,
            profile: user.profile
        }

        return res.status(200).cookie("token",token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'})
        .json({
            message: `welcome back ${user.fullName}`,
            user,
            success: true
        });



    } catch (error) {
        console.log(error);
    }
}


// logout 

export const logout = async(req, res)=>{
    try {
       return res.status(200).cookie("token", "", {maxAge: 0}).json({
        message: "user logged out successfully",
        success: true
       }); 
    } catch (error) {
        console.log(error);
    }
}


// update profile

export const updateProfile = async(req, res)=>{
    try {
        const{fullName, email, phoneNo, bio, skills} = req.body;
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }

        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNo) user.phoneNo = phoneNo;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        await user.save()
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(201).json({
            message: "profile updated successfully",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}