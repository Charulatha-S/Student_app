import { addCourseDetail } from "../api/CourseApiService";
import { Formik, Form, ErrorMessage, Field } from "formik";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../ModalComponent";

function AddCourseComponent(){


//   console.log("courseId -> " + id);

  const courseName = '';
  const description = '';
  const creditHours = '';

  // const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [message , setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const[name, setName] = useState("");

//   useEffect(() => courseDetail(), []);

//   function courseDetail(){
  
//   }
   

    function onSubmit(values) {

      setModal(true);
      setMessage("Course Added Successfully");
      setHeading("Course");
      setName(values.courseName);
        console.log(values);
    
        const course = {
       
          courseName: values.courseName,
          description: values.description,
          creditHours: values.creditHours,
        };
    
        console.log("courseList=" + course);
    
        addCourseDetail(course)
        .then((response) => {
          console.log(response.data);
          // navigate("/courseslist");
        })
        .catch((error) => console.log(error));
        
      }

      function closePop(){
        setModal(false);
      }
    
    
      function validate(values) {
        let errors = {};
    
        if (
          values.courseName.length === 0 ||
          values.courseName.length < 5 ||
          values.courseName.length > 20
        ) {
          errors.courseName = "Enter course name";
        }
    
        if (
          values.description.length === 0 ||
          values.description.length < 5 ||
          values.description.length > 20
        ) {
          errors.description = "Enter course Description";
        }
    
        if (
          values.creditHours === 0 ||
          values.creditHours < 1 ||
          values.creditHours > 100
        ) {
          errors.creditHours = "Enter credit Hours";
        }
    
        console.log(values);
        return errors;
      }
    
      return (
        <div className="container">
          <h2> Enter Course Details</h2>
    
          <Formik
            initialValues={{ courseName, description, creditHours }}
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
                    name="courseName"
                    component="div"
                    className="errorC"
                  />
    
                  <fieldset>
                    <label className="label">Course Name: </label>
                    <Field
                      className="field"
                      placeholder="Course Name"
                      name="courseName"
                      type="text"
                    />
                  </fieldset>
                  <br />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="errorC"
                  />
                  <fieldset>
                    <label className="label">Description: </label>
                    <Field
                      className="field"
                      placeholder="description"
                      name="description"
                      type="text"
                    />
                  </fieldset>
                  <br />
                  <ErrorMessage
                    name="creditHours"
                    component="div"
                    className="errorC"
                  />
    
                  <fieldset>
                    <label className="label">Credit Hours: </label>
                    <Field
                      className="field"
                      placeholder="credit hours"
                      name="creditHours"
                      type="number"
                    />
                  </fieldset>
    
                  <div>
                    <button className="btn btn-success m-5" type="submit">
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>

          {modal &&

<ModalComponent
message = {message}
heading = {heading}
url ="/courseslist"
closePop = {closePop}
name = {name}
 />
}

        </div>
      );  

}


export default AddCourseComponent