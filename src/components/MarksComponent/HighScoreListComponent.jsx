function HighScoreListComponent(props) {
  
  return (
    <div>
      <h3>Marks List</h3>
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
          {props.markListData.map((props) => (
            <tr key={props.id}>
              <td>{props.student.studentId} ({props.student.studentName})</td>
              <td>{props.course.courseId} ({props.course.courseName})</td>
              <td>{props.assessmentType}</td>
              <td>{props.assessmentDate}</td>
              <td>{props.scores}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScoreListComponent;
