const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  tasks: [String], // An array of strings to store the tasks
  deadline: {
    type: Date,
    required: true,
  },
  completionPercentage: {
    type: Number,
    default: 0,
  },
  completedTasks: [
    {
      type: Boolean, // Store completion status as boolean values
      default: false, // Tasks are initially not completed
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
