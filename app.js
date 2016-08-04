const PORT = process.env.PORT || 8000;
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const Student = require('./models/student');

app.get('/', (req, res) => {
  let filepath = path.join(__dirname, './public/index.html');
  res.sendFile(filepath);
});

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.route('/students')
  .get((req, res) => {
    Student.getAll(function(err, students) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(students);
      }
    });
  })
  .post((req, res) => {
    Student.create(req.body, function(err, id) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(id);
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
        res.send(student);
      }
    })
  })

app.all((req, res) => {
  res.send('404');
})

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
})
