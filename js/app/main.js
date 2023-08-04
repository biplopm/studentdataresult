const studentCreateForm = document.getElementById("student_create_form");
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const msgResult = document.querySelector(".msg-result");
const studentDataList = document.querySelector(".all-student-data-list");
const singleData = document.querySelector(".single-data");
const studentEditForm = document.getElementById("student_edit_form");
const studentResultForm = document.getElementById("student_result_modal");

//student show all data
const getStudents = () => {
  const students = getDataLS("students");

  let content = "";
  if (students.length > 0) {
    students.reverse().map((student, index) => {
      content += `<tr>
    <td>${index + 1}</td>
    <td>
     <img src="${student.photo}" alt= "" />
    </td>
    <td>${student.name}</td>
    <td>${student.roll}</td>
    <td>${student.reg}</td>
    <td>${timeAgo(student.createAt)}</td>
    <td>
    ${
      student.result === null
        ? '<button type="button" class="btn btn-success" data-bs-toggle="modal"data-bs-target="#student_result_modal" onclick="addResult(\'' +
          student.id +
          "')\">Add Result</button>"
        : '<button type="button" class="btn btn-info">View Result</button>'
    }
      
    </td>
    <td>
      <button type="button" class="btn btn-info" data-bs-toggle="modal"
      data-bs-target="#show_single_student_modal" onclick="showAllStudent('${
        student.roll
      }')")>
        <i class="fa-solid fa-eye"></i>
      </button>
      <button type="button" class="btn btn-warning" data-bs-toggle="modal"
      data-bs-target="#edit_student_modal" onclick="editStudent('${
        student.roll
      }')">
        <i class="fa-solid fa-edit"></i>
      </button>
      <button type="button" class="btn btn-danger" onclick="deleteStudent('${
        student.roll
      }')")>
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>`;
    });
  } else {
    content = `<tr>
  <td colspan="8">No Data Found</td>
  </tr>`;
  }

  studentDataList.innerHTML = content;
};
getStudents();

// Add Result
const addResult = (id) => {
  studentResultForm.querySelector("input[name='name']").value = id;
};

// studentResultForm Submit

studentResultForm.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  e.target.reset();

  //update the result
  const oldData = getDataLS("students");

  oldData[oldData.findIndex((item) => item.id === data.id)] = {
    ...oldData[oldData.findIndex((item) => item.id === data.id)],
    result: data,
  };
  sendDataLS("students", oldData);
  getStudents();
};

// Edit student
const editStudent = (id) => {
  const oldSingleData = getDataLS("students");
  const data = oldSingleData.find((data) => data.roll === id);
  studentEditForm.querySelector("input[name='name']").value = data.name;
  studentEditForm.querySelector("input[name='roll']").value = data.roll;
  studentEditForm.querySelector("input[name='reg']").value = data.reg;
  studentEditForm.querySelector("input[name='id']").value = data.id;
  studentEditForm.querySelector("input[name='photo']").value = data.photo;
  studentEditForm.querySelector("#prevPho").setAttribute("src", data.photo);
};

// Edit Form Submitted
studentEditForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const getOldData = getDataLS("students");
  //Check Roll Number
  if (getOldData.some((item) => item.roll === data.roll)) {
    msgEdit.innerHTML = createAlert("Roll Number already exists");
    return;
  }
  //Check Reg Number
  if (getOldData.some((item) => item.reg === data.reg)) {
    msgEdit.innerHTML = createAlert("Reg Number already exists");
    return;
  }

  getOldData[getOldData.findIndex((item) => item.id === data.id)] = {
    ...getOldData[getOldData.findIndex((item) => item.id === data.id)],
    ...data,
  };
  sendDataLS("students", getOldData);
  getStudents();
};

// view students
const showAllStudent = (rolls) => {
  const oldSingleData = getDataLS("students");
  const { name, roll, reg, photo } = oldSingleData.find(
    (data) => data.roll === rolls
  );
  singleData.innerHTML = `<img
  src="${photo}"
  alt=""
  class="images"
/>
<div class="center-side">
  <h5>${name}</h5>
  <h5>${roll}</h5>
  <h5>${reg}</h5>`;
};

// Delete all students
const deleteStudent = (rolls) => {
  const conf = confirm("Are you sure you want to delete");
  if (conf) {
    const oldStudents = getDataLS("students");
    const updateStudent = oldStudents.filter((data) => data.roll !== rolls);
    sendDataLS("students", updateStudent);
    getStudents();
  } else {
    alert("You Are Safe");
  }
};

//submit form data
studentCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  //validation functions
  if (!data.name || !data.roll || !data.reg) {
    msg.innerHTML = createAlert("Please Filled All input fields");
  } else if (!isNumber(data.roll)) {
    msg.innerHTML = createAlert("Invalid roll number");
  } else if (!isNumber(data.reg)) {
    msg.innerHTML = createAlert("Invalid reg number");
  } else {
    const oldStudent = getDataLS("students");

    //Check Roll Number
    if (oldStudent.some((item) => item.roll === data.roll)) {
      msg.innerHTML = createAlert("Roll Number already exists");
      return;
    }
    //Check Reg Number
    if (oldStudent.some((item) => item.reg === data.reg)) {
      msg.innerHTML = createAlert("Reg Number already exists");
      return;
    }

    oldStudent.push({
      ...data,
      //id: getRandomId(),
      result: null,
      createAt: Date.now(),
      id: Math.floor(Math.random()) + Date.now(),
    });

    sendDataLS("students", oldStudent);
    e.target.reset();
    msg.innerHTML = createAlert(
      `<strong>${data.name}</strong> Create Successfully`,
      "success"
    );

    getStudents();
  }
};
