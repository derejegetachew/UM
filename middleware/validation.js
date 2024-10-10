
const { body, param, validationResult } = require('express-validator');

exports.validateSignup = [
    body('username')
      .isString()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters'),
    
    body('email')
      .isEmail()
      .withMessage('Must be a valid email address'),
  
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  // Validation middleware for role assignment
  exports.validateRoleAssignment = [
    body('roleId')
      .isInt()
      .withMessage('Role ID must be an integer'),
  
    body('userId')
      .isInt()
      .withMessage('User ID must be an integer'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];