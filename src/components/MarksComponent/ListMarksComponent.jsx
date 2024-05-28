import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { retrieveListOfMarks } from "../api/MarksApiService";
import InfoIcon from "@mui/icons-material/Info";

function ListMarksComponent() {

    
  const [marks, setMarks] = useState([]);

  // const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => refreshMarks(), []);

  function refreshMarks() {
    retrieveListOfMarks()
      .then((response) => {
        setMarks(response.data);
        // console.log(marks);
      })
      .catch((error) => console.log(error));
  }

  function addMarks() {
    navigate(`/addmark`);
  }

  function infoMark(id) {
    navigate(`/infoMark/${id}`);
  }

  function calcAverage() {
    navigate(`/calcAverage`);
  }

  function calcHighScore() {
    navigate(`/calcHighScore`);
  }

  return (
    <div className="container">
      <h4>Marks List</h4>
      <div className="btn btn-success m-2" onClick={addMarks}>
        Add Assessment Marks
      </div>

      {/* {message && <div className="alert alert-warning">{message}</div> } */}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Student</th>
              <th>Course</th>
              <th>Assessment Type</th>
              <th>Assessment Date</th>
              <th>Scores Obtained</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.id}</td>
                <td>
                  {mark.student.studentId} ({mark.student.studentName})
                </td>
                <td>
                  {mark.course.courseId} ({mark.course.courseName})
                </td>
                <td>{mark.assessmentType}</td>
                <td>{mark.assessmentDate}</td>
                <td>{mark.scores}</td>

                <td>
                  <InfoIcon onClick={() => infoMark(mark.id)} />
                </td>

                {/* <td><button className="btn btn-success"
                                onClick={() =>infoMark(mark.id)}>Info</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-success m-3"
        onClick={calcAverage}
        type="button"
      >
        {" "}
        Calculate Average
      </button>

      <button
        className="btn btn-success m-3"
        onClick={calcHighScore}
        type="button"
      >
        {" "}
        Calculate High Score
      </button>
    </div>
  );
}

export default ListMarksComponent;
