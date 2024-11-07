// company register

import { Company } from "../models/company.models.js";

export const companyRegister = async(req, res)=>{
    try {
        const{name, description} = req.body;
        if(!name){
            return res.status(400).json({
                message: "company name is required",
                success: false
            });
        }

        let company = await Company.findOne({name});
        if(company){
            return res.status(400).json({
                message: "company already exists with this name",
                success: false
            });
        }
        company = await Company.create({
            name,
            description,
            userId: req.id
        });

        return res.status(201).json({
            message: "company registered succuessfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// get company

export const getCompany = async(req, res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "companies not found",
                success: false
            });
        }
        return res.status(200).json({
            companies
        });
        

        
    } catch (error) {
        console.log(error);
    }
}


// companies by Id 

export const getCompanyById = async(req, res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message: "company not found",   
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });


    } catch (error) {
        console.log(error);
    }
}

// update company

export const updateCompany = async(req, res)=>{
    try {
        const{name, description, website, location} = req.body;
        const fileName = req.file;

        const updateData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!company){
            return res.status(404).json({
                message: "company not found",
                success:false
            });
        }
        return res.status(201).json({
            message: "company data updated successfully",
            success: false
        });

    } catch (error) {
        console.log(error);
    }
}