const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Tasks = require("./models/Tasks");

const app = express();
app.use(express.json());
app.use(cors());

const connect = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://srinivas:thisisasecret@cluster0.pll6b.mongodb.net/appending-tasks"
		);
		console.log("Connected to database");
	} catch (error) {
		console.log(error);
	}
};

app.post("/api/tasks", async (req, res) => {
	try {
		const { title, description, dueDate } = req.body;
		const createdTask = new Tasks({
			title,
			description,
			dueDate,
		});
		await createdTask.save();
		res.status(201).json({
			message: "Created a Task successfully",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			err: err,
		});
	}
});

app.get("/api/tasks", async (req, res) => {
	try {
		const tasks = await Tasks.find();
		res.status(200).json({
			message: "Fetched the Tasks successfully",
			tasks: tasks,
		});
	} catch (err) {
		return res.status(500).json({
			message: "SOmething went wrong",
			err: err,
		});
	}
});

app.patch("/api/tasks/:taskId", async (req, res) => {
	try {
		const { taskId } = req.params;
		const { title, description, dueDate, status } = req.body;
		const updatedTask = await Tasks.findByIdAndUpdate(taskId, {
			title,
			description,
			dueDate,
			status,
		});
		res.status(200).json({
			message: "Updated the Task successfully",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			err: err,
		});
	}
});

app.delete("/api/tasks/:taskId", async (req, res) => {
	try {
		const { taskId } = req.params;
		await Tasks.findByIdAndDelete(taskId);
		res.status(200).json({
			message: "Deleted the Task successfully",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Something went wrong",
			err: err,
		});
	}
});

app.listen(5000, () => {
	connect();
	console.log("App is now running on port: [5000]");
});
