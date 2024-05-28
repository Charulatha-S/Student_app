import { useEffect, useState } from "react";
import { retrieveListOfStudents } from "./api/StudentApiService";
import { retrieveListOfCourses } from "./api/CourseApiService";
import { retrieveListOfRegisteredCourses } from "./api/RegisterApiService";
import { retrieveListOfMarks } from "./api/MarksApiService";
import "./css/welcome.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function WelcomeComponent() {
  // const {username} = useParams()

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    retrieveStudents();
    retrieveCourses();
    retrieveCourseRegistration();
    retrieveMarks();
  }, []);

  function retrieveStudents() {
    retrieveListOfStudents()
      .then((response) => {
        setStudents(response.data);
        // console.log(response.data);
      })
      .catch((error) =>
        console.error("Error fetching student details:", error)
      );
  }

  function retrieveCourses() {
    retrieveListOfCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }

  function retrieveCourseRegistration() {
    retrieveListOfRegisteredCourses()
      .then((response) => {
        setRegisters(response.data);
        // console.log(registers);
      })
      .catch((error) => console.log(error));
  }

  function retrieveMarks() {
    retrieveListOfMarks()
      .then((response) => {
        setMarks(response.data);
        // console.log(marks);
      })
      .catch((error) => console.log(error));
  }

  const noOfStudents = students.length;
  // console.log(noOfStudents);

  const listOfCourses = courses.map((course) => 
    {
    
    return (
      
      <li>
        <PlayArrowIcon /> {course.courseName}
      </li>
    );
  });

  const noOfCourses = courses.length;

  const noOfRegisteredCourses = registers.length;
  // console.log(noOfRegisteredCourses);

  const noOfMarks = marks.length;
  // console.log(noOfMarks);

  return (
    <div className="WelcomeComponent">
      {/* <h1> Welcome {username}</h1> */}
      <br />
      <h3>Dashboard</h3>
      <div className="flex-container">
        <div className="listOfCourses">
          <p className="listheading">
            List of Courses available for registration: ({noOfCourses})
          </p>
          
          <ul>{listOfCourses}</ul>
          
        </div>

        <div className="noOfStud">
          <p className="headingLength">Number of Students:</p>
          <p className="number">{noOfStudents}</p>
        </div>

        <div className="noOfCoursesRegistered">
          <p className="headingLength">No. of Registered Courses:</p>
          <p className="number">{noOfRegisteredCourses}</p>
        </div>

        <div className="noOfMarks">
          <p className="headingLength">Number of marks Entered:</p>
          <p className="number">{noOfMarks}</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;
