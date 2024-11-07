import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['recruiter', 'student'],
        required: true
    },
    phoneNo: {
        type: Number
    },
    profile: {
        bio: {
            type: String
        },
        skills: [{
            type: String
            
        }],
        resume: {
            type: String
        },
        resumeOrginalName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'

        },
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, {timestamps: true});

export const User = mongoose.model('User', userShema);