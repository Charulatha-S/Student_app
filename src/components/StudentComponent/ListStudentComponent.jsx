import { useState, useEffect } from "react";
import {
  retrieveListOfStudents,
  deleteStudentDetail,
  retrieveStudentDetail,
} from "../api/StudentApiService";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from "@mui/icons-material/Info";
import "../css/studentList.css";
import ModalComponent from "../ModalComponent";

function ListStudentComponent() {
  const [students, setStudents] = useState([]);

  // console.log("List" + students);


  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const[name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => refreshStudents(), []);

  function refreshStudents() {
    retrieveListOfStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }

  function addNewStudent() {
    navigate(`/addstudent`);
  }

  function updateStudent(id) {
    console.log("updateid = " + id);
    navigate(`/students/${id}`);
  }

  function infoStudent(id) {
    // console.log("infoid = " + id);
    navigate(`/infoStudent/${id}`);
  }

  function closePop(){
    setModal(false);
  }

  function deleteStudent(id) {
    setModal(true);
    // setMessage("Student Deleted");
    setHeading("Student");
    console.log("Deleted" + id);

    retrieveStudentDetail(id)
    .then((response) =>{
      setName(response.data.studentName);
    })

    deleteStudentDetail(id)
      .then(() => {
        setMessage(`Student with id = ${id} is deleted Successfully`);
      
        refreshStudents();
      })
      .catch((error) => {
        setMessage(
          `This Student Data is present in Other tables. Delete the records in the CourseRegistration/ Marks Table to delete this data.`
        );
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h3>Student List</h3>
      <br />
      {/* {message && <div className="alert alert-warning">{message}</div>} */}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Date of birth</th>
              <th>Contact </th>
              <th>Address</th>
              <th>Info</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.dateOfBirth.toString()}</td>
                <td>{student.contact}</td>
                <td>{student.address}</td>

                <td>
                  {/* <button
                    className="btn btn-success"
                    onClick={() => infoStudent(student.studentId)}
                  >
                    Info
                  </button> */}
                  <InfoIcon
                    className="icon"
                    onClick={() => infoStudent(student.studentId)}
                  />
                </td>

                <td>
                  {/* {" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => updateStudent(student.studentId)}
                  >
                    Update
                  </button> */}

                  <UpdateIcon
                    className="icon"
                    onClick={() => updateStudent(student.studentId)}
                  />
                </td>

                <td>
                  {/* {" "}
                  <button
                    className="btn btn-success"
                    onClick={() => deleteStudent(student.studentId)}
                  >
                    Delete
                  </button> */}

                  <DeleteIcon
                    className="icon"
                    onClick={() => deleteStudent(student.studentId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-3" onClick={addNewStudent}>
        Add Student
      </div>

      {modal && <ModalComponent 
      message = {message}
      heading = {heading}
      url="/studentslist"
      closePop = {closePop}
      name = {name}
      />}
    </div>
  );
}

export default ListStudentComponent;
