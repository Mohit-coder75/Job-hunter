import fs from "fs";
import path from "path"; 
export const jobs = [
    {
        id: "1",
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        description: "We are looking for a passionate Software Engineer to design, develop and install software solutions. Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JScript.NET.) Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment. Ultimately, the role of the Software Engineer is to build high-quality, innovative and fully performing software that complies with coding standards and technical design.",
        location: "Nepal",
        salary: "2-4 LPA",
        experience: "2-3 years",
        logo: "https://picsum.photos/200/200", // Example placeholder image from Lorem Picsum
        active: true, // Indicates the job is actively hiring
        applyBy: "2024-06-15", // Application deadline
        openings: 3, // Number of openings
        applicants: 0, // Number of applicants
        skills: ["JavaScript", "React", "Python"] // Required skills
    },
    {
        id: "2",
        title: "Data Scientist",
        company: "Data Analytics Co.",
        description: "We are looking for a passionate Software Engineer to design, develop and install software solutions. Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JScript.NET.) Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment. Ultimately, the role of the Software Engineer is to build high-quality, innovative and fully performing software that complies with coding standards and technical design.",
        location: "India",
        salary: "2-4 LPA",
        experience: "2-3 year",
        logo: "https://picsum.photos/200/200", // Example placeholder image from Lorem Picsum
        active: false, // Indicates the job is not actively hiring
        applyBy: "2024-05-31", // Application deadline
        openings: 1, // Number of openings
        applicants: 1, // Number of applicants
        skills: ["Python", "JavaScript", "Java"] // Required skills
    }
];





  export default class CardsModel {
    constructor() {
        // Load data from JSON file on initialization
        this.applications = this.loadDataFromFile('applications.json');
    }

        // Method to load data from JSON file
        loadDataFromFile(filename) {
            try {
                const data = fs.readFileSync(filename);
                return JSON.parse(data);
            } catch (error) {
                console.error('Error loading data from file:', error);
                return [];
            }
        }

        findApplicationByDetails(jobId, name, email) {
            // Iterate through each application
            for (const application of this.applications) {
                // Check if the application matches the provided jobId, name, and email
                if (application.jobId === jobId && application.name === name && application.email === email) {
                    return application; // Return the matching application
                }
            }
    
            return null; // Return null if no matching application is found
        }
    fetchCards()  {
      return jobs;
      // Write your code here
    };
    getJobById(jobId) {
        // Find the job with the given jobId
        return jobs.find(job => job.id == jobId);
    }

    updateJob(updatedJob) {
      // Find the index of the job in the jobs array
      const index = jobs.findIndex(job => job.id === updatedJob.id);

      // If the job with the given ID exists
      if (index !== -1) {
          // Update the job with the new values
          jobs[index] = updatedJob;
      } else {
          // Handle the case where the job with the given ID does not exist
          console.error(`Job with ID ${updatedJob.id} not found.`);
      }
  }

  deleteJob(jobId) {
    const index = jobs.findIndex(job => job.id === jobId);
    if (index !== -1) {
        jobs.splice(index, 1);
        return true; // Return true to indicate successful deletion
    } else {
        console.error(`Job with ID ${jobId} not found.`);
        return false; // Return false to indicate failure to find and delete the job
    }
}





 saveApplicationData = (data) => {
    const filePath = path.resolve("applications.json");
    // Load existing data (if any)
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        // If file doesn't exist or is empty, continue with an empty array
    }

    // Add new application data to existing data
    existingData.push(data);

    // Write combined data back to the file
    fs.writeFileSync("applications.json", JSON.stringify(existingData, null, 2));
    const job = jobs.find(job => job.id === data.jobId);
    if (job) {
        job.applicants++; 
    }
}
  }
  