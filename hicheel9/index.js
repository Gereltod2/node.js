const express = require('express');
const app = express();
const {body, validationResult} = require('express-validator');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello little carter!');
});

const validateUser = [
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});