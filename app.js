const PORT = 8000;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const Student = require('./models/student');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.route('/students')
  .get((req, res) => {
    Student.getAll(function(str, students) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(students);
      }
    });
  })
  .post((req, res) => {
    Student.create(req.body, function(err) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send();
      }
    })
  })

app.route('/students/:id')
  .get((req, res) => {
    Student.getStudent(req.params.id, function(err, student) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(student);
      }
    })
  })
  .put((req, res) => {
    Student.updateStudent(req.body, req.params.id, function(err, student) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(student);
      }
    })
  })
  .delete((req, res) => {
    Student.deleteStudent(req.params.id, function(err, student) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(students);
      }
    })
  })

app.all((req, res) => {
  res.send('404');
})

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
})
