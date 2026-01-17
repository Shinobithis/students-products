const students = require("../models/studentsModel");

exports.getStudents = (req, res, next) => {
    students.find()
        .then(students => res.status(200).json(students))
        .catch(err => console.log(err));
}

exports.deleteStudents = (req, res, next) => {
    students.findByIdAndDelete(req.params.id)
        .then(student => res.status(200).json(student))
        .catch(err => res.status(400).json({ error: err }));
}

exports.putStudents = (req, res, next) => {
    students.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json({ message: "Modified" }))
        .catch(err => res.status(400).json({ error: err }));
}