const express = require('express');
const studentApi = express.Router();

const { Student } = require("../models");

studentApi.get('/', async (req, res) => {
  const students = await Student.findAll();

  res.send(students);
});

studentApi.delete('/:presenceNumber', async (req, res) => {
  const presenceNumber = req.params.presenceNumber;

  const student = await Student.findOne({ where: { presenceNumber } });

  if (student) {
    await student.destroy();
    return res.send("Deletion successful");
  }
  
  return res.status(404).send("Student not found");
});

studentApi.post('/', async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.create({
      name: req.body.name,
      class: req.body.class,
      presenceNumber: req.body.presenceNumber,
      profilePhotoPath: req.body.profilePhotoPath
    });

    res.send(student);
  } catch (err) {
    switch (err.parent.code) {
      case 'ER_DUP_ENTRY':
        return res.status(400).send(`Student with ${JSON.stringify(err.fields)} already exists`);
      default:
        console.error(JSON.stringify(err, null, 4));
        return res.sendStatus(500);
    }
  }
});

studentApi.put('/:presenceNumber', async (req, res) => {
  const presenceNumber = req.params.presenceNumber;

  const student = await Student.findOne({ where: { presenceNumber } });

  try {
    if (student) {
      student.name = req.body.name;
      student.class = req.body.class;
      student.presenceNummber = req.body.presenceNumber;
      student.profilePhotoPath = req.body.profilePhotoPath;

      await student.save();
      return res.send(student);
    }
  } catch (err) {
    switch (err.parent.code) {
      case 'ER_DUP_ENTRY':
        return res.status(400).send(`Student with ${JSON.stringify(err.fields)} already exists`);
      default:
        console.error(JSON.stringify(err, null, 4));
        return res.sendStatus(500);
    }
  }

  res.status(404).send("Student not found");
});

module.exports = studentApi;
