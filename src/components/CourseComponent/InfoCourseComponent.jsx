import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveCourseDetail } from "../api/CourseApiService";
import "../css/infoTable.css";

function InfoCourseComponent() {

  
  const { id } = useParams();
  const [course, setCourse] = useState({});
  // console.log("infoid" + id);

  useEffect(() => retrieveCourse(), [id]);

  function retrieveCourse() {
    // console.log("studId ->" + id);
    retrieveCourseDetail(id)
      .then((response) => {
        // console.log(response.data);
        setCourse(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h3>Course Information</h3>
      <br />
      <table className="infoTable">
        <tr>
          <th>Course Id: </th>
          <td>{course.courseId}</td>
        </tr>
        <tr>
          <th>Course Name: </th>
          <td>{course.courseName}</td>
        </tr>
        <tr>
          <th>Description: </th>
          <td>{course.description}</td>
        </tr>

        <tr>
          <th>Credit Hours: </th>
          <td>{course.creditHours}</td>
        </tr>
      </table>
    </div>
  );
}

export default InfoCourseComponent;
