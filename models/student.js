const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/students.json'); //can set to relative filepath from absolute filepath
const uuid = require('uuid');

exports.getAll = function(cb) {
  // 1. read the json file to get the data
  // 2. parse the data, to get the array (of cats)
  // 3. callback with the array
  //   (if there's an error, callback with error)
  fs.readFile(dataFilePath, (err, buffer) => {
    if (err) return cb(err);
    let students;
    try {
      students = JSON.parse(buffer);
    } catch(err) {
      return cb(err);
    }
    cb(null, students);
  });
}


exports.create = function(studentObject, cb) {
  exports.getAll(function(err, students) {
    if (err) return cb(err);

    studentObject.id = uuid.v4();

    students.push(studentObject);
    fs.writeFile(dataFilePath, JSON.stringify(students), function(err) {
      cb(err, studentObject.id);
    });
  });
}

exports.getStudent = function(studentID, cb) {
  exports.getAll(function(err, students) {
    if (err) return cb(err);
    let index = students.map(function(obj) {
      return obj.id;
    }).indexOf(studentID);
    let student = students[index];
    cb(null, student);
  });
}

exports.updateStudent = function(studentObject, studentID, cb) {
  exports.getAll(function(err, students) {
    if (err) return cb(err);
    let index = students.map(function(obj) {
      return obj.id;
    }).indexOf(studentID);
    studentObject.id = studentID;
    students.splice(index, 1, studentObject);
    fs.writeFile(dataFilePath, JSON.stringify(students), function(err) {
      cb(err);
    });
  });
}

exports.deleteStudent = function(studentID, cb) {
  exports.getAll(function(err, students) {
    if (err) return cb(err);
    let index = students.map(function(obj) {
      return obj.id;
    }).indexOf(studentID);
    students.splice(index, 1);
    fs.writeFile(dataFilePath, JSON.stringify(students), function(err) {
      cb(err);
    });
  });
}
