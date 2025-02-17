import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";

export const applyJob = async(req, res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "jobid is required",
                success: false
            });
        }
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
        if(existingApplication){
            return res.status(400).json({
                message: "you already have applied for the jobs",
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false
            });
        }
        // create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "job applied successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// get applied jobs 

export const getAppliedJobs = async(req, res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: "company",
                options: {sort: {createdAt: -1}}
            }
        });

        if(!application){
            return res.status(404).json({
                message: "application not found",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// get applicants 

export const getApplicant = async(req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message: "jobs not found",
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


// update status 

export const updateStatus = async(req, res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json({
                success: false
            });
        }
        const applicaton = await Application.findOne({_id:applicationId});
        if(!applicaton){
            return res.status(404).json({
                message: "application not found",
                success: false
            });
        }
        applicaton.status = status.toLowerCase();
        await applicaton.save();
        return res.status(201).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}