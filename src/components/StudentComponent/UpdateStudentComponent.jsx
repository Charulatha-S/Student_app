import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  updateStudentDetail,
  retrieveStudentDetail,
} from "../api/StudentApiService";
import "../css/formStyle.css";
import ModalComponent from "../ModalComponent";

function StudentComponent() {
  const { id } = useParams();
  // console.log("StudentId -> " + id);


  const [studentName, setStudentName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  // const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [message , setMessage] = useState("");

  const [heading, setHeading] = useState("");

  const[name, setName] = useState("");

  useEffect(() => retrieveStudent(), []);

  function retrieveStudent() {
    
      console.log("studId ->" + id);
      retrieveStudentDetail(id)
        .then((response) => {
          setStudentName(response.data.studentName);
          setDateOfBirth(response.data.dateOfBirth);
          setContact(response.data.contact);
          setAddress(response.data.address);
        })
        .catch((error) => console.log(error));
    
  }

  function onSubmit(values) {

    setModal(true);
    setMessage("Student Updated Successfully");
    setHeading("Student");
    setName(values.studentName);
    console.log(values);

    const student = {
      studentId : id,
      studentName: values.studentName,
      dateOfBirth: values.dateOfBirth,
      contact: values.contact,
      address: values.address,
    };

    console.log(student);

    
      updateStudentDetail(id, student)
        .then((response) => {
          // navigate("/studentslist");
        })
        .catch((error) => console.log(error));
    
  }


  function closePop(){
    setModal(false);
  }

  function validate(values) {
    let errors = {};

    if (values.studentName.length === 0 || values.studentName.length < 5 || values.studentName.length > 20){
      errors.studentName = "Enter your name";
    }

    if (values.dateOfBirth.length === 0) {
      errors.dateOfBirth = "Enter your Date of Birth";
    }

    if (values.contact.length !== 10) {
      errors.contact = "Enter Valid Phone Number";
    }

    if (values.address.length === 0 || values.address.length < 5 || values.address.length > 20) {
      errors.address = "Enter your Address";
    }

    console.log(values);
    return errors;
  }

  return (
    <div className="container">
      <h2> Enter Student Details</h2>
      
        <Formik
          initialValues={{ studentName, dateOfBirth, contact, address }}
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
                name="studentName"
                component="div"
                className="errorC"
              />
              <fieldset>
                

                <label className="label">Student Name: </label>
                <Field className="field"
                placeholder="Your Name" 
                name="studentName" 
                type="text" />
              </fieldset>
              <br />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="errorC"
              />
              <fieldset>
                <label
                className="label">Date of Birth: </label>
                <Field
                className="field"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                />
              </fieldset>
              <br />
              <ErrorMessage
                name="contact"
                component="div"
                className="errorC"
              />
              <fieldset>
                <label
                className="label">Contact:    </label>
                <Field 
                className="field"
                placeholder="Phone number" 
                name="contact" 
                type="text" />
              </fieldset>
              <br />
              <ErrorMessage
                name="address"
                component="div"
                className="errorC"
              />
              <fieldset>
                <label
                className="label">Address: </label>
                <Field 
                className="field"
                placeholder="Address"
                 name="address" 
                 type="text" />
              </fieldset>

              {/* <fieldset className="form-group">
                            <label>
                               Student Name
                            </label>
                            <Field type="text" className="form-control" name="studentName"/>
                        </fieldset>

                        <fieldset className="form-group">
                            <label>
                             Date of Birth
                            </label>
                            <Field type="date" className="form-control" name="dateOfBirth"/>
                        </fieldset>

                        <fieldset className="form-group">
                            <label>
                               Contact No
                            </label>
                            <Field type="text" className="form-control" name="contactNo"/>
                        </fieldset>

                        <fieldset className="form-group">
                            <label>
                               Address
                            </label>
                            <Field type="text" className="form-control" name="address"/>
                        </fieldset> */}

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
        heading= {heading}
        message = {message}
        url = "/studentslist"
        closePop = {closePop}
        name = {name}
        />
        }
      </div>
    
  );
}

export default StudentComponent;
