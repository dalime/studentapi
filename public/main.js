$(() => {
  $('#btnViewDirectory').click(viewStudents);
  $('#btnAddStudent').click(addStudent);
  $('#currentDirectory').on('click', 'button.edit', openEditModal);
  $('#btnUpdate').click(updateStudent);
  $('#currentDirectory').on('dblclick', '.template', deleteStudent);
})


function viewStudents(e) {
  e.preventDefault();
  $('#currentDirectory').empty();
  $.get('/students')
    .done(data => {
      const $people = data.map(person => {
        let $entry = $('#template').clone();
        $entry.removeAttr('id');
        $entry.find('.studentName').text(person.name);
        $entry.find('.studentCohort').text(person.cohort);
        $entry.find('.studentGender').text(person.gender);
        $entry.find('button.edit').data('student-id', person.id);
        return $entry;
      })
      $('#currentDirectory').append($people);
    })
    .fail(err => {
      console.error('error: ', err);
    })
}

function addStudent(e) {
  e.preventDefault();

  let $newName = $('#iptName').val();
  let $newCohort = $('#iptCohort').val();
  let $newGender = $('#iptGender').val();

  let newObj = {name: $newName, cohort: $newCohort, gender: $newGender};

  $.post('/students', newObj)
  .done(givenID => {
    console.log(givenID);
  })
  .fail(err => {
    console.error('error: ', err);
  });
}
/*
function editStudent(e) {
  e.preventDefault();

  let $index = $(this).parentsUntil( $('.template') ).data('id');
  console.log($index);

}
*/
let $id;

function openEditModal() {
  $id = $(this).data('student-id');
  $.get(`/students/${$id}`)
    .done(data => {
      $('#studentEditModal').find('#editName').val(data.name);
      $('#studentEditModal').find('#editCohort').val(data.cohort);
      $('#studentEditModal').find('#editGender').val(data.gender);
      $('#studentEditModal').modal();
    })
}

function updateStudent(e) {
  e.preventDefault();

  let $updateName = $('#studentEditModal').find('#editName').val();
  let $updateCohort = $('#studentEditModal').find('#editCohort').val();
  let $updateGender = $('#studentEditModal').find('#editGender').val();
  let updateStudent = {name: $updateName, cohort: $updateCohort, gender: $updateGender, id: $id};
  console.log(updateStudent);
  $.ajax({
  url: `/students/${$id}`,
  type: 'PUT',
  data: updateStudent,
  success: function(data) {
    console.log('Student updated successfully.');
  },
  error: function(data) {
    console.error('error: ', data);
  }
});
}

function deleteStudent() {
  let $deleteId = $(this).find('button.edit').data('student-id');
  $.ajax({
    url: `/students/${$deleteId}`,
    type: 'DELETE',
    success: function(data) {
      console.log('Student deleted successfully.');
    },
    error: function(data) {
      console.error('error', data);
    }
  })
}
/*
div class="row">
  <div class="form-group">
    <form id="addStudentForm">
      <div class="row">
        <label>Name: </label>
        <input type="text" id="iptName" />
      </div>
      <div class="row">
        <label>Cohort: </label>
        <input type="text" id="iptCohort" />
      </div>
      <div class="row">
        <label>Gender: </label>
        <input type="text" id="iptGender" />
      </div>
      <div class="row">
        <button id="btnAddStudent" class="btn btn-primary">Add Student</button>
      </div>
    </form>
  </div>
*/
