import fs from "fs";

export const getApplicationsDataById = (id) => {
    return new Promise((resolve, reject) => {
        fs.readFile('applications.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                const applications = JSON.parse(data);
                const filteredApplications = applications.filter(application => application.jobId == id);
                resolve(filteredApplications);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};

