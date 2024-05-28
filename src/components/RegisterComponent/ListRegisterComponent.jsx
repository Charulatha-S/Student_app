import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveListOfRegisteredCourses } from "../api/RegisterApiService";
import { deleteRegisterDetail } from "../api/RegisterApiService";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

import ModalComponent from "../ModalComponent";

function ListRegisterComponent() {
  const [registers, setRegisters] = useState([]);

  const [message, setMessage] = useState(null);

  const [modal, setModal] = useState(false);

  const [heading, setHeading] = useState("");

  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => refreshCourseRegistration(), []);

  function refreshCourseRegistration() {
    retrieveListOfRegisteredCourses()
      .then((response) => {
        setRegisters(response.data);
        // console.log(registers);
      })
      .catch((error) => console.log(error));
  }

  function courseRegister() {
    navigate(`/registerCourse`);
  }

  function closePop(){
    setModal(false);
  }

  function deleteRegister(id) {
    setModal(true);
    setHeading("Course Registration");
    // console.log(registers.course.courseName + "cn");
    // setName(registers.course.courseName);
    setName("Registered");
    

    deleteRegisterDetail(id)
      .then(() => {
        setMessage(
          `Course Registration with id = ${id} is deleted Successfully`
        );
        refreshCourseRegistration();
      })
      .catch((error) => console.log(error));
  }

  function infoRegister(courseId, studentId) {
    navigate(`/infoRegister/${courseId}/${studentId}`);
  }

  return (
    <div className="container">
      <h3>Registered Courses</h3>
      <br />
      {/* {message && <div className="alert alert-warning">{message}</div>} */}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Registration Id</th>
              <th>Course </th>
              <th>Student </th>
              <th>Registration Date</th>
              <th>Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {registers.map((register) => (
              <tr key={register.registrationId}>
                <td>{register.registrationId}</td>
                <td>
                  {register.course.courseId} ({register.course.courseName})
                </td>
                <td>
                  {register.student.studentId} ({register.student.studentName})
                </td>
                <td>{register.registrationDate}</td>

                <td>
                  <InfoIcon
                    onClick={() =>
                      infoRegister(
                        register.course.courseId,
                        register.student.studentId
                      )
                    }
                  />
                </td>

                <td>
                  <DeleteIcon
                    onClick={() => deleteRegister(register.registrationId)}
                  />
                </td>

                {/* <td>
                  <button className="btn btn-success">Info</button>
                </td>

                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRegister(register.registrationId)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-3" onClick={courseRegister}>
        Course Registration
      </div>

      {modal && <ModalComponent 
      message = {message}
      heading = {heading}
      url="/registerlist"
      closePop = {closePop}
      name = {name}
      />}
    </div>
  );
}

export default ListRegisterComponent;
