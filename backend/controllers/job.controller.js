// post jobs 

import { Job } from "../models/job.models.js";

export const postJob = async(req, res)=>{
    try {
        const{title, description, requirements, salary, location, experience, jobType, position, companyId} = req.body;
        const userId = req.id;
    
        if(!title || !description || !salary || !location || !experience|| !requirements || !position || !companyId || !jobType){
            return res.status(400).json({
                message: "all fields are required",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            salary: Number(salary),
            experience: Number(experience),
            jobType,
            location,
            requirements: requirements.split(','),
            company: companyId,
            created_by: userId,
            position
        });

        return res.status(201).json({
            messaage: "company posted successfully",
            success: false
        });

    } catch (error) {
        console.log(error);
    }
}

// get all jobs 

export const getAllJobs = async(req, res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// get job by id

export const getJobById = async(req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                messaage: "job not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// jobs created by admin

export const getAdminJob = async(req, res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId});
        if(!jobs){
            return res.status(404).json({
                messaage: "jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

