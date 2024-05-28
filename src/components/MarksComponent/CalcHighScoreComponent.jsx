import { useEffect, useState } from "react";
import { Container, FormGroup, Label } from "reactstrap";
import { Formik, Form, Field } from "formik";
import {
  retrieveListOfStudents,
  retrieveStudentDetail,
} from "../api/StudentApiService";
import {
  retrieveListOfCourses,
  retrieveCourseDetail,
} from "../api/CourseApiService";
import { getMark, calcHighScore } from "../api/MarksApiService";
import HighScoreListComponent from "./HighScoreListComponent";
import "../css/header.css"


function CalcHighScoreComponent() {

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isClicked, setClick] = useState(false);

  const [markListData, setMarkList] = useState([]);

  const [message, setMessage] = useState("");

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
    setClick(true);

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


    const marksListRes = await getMark(mark);
    const messageRes = await calcHighScore(mark);
    setMessage(messageRes.data);
    // console.log(messageRes.data);
    setMarkList(marksListRes.data);
    // console.log(markListData, "retrieved");
  }

  return (
    <Container>
      <h2>Calculate HighScore</h2>
      <br />
      <Formik
        initialValues={{
          studentId: "",
          courseId: "",
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <FormGroup>
              <Label for="studentId">Select Student: </Label>
              <Field as="select" name="studentId">
                <option value="">Select Student: </option>
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.studentId} ( {student.studentName})
                  </option>
                ))}
              </Field>
            </FormGroup>
            <FormGroup>
              <Label for="courseId">Select Course: </Label>
              <Field as="select" name="courseId">
                <option value="">Select Course: </option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseId} ({course.courseName})
                  </option>
                ))}
              </Field>
            </FormGroup>

            <div>
              <button className="btn btn-success m-3" type="submit">
                Calculate HighScore
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <p className="message">{message}</p>{" "}
      </div>

      {isClicked && (
        <div>
          {/* {console.log(markListData, "Html")} */}
          <HighScoreListComponent markListData={markListData} />
        </div>
      )}
    </Container>
  );
}

export default CalcHighScoreComponent;
