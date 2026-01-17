const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
})

module.exports = mongoose.model("Student", studentSchema);