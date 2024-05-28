import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  retrieveListOfCourses,
  retrieveCourseDetail,
  deleteCourseDetail,
} from "../api/CourseApiService";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from "@mui/icons-material/Info";
import ModalComponent from "../ModalComponent";

function ListCourseComponent() {


  const [courses, setCourses] = useState([]);

  // console.log("List" + courses);


  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const[name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => refreshCourses(), []);

  function refreshCourses() {
    retrieveListOfCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));
  }

  function addNewCourse() {
    navigate(`/addcourse`);
  }

  function updateCourse(id) {
    console.log("updateid = " + id);
    navigate(`/courses/${id}`);
  }

  function infoCourse(id) {
    // console.log("infoid = " + id);
    navigate(`/infoCourse/${id}`);
  }

  function closePop(){
    setModal(false);
  }

  function deleteCourse(id) {

    setModal(true);
    // setMessage("Course Deleted");
    setHeading("Course");

    retrieveCourseDetail(id)
    .then((response) =>{
      setName(response.data.courseName);
    })

    deleteCourseDetail(id)
      .then(() => {
        setMessage(`Course with id = ${id} is deleted Successfully`);
        refreshCourses();
      })
      .catch((error) => {
        // console.log(error);
        setMessage(
          `This Course Data is present in Other tables. Delete the records in the CouresRegistration/ Marks Table to delete this data.`
        );
      });
  }

  return (
    <div className="container">
      <h3>Course List</h3>
      <br />
      {/* {message && <div className="alert alert-warning">{message}</div>} */}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Credit Hours </th>
              <th>Info</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.description}</td>
                <td>{course.creditHours}</td>
                <td>
                  <InfoIcon onClick={() => infoCourse(course.courseId)} />
                </td>
                <td>
                  <UpdateIcon onClick={() => updateCourse(course.courseId)} />
                </td>
                <td>
                  <DeleteIcon onClick={() => deleteCourse(course.courseId)} />
                </td>

                {/* <td>
                                    <button className="btn btn-success"
                                onClick={() =>infoCourse(course.courseId)}>Info</button>
                                </td>

                                <td> 
                                    <button className="btn btn-warning" 
                                     onClick={() =>updateCourse(course.courseId)}   >Update</button>
                                     </td>
                                
                                <td>
                                     <button className="btn btn-success" 
                                     onClick={() =>deleteCourse(course.courseId)} >Delete</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-3" onClick={addNewCourse}>
        Add Course
      </div>

      {modal && <ModalComponent
      message = {message}
      heading = {heading}
      url="/courseslist"
      closePop = {closePop}
      name = {name}
      />
    }
    </div>
  );
}

export default ListCourseComponent;
