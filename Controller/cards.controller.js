// cards.controller.js
import CardsModel, { jobs } from "../Models/cards.model.js";
import fs from "fs";
import { upload } from "../index.js";
import multer from "multer";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    // Example for Gmail:
    service: 'Gmail',
    auth: {
        user: 'codingninjas2k16@gmail.com',
        pass: 'slwvvlczduktvhdj'
    }
});

// Function to send application confirmation email
function sendApplicationEmail(formData) {
    // Define email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: formData.email,
        subject: 'Application Submitted Successfully',
        text: 'Your application has been submitted successfully!'
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

export default class CardController {

    constructor(upload) {
        this.upload = upload;
    }
    getCards(req, res, next) {
        const cardsModel = new CardsModel();
        const jobs = cardsModel.fetchCards();
        let dropdownContent = req.session.userName || "Guest";
        res.render("cards", { jobs: jobs, dropdownContent: dropdownContent,req:req });
    }

    viewMore(req, res, next){
        const jobId = req.params.id; // Extract jobId from request parameters
        const cardsModel = new CardsModel();
        const job = cardsModel.getJobById(jobId); // Fetch specific job using jobId
        let dropdownContent = req.session.userName || "Guest";
        res.render("viewMore", { job: job, dropdownContent: dropdownContent , req: req});
    }

    applyJob(req, res, next){
        const jobId = req.params.id; 
        const cardsModel = new CardsModel();
        const job = cardsModel.getJobById(jobId);
        let dropdownContent = req.session.userName || "Guest";
        res.render("apply", { dropdownContent: dropdownContent , job: job,req:req });
    }

    


    savejob(req, res, next) {
        const jobId = req.params.id;
        const appliedJobs = req.session.appliedJobs || [];
        const applicantEmail = req.body.email;
        const applicantName = req.body.name;
    
        // Check if the applicant has already applied for this job
        const existingApplication = appliedJobs.find(job => job.jobId === jobId && job.applicantName === applicantName && job.applicantEmail === applicantEmail);
        if (existingApplication) {
            let dropdownContent = req.session.userName || "Guest";
            return res.render("alreadyApplied", { jobId: jobId ,  dropdownContent: dropdownContent  });
        }
    
        // Continue with file upload and application data saving
        upload.single('resume')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
    
            // File uploaded successfully, continue with saving application data
            const formData = {
                jobId: jobId,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                resume: req.file ? req.file.filename : null,
                cover_letter: req.body.cover_letter,
                portfolio: req.body.portfolio
            };
    
            const cardsModel = new CardsModel();
            cardsModel.saveApplicationData(formData);
    
            req.session.appliedJobs = [...appliedJobs, {
                jobId: jobId,
                applicantName: applicantName,
                applicantEmail: applicantEmail
            }];
    
            sendApplicationEmail(formData);
            let dropdownContent = req.session.userName || "Guest";
            res.render("Applied", { dropdownContent: dropdownContent });
        });
    }
    
    
    

}
