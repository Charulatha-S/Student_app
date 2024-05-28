import React, { useEffect } from "react";
import { useState } from "react";
import { infoRegisterDetail } from "../api/RegisterApiService";
import { useParams } from "react-router-dom";

function InfoRegisterComponent() {

  
  const { courseId } = useParams();
  const { studentId } = useParams();

  const [markListData, setMarkList] = useState([]);

  console.log("courseId -> " + courseId);
  console.log("studId -> " + studentId);
 
  useEffect(() => {
    async function infoReg() {
      const markListRes = await infoRegisterDetail(courseId, studentId);
      setMarkList(markListRes.data);
      console.log(markListRes.data, "<===");
    }
    infoReg();
  }, []);

  return (
    <div className="container">
      <div>
        <h2>Marks List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Course Id</th>
              <th>Assessment Type</th>
              <th>Assessment Date</th>
              <th>Scores Obtained</th>
            </tr>
          </thead>
          <tbody>
            {markListData.map((mark) => (
              <tr key={mark.id}>
                <td>
                  {mark.student.studentId} ({mark.student.studentName})
                </td>
                <td>
                  {mark.course.courseId} ({mark.course.courseName})
                </td>
                <td>{mark.assessmentType}</td>
                <td>{mark.assessmentDate}</td>
                <td>{mark.scores}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoRegisterComponent;
