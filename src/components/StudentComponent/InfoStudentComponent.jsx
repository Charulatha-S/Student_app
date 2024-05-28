import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveStudentDetail } from "../api/StudentApiService";
import "../css/infoTable.css";

function InfoStudentComponent() {

  
  const { id } = useParams();
  const [student, setStudent] = useState({});
  console.log("infoid" + id);

  useEffect(() => retrieveStudent(), [id]);

  function retrieveStudent() {
    console.log("studId ->" + id);
    retrieveStudentDetail(id)
      .then((response) => {
        console.log(response.data);
        setStudent(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h3>Student Information</h3>
      <br />
      <table className="infoTable">
        <tr>
          <th>Student Id: </th>
          <td>{student.studentId}</td>
        </tr>
        <tr>
          <th>Student Name: </th>
          <td>{student.studentName}</td>
        </tr>
        <tr>
          <th>Date of Birth: </th>
          <td>{student.dateOfBirth}</td>
        </tr>

        <tr>
          <th>Contact Number: </th>
          <td>{student.contact}</td>
        </tr>

        <tr>
          <th>Address: </th>
          <td>{student.address}</td>
        </tr>
      </table>
    </div>
  );
}

export default InfoStudentComponent;
