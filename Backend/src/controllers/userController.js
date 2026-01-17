const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Users({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User successfully saved' }))
                .catch(err => res.status(500).json({ message: err.message }))
        })
        .catch(err => res.status(500).json({ message: err.message }));
}

exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(404).json({ message: 'User not found.' });
                    }
                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
            .catch(err => res.status(500).json({ message: err.message }));
        })
        .catch(err => res.status(500).json({ message: err.message }));
}