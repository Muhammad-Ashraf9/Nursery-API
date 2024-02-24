const { body , param ,check} = require('express-validator');


exports.teacherIdValidation = [
    param('id').isMongoId().withMessage('Invalid teacher id')
];
