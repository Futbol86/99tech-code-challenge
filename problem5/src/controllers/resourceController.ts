import express from "express";
import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import { NotFoundError, ValidationError } from "../utils/error-handler.ts";
import Resource from "../models/Resource.ts";
const { Request, Response, NextFunction } = express;

export const createResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError("Invalid input data", errors.array());
    }

    const { name, context, amount } = req.body;
    const existingResource = await Resource.findOne({ name }); 
    if (existingResource) {
        throw new ValidationError("Resource name already exists");
    }   
    const resource = new Resource({ name, context, amount });
    await resource.save();
    res.status(201).json(resource);
});

export const updateResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError("Invalid input data", errors.array());
    }   
    const resourceId = req.params.id;    
    const resource = await Resource.findByIdAndUpdate(resourceId, req.body, { new: true, runValidators: true });
    if(!resource) {
        throw new NotFoundError("Resource not found");
    }
    res.status(200).json(resource);
});

export const deleteResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {  
    const resourceId = req.params.id;
    const resource = await Resource.findByIdAndDelete(resourceId);
    if(!resource) {  
        throw new NotFoundError("Resource not found");
    }
    res.status(200).json({ message: "Resource deleted successfully" });
});

export const listResources = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const { name, minAmount, maxAmount } = req.query;  
    const query: any = {};

    if(name) {  
        query.name = { $regex: name as string, $options: "i" };
    }
    if(minAmount) {  
        query.amount = { ...query.amount, $gte: parseFloat(minAmount as string) };
    } 
    if(maxAmount) { 
        query.amount = { ...query.amount, $lte: parseFloat(maxAmount as string) };
    }    
    const resources = await Resource.find(query);
    res.status(200).json(resources);
});

export const getResourceById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {  
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);   
    if(!resource) {
        throw new NotFoundError("Resource not found");
    }   
    res.status(200).json(resource);
});