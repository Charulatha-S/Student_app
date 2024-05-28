import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import HeaderComponent from "./HeaderComponent";
import ListStudentComponent from "./StudentComponent/ListStudentComponent";
import AddStudentComponent from "./StudentComponent/AddStudentComponent";
import UpdateStudentComponent from "./StudentComponent/UpdateStudentComponent";
import InfoStudentComponent from "./StudentComponent/InfoStudentComponent";
import LogoutComponent from "./LogoutComponent";
import ListCourseComponent from "./CourseComponent/ListCourseComponent";
import AddCourseComponent from "./CourseComponent/AddCourseComponent";
import UpdateCourseComponent from "./CourseComponent/UpdateCourseComponent";
import InfoCourseComponent from "./CourseComponent/InfoCourseComponent";
import ListRegisterComponent from "./RegisterComponent/ListRegisterComponent";
import InfoRegisterComponent from "./RegisterComponent/InfoRegisterComponent";
import CourseRegisterComponent from "./RegisterComponent/CourseRegisterComponent";
import ListMarksComponent from "./MarksComponent/ListMarksComponent";
import MarksComponent from "./MarksComponent/MarksComponent";
import InfoMarksComponent from "./MarksComponent/InfoMarksComponent";
import CalcAverageComponent from "./MarksComponent/CalcAverageComponent";
import CalcHighScoreComponent from "./MarksComponent/CalcHighScoreComponent";
import "./css/studentApp.css";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
}

export default function StudentApp() {
  return (
    <div className="studentApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />

          <div
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/bgImage1.jpg"
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "79.4vh",
            }}
          >
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />

              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/studentslist"
                element={
                  <AuthenticatedRoute>
                    <ListStudentComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/addstudent"
                element={
                  <AuthenticatedRoute>
                    <AddStudentComponent />
                  </AuthenticatedRoute>
                }
              />

            

              <Route
                path="/students/:id"
                element={
                  <AuthenticatedRoute>
                    <UpdateStudentComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/infoStudent/:id"
                element={
                  <AuthenticatedRoute>
                    <InfoStudentComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/courseslist"
                element={
                  <AuthenticatedRoute>
                    <ListCourseComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/addcourse"
                element={
                  <AuthenticatedRoute>
                    <AddCourseComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/courses/:id"
                element={
                  <AuthenticatedRoute>
                    <UpdateCourseComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/infoCourse/:id"
                element={
                  <AuthenticatedRoute>
                    <InfoCourseComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/registerlist"
                element={
                  <AuthenticatedRoute>
                    <ListRegisterComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/registerCourse"
                element={
                  <AuthenticatedRoute>
                    <CourseRegisterComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/infoRegister/:courseId/:studentId"
                element={
                  <AuthenticatedRoute>
                    <InfoRegisterComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/markslist"
                element={
                  <AuthenticatedRoute>
                    <ListMarksComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/addmark"
                element={
                  <AuthenticatedRoute>
                    <MarksComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/infoMark/:id"
                element={
                  <AuthenticatedRoute>
                    <InfoMarksComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/calcAverage"
                element={
                  <AuthenticatedRoute>
                    <CalcAverageComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/calcHighScore"
                element={
                  <AuthenticatedRoute>
                    <CalcHighScoreComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <LogoutComponent />
                  </AuthenticatedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
