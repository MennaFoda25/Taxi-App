const { check } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.createUserValidator = [
  check('userName')
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ min: 3 })
    .withMessage('User name is too short'),
  check('email')
    .notEmpty()
    .withMessage('Email is  required')
    .isEmail()
    .withMessage('Email is invalid, please enter a valid format ')
    .custom(async (val) => {
      const existingUser = await User.findOne({ where: { email: val } });
      if (existingUser) {
        return Promise.reject(new Error('Email already in use'));
      }
    }),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation is incorrect');
      }
      return true;
    }),

  check('passwordConfirm').notEmpty().withMessage('password confirmation is required'),
  check('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('ar-EG')
    .withMessage('Invalid phone number format')
    .custom(async (val) => {
      const existingPhone = await User.findOne({ where: { phoneNumber: val } });
      if (existingPhone) {
        return Promise.reject(new Error('Phone already in use'));
      }
    }),

  validatorMiddleware,
];

exports.getUserValidator = [
  check('id')
    .isInt()
    .withMessage('Invalid Id')
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) {
        return Promise.reject(new Error(`No user found with ID ${val}`));
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('id')
    .isInt()
    .withMessage('Invalid Id')
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) {
        return Promise.reject(new Error(`No user found with ID ${val}`));
      }
      return true;
    }),
  check('userName')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (val, { req }) => {
      const existingUser = await User.findOne({ where: { email: val } });
      if (existingUser && existingUser.id !== parseInt(req.params.id, 10)) {
        return Promise.reject(new Error('Email already in use'));
      }
    }),
  check('phoneNumber')
    .optional()
    .isMobilePhone('ar-EG')
    .withMessage('Invalid phone number')
    .custom(async (val, { req }) => {
      const existingPhone = await User.findOne({ where: { phoneNumber: val } });
      if (existingPhone && existingPhone.id !== parseInt(req.params.id, 10)) {
        throw new Error('Phone number already in use');
      }
    }),
  ,
  //  check('passwordConfirm').notEmpty().withMessage('Please confirm your password'),
  validatorMiddleware,
];

// exports.changeUserPasswordValidator = [
//   check('id').isMongoId().withMessage('Invalid user'),
//   body('currentPassword').notEmpty().withMessage('Enter your current password'),
//   body('passwordConfirm').notEmpty().withMessage('Enter password again'),
//   body('password')
//     .notEmpty()
//     .withMessage('Enter your new password')
//     .custom(async (val, { req }) => {
//       //verify current password
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         throw new Error('No user found for this ID');
//       }

//       const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);

//       if (!isCorrectPassword) {
//         throw new Error('Inncorrect current password');
//       }

//       if (val !== req.body.passwordConfirm) {
//         throw new Error('Password Confirmation is incorrect');
//       }
//       return true;
//     }),
//   validatorMiddleware,
// ];

exports.deleteUserValidator = [
  check('id')
    .isInt()
    .withMessage('Invalid Id')
    .custom(async (val) => {
      const user = await User.findByPk(val);
      if (!user) {
        return Promise.reject(new Error(`No user found with ID ${val}`));
      }
      return true;
    }),
  validatorMiddleware,
];
