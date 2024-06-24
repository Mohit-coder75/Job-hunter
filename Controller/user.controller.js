import { registerUser, authenticateUser,users } from "../Models/user.model.js";

export default class UserController {
  getRegister(req, res, next) {
    let dropdownContent = "Guest"; // or any default content you prefer
    res.render("user-register", { dropdownContent,req:req });
};

getLogin(req, res, next) {
    let dropdownContent = "Guest"; // or any default content you prefer
    res.render("user-login", { dropdownContent , req:req });
};

  addUser = (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { id: Date.now(), name, email, password };
    // req.session.userName = name;

    registerUser(newUser);
    res.status(200).redirect("/login");
  };

  loginUser = (req, res) => {
    const {name, email, password } = req.body;
    const user = { email, password};
    const foundUser = users.find(u => u.email === email);

    if (foundUser) {
    // Store user name in session
    req.session.userName = foundUser.name;

    const authenticated = authenticateUser(user);
    if (authenticated) {
      res.redirect("/cards");
    } else {
      res.json({ success: false, message: "Login failed" });
    }
  } else {
    res.json({ success: false, message: "User not found" });
  }
};

  logoutUser = (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
        } else {
            // Redirect to the login page after successful logout
           
          
            res.redirect("/login");
        }
    });
};
}
