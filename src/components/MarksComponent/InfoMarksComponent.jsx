import { useParams } from "react-router-dom";
import { retrieveMarkDetail } from "../api/MarksApiService";
import { useState, useEffect } from "react";

function InfoMarksComponent() {

  
  const { id } = useParams();
  const [mark, setMark] = useState([]);

  // let mark =[];

  useEffect(retrieveMark, [id]);

  // console.log(mark.student,'student');

  function retrieveMark() {
    retrieveMarkDetail(id)
      .then((response) => {
        console.log(response.data);
        setMark(response.data);

        console.log(mark, "mark in ret mark");
        // console.log(mark);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h3>Marks List</h3>
      <br />
      <table className="infoTable">
        <tr>
          <th>Student: </th>
          {mark.map((res) => (
            <td>
              {res.student.studentId} ({res.student.studentName})
            </td>
          ))}
        </tr>
        <tr>
          <th>Course: </th>
          {mark.map((res) => (
            <td>
              {res.course.courseId} ({res.course.courseName})
            </td>
          ))}
        </tr>
        <tr>
          <th>Assessment Type: </th>
          {mark.map((res) => (
            <td>{res.assessmentType}</td>
          ))}
        </tr>

        <tr>
          <th>Assessment date: </th>
          {mark.map((res) => (
            <td>{res.assessmentDate}</td>
          ))}
        </tr>

        <tr>
          <th>Scores: </th>
          {mark.map((res) => (
            <td>{res.scores}</td>
          ))}
        </tr>
      </table>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Marks List</h1>
  //     <br />

  //     <div>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>Student Id </th>
  //             <th>Course Id</th>
  //             <th>Assessment Type</th>
  //             <th>Assessment date</th>
  //             <th>Scores</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {
  //             mark.map((res) => (
  //             <tr key={res.id}>
  //               <td>{res.student.studentId}</td>
  //               <td>{res.course.courseId}</td>
  //               <td>{res.assessmentType}</td>
  //               <td>{res.assessmentDate}</td>
  //               <td>{res.scores}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}

export default InfoMarksComponent;
