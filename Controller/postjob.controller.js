
import { jobs } from "../Models/cards.model.js";



export default class postJobController{
    getPostjob(req, res, next){

            let dropdownContent = req.session.userName || "Guest";
            let selectedSkills = [];
            res.render("postJob", { selectedSkills: selectedSkills, dropdownContent: dropdownContent,req:req });
        

    }

    addJob(req, res, next) {
        // Assuming your form fields have names like jobTitle, company, location, etc.
        const { jobTitle, company, location, salary, experience, active, applyBy, openings, description, selectedSkills } = req.body;

        // Validate the form data if necessary
      
        // Add your validation logic here

        // Create a new job object
        const newJob = {
            id: (jobs.length + 1).toString(), // Generate a unique ID (you might want to use a more robust method in a real application)
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

        // Add the new job to your data store
        console.log(newJob);
        jobs.push(newJob);
       

        // Redirect to a confirmation page or any other page as needed
        res.redirect('/cards'); // Adjust the route as needed
    }
}