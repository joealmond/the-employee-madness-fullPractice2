require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const DivisionModel = require("./db/division.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

// app.get("/api/employees/:id", async (req, res) => {
//   const employee = await EmployeeModel.findById(req.params.id);
//   return res.json(employee);
// });

app.get("/api/divisions/", async (req, res) => {
  const divisions = await DivisionModel.find().populate('boss').sort({ created: "desc" });
  return res.json(divisions);
});

app.post("/api/divisions/", async (req, res, next) => {
  const division = req.body;

  try {
    const saved = await DivisionModel.create(division);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/divisions/:id", async (req, res, next) => {
  try {
    const division = await DivisionModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(division);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/divisions/:id", async (req, res, next) => {
  try {
    const division = await DivisionModel.findById(req.params.id);
    const deleted = await division.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
