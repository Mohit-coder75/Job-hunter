// formValidationMiddleware.js

import { body, validationResult } from 'express-validator';

 export const formValidationMiddleware = [
  // Validate name
  body('name').notEmpty().withMessage('Name is required'),

  // Validate email
  body('email').isEmail().withMessage('Invalid email'),

  // Validate password
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  // Custom validation error handling
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      let dropdownContent = "Guest";
      return res.render('user-register', { errors: errors.array(), dropdownContent  });
    }
    // If validation succeeds, continue to the next middleware
    next();
  }
];


export const authenticationMiddleware = (req, res, next) => {
    // Check if user is logged in
    if (req.session.userName) {
      // User is logged in, proceed to the next middleware/route handler
      next();
    } else {
      // User is not logged in, redirect to login page
      res.redirect("/login");
    }
  };


  
