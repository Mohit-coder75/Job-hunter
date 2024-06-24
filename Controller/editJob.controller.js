
import CardsModel from "../Models/cards.model.js";


export default class editJobController{
    getEditjob(req, res, next){
          const jobId = req.params.id; // Extract jobId from request parameters
           const cardsModel = new CardsModel();
           const job = cardsModel.getJobById(jobId);
            let dropdownContent = req.session.userName || "Guest";
            let selectedSkills = [];
            res.render("editJob", { selectedSkills: selectedSkills, dropdownContent: dropdownContent, job: job, req: req });
        

    }

    editJob(req, res, next) {
        const jobId = req.params.id;
        const cardsModel = new CardsModel();
        const job = cardsModel.getJobById(jobId);
        // Assuming your form fields have names like jobTitle, company, location, etc.
        const { jobTitle, company, location, salary, experience, active, applyBy, openings, description, selectedSkills } = req.body;

        // Validate the form data if necessary
        // Add your validation logic here

        // Create a new job object
        const newJob = {
            id: job.id, // Keep the existing ID
            title: jobTitle,
            company: company,
            location: location,
            salary: salary,
            experience: experience,
            active: active === 'true', // Convert to boolean
            applyBy: applyBy,
            openings: parseInt(openings), // Convert to number
            description: description,
            skills: selectedSkills // Assuming selectedSkills is an array of selected skills
        };

        // Update the job in your data store
        cardsModel.updateJob(newJob);

        // Redirect to a confirmation page or any other page as needed
        res.redirect('/cards'); // Adjust the route as needed
    }

    deleteJob(req, res, next) {
        const jobId = req.params.id;
        const cardsModel = new CardsModel();
        cardsModel.deleteJob(jobId);

        // Redirect to a confirmation page or any other page as needed
        res.redirect('/cards'); // Adjust the route as needed
    }
}