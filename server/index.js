const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sesssion = require("express-session");
const passport = require("passport");
const User = require("./user");
const Project = require("./project");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  sesssion({
    secret: "4a140491279768e3b30c5cc5bc9e6d398d50535d286c2aaeaa9582ca1c718cba",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    "mongodb+srv://is9678:XWNGK6kuUoV0V8e9@cluster0.kd04daz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get route

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects); // Send the fetched projects as JSON
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// post route

app.post("/signup", async (req, res) => {
  const { fname, lname, email, phone, pass, cpass } = req.body;

  if (pass !== cpass) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  User.register(
    new User({
      username: email,
      fname,
      lname,
      phone,
    }),
    pass,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error registering user" });
      }
      passport.authenticate("local")(req, res, () => {
        res.status(200).json(user);
      });
    }
  );
});

app.post("/login", cors(), async (req, res) => {
  const user = new User({
    username: req.body.email,
    password: req.body.pass,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {});
    }
  });
});

app.post("/addproject", cors(), async (req, res) => {
  const project = new Project({
    projectTitle: req.body.projectTitle,
    tasks: req.body.tasks,
    deadline: req.body.deadline,
  });
  project
    .save()
    .then((savedProject) => {})
    .catch((err) => {
      console.error(err);
    });
});

app.post("/updateproject", cors(), async (req, res) => {
  try {
    let projectTitle = req.body.projectTitle;
    const tasks = req.body.totalTasks;
    const completedTasks = req.body.completedTasks;

    const completedCount = completedTasks.filter((value) => value === 1).length;
    console.log(completedCount);
    const totalCount = tasks.length;
    const completionPercentage = ((completedCount / totalCount) * 100).toFixed(
      2
    );

    // Remove leading and trailing whitespace
    projectTitle = projectTitle.trim();

    // Check if the project exists in the database
    const project = await Project.findOne({ projectTitle });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the tasks for the existing project
    project.tasks = tasks;
    project.completionPercentage = completionPercentage;
    project.completedTasks = completedTasks;

    // Save the updated project
    await project.save();

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
