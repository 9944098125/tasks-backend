const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ["PENDING", "COMPLETED"],
			required: true,
			default: "PENDING",
		},
	},
	{ timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
