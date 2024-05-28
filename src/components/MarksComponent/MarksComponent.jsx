import { useEffect, useState } from "react";
import { Container, Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import {
  retrieveListOfStudents,
  retrieveStudentDetail,
} from "../api/StudentApiService";
import {
  retrieveListOfCourses,
  retrieveCourseDetail,
} from "../api/CourseApiService";
import { addMark } from "../api/MarksApiService";
import "../css/formStyle.css";
import ModalComponent from "../ModalComponent";


function MarksComponent() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // const [errMessage, setErrMessage] = useState('');

  const [modal, setModal] = useState(false);

  const [message , setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const[name, setName] = useState("");

  useEffect(() => {
    retrieveStudents();
    retrieveCourses();
  }, []);

  function retrieveStudents() {
    retrieveListOfStudents()
      .then((response) => {
        setStudents(response.data);
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

  async function onSubmit(values) {

    setModal(true);
    // setMessage("Marks Added Successfully");
    setHeading("Marks");
    setName(values.studentId);

    console.log(values);



    const studentResponse = await retrieveStudentDetail(values.studentId);

    const courseResponse = await retrieveCourseDetail(values.courseId);

    const stud = studentResponse.data;
    const cour = courseResponse.data;

    const mark = {
      student: stud,
      course: cour,
      assessmentType: values.assessmentType,
      assessmentDate: values.assessmentDate,
      scores: values.scoresObtained,
    };

    console.log("mark = " + mark);

     const messageRes = await addMark(mark)
     setMessage(messageRes.data);
     if(messageRes.data === "Marks Added Successfully"){
        
        console.log(messageRes.data, "<--msg");       
        // navigate("/markslist");
     }
    
  }

  function closePop(){
    setModal(false);
  }

  function validate(values) {
    let errors = {};

    if (values.studentId.length === 0) {
      errors.studentId = "Select Student Id";
    }
    if (values.courseId.length === 0) {
      errors.courseId = "Select Course Id";
    }

    if (values.assessmentType.length === 0) {
      errors.assessmentType = "Select Assessment Type";
    }

    if (values.assessmentDate.length === 0) {
      errors.assessmentDate = "Select Assessment Date";
    }

    if (values.scoresObtained === 0 || values.scoresObtained < 10 || values.scoresObtained > 100) {
      errors.scoresObtained = "Enter Valid Student score";
    }

    console.log(values);
    return errors;
  }

  return (
    <Container>
      <h2>Add Assessment Marks</h2>
      
      <Formik
        initialValues={{
          studentId: "",
          courseId: "",
          assessmentType: "",
          assessmentDate: "",
          scoresObtained: "",
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {() => (
            <div className="addForm">
          <Form>
          <br />
              <ErrorMessage
                name="studentId"
                component="div"
                className="errorC"
              />
            <FormGroup>
              <Label for="studentId">Select Student</Label>
              <Field as="select" name="studentId">
                <option value="">Select Student: </option>
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.studentId} ( {student.studentName})
                  </option>
                ))}
              </Field>
            </FormGroup>
            <ErrorMessage
                name="courseId"
                component="div"
                className="errorC"
              />
            <FormGroup>
              <Label for="courseId">Select Course</Label>
              <Field as="select" name="courseId">
                <option value="">Select Course: </option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseId} ({course.courseName})
                  </option>
                ))}
              </Field>
            </FormGroup>

            <ErrorMessage
                name="assessmentType"
                component="div"
                className="errorC"
              />

            <FormGroup>
              <Label for="assessmentType">Assessment Type</Label>
              <Field as="select" name="assessmentType">
                <option value="">Select Type: </option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final">Final</option>
              </Field>
            </FormGroup>

            <ErrorMessage
                name="assessmentDate"
                component="div"
                className="errorC"
              />

            <FormGroup>
              <Label for="assessmentDate">Assessment Date</Label>
              <Field type="date" name="assessmentDate" />
            </FormGroup>

            <ErrorMessage
                name="scoresObtained"
                component="div"
                className="errorC"
              />

            <FormGroup>
              <Label for="scoresObtained">Scores Obtained</Label>
              <Field type="number" name="scoresObtained" />
            </FormGroup>

            <div><p className="errMessage">{message}</p></div>
              <button className="btn btn-success m-5" type="submit">
                Save
              </button>
            
          </Form>
          </div>
        )}
      </Formik>

      {modal &&

<ModalComponent
heading = {heading}
message = {message}
url = "/markslist"
closePop = {closePop}
name = {name}
 />
}

    </Container>
  );
}

export default MarksComponent;
