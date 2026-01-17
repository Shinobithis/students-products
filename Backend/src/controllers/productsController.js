const students = require("../models/productsModel");

exports.getProducts = (req, res, next) => {
    students.find()
        .then(students => res.status(200).json(students))
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    students.findByIdAndDelete(req.params.id)
        .then(student => res.status(200).json(student))
        .catch(err => res.status(400).json({ error: err }));
}

exports.putProduct = (req, res, next) => {
    students.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json({ message: "Modified" }))
        .catch(err => res.status(400).json({ error: err }));
}

exports.createProduct = (req, res, next) => {
    students.create(req.body)
        .then(() => res.status(200).json({ message: "Created" }))
        .catch(err => res.status(400).json({ error: err }));
}