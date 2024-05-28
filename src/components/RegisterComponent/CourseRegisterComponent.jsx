import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, FormGroup, Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  retrieveListOfStudents,
  retrieveStudentDetail,
} from "../api/StudentApiService";
import {
  retrieveCourseDetail,
  retrieveListOfCourses,
} from "../api/CourseApiService";
import { registerForCourse } from "../api/RegisterApiService";
import "../css/formStyle.css";
import ModalComponent from "../ModalComponent";

function CourseRegisterComponent() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // const [errMessage, setErrMessage] = useState("");

  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const [name, setName] = useState("");

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
    // setMessage("Course registered Successfully");
    setHeading("Course Registration");
    // const nameRes = values.course.courseName;
    // setName(nameRes.data);

    // console.log(name);

    const studentResponse = await retrieveStudentDetail(values.studentId);

    const courseResponse = await retrieveCourseDetail(values.courseId);

    const stud = studentResponse.data;
    const cour = courseResponse.data;

    const register = {
      student: stud,
      course: cour,
      registrationDate: values.registrationDate,
    };

    setName(cour.courseName);
    console.log(cour.courseName);

    console.log("reg Course= " + register);

    const messageRes = await registerForCourse(register);
    setMessage(messageRes.data);
    if (messageRes.data === "Course Registered Successfully") {
      // navigate("/registerlist");
      
    }
  }

  function closePop() {
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

    if (values.registrationDate.length === 0) {
      errors.registrationDate = "Select Registration Date";
    }

    console.log(values);
    return errors;
  }

  return (
    <Container>
      <h2>Course Registration</h2>
      <br />
      <Formik
        initialValues={{
          studentId: "",
          courseId: "",
          registrationDate: "",
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
                <Label for="studentId">Select Student:</Label>
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
                <Label for="courseId">Select Course:</Label>
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
                name="registrationDate"
                component="div"
                className="errorC"
              />
              <FormGroup>
                <Label for="registrationDate">Registration Date:</Label>
                <Field type="date" name="registrationDate" />
              </FormGroup>

              <div>
                <p className="errMessage">{message}</p>
              </div>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Register
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>

      {modal && (
        <ModalComponent
          heading={heading}
          message={message}
          url="/registerlist"
          closePop={closePop}
          name={name}
        />
      )}
    </Container>
  );
}

export default CourseRegisterComponent;
