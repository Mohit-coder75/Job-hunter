import express, { urlencoded } from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import HomeController from "./Controller/Home_Controller.js";
import UserController from "./Controller/user.controller.js";
import { formValidationMiddleware,authenticationMiddleware } from "./middleware.js";
import multer from "multer";
import CardController from "./Controller/cards.controller.js";
import postJobController from "./Controller/postjob.controller.js";
import editJobController from "./Controller/editJob.controller.js";
import { getApplicationsDataById  } from "./Controller/application.controller.js";




const app = express();
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      
    })
  );


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Resume/') // Set destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Set unique filename
    }
});
const upload = multer({ storage: storage });



const homeController =new HomeController();
const userController = new UserController();
const cardController = new CardController(upload); 
const PostJob = new postJobController();
const editjobs=new editJobController();


app.use(express.json());
app.use(urlencoded({ extended: true }));



app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("Views"));

app.get("/",homeController.getHome);
app.get("/register", userController.getRegister);
app.post("/register",formValidationMiddleware, userController.addUser);
app.get("/login", userController.getLogin);
app.get("/logout", userController.logoutUser);
app.post("/login", userController.loginUser);
app.get("/cards", cardController.getCards);
app.get("/ViewMore/:id", cardController.viewMore);
app.get("/PostJob", authenticationMiddleware, PostJob.getPostjob);
app.post("/addJob", authenticationMiddleware, PostJob.addJob); 
app.get("/editJob/:id", editjobs.getEditjob);
app.post("/editJob/:id", editjobs.editJob);
app.post("/delete/:id", editjobs.deleteJob);
app.get("/apply/:id", cardController.applyJob);
app.post("/apply/:id", cardController.savejob);


app.get("/application/:id", async (req, res) => {
  try {
    let dropdownContent = req.session.userName || "Guest";
    const id = req.params.id; // Extract the id parameter from the request URL
    
    const applications = await getApplicationsDataById(id);

    // Render the application.ejs template with the applications data
    res.render('application', { applications, dropdownContent });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

 


export default app;
export { upload };