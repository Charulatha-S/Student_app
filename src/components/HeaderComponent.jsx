import { useAuth } from "./security/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/header.css";

function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function logout() {
    authContext.logout();
  }

  return (
    <>
      <div
        className="header"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/img/bgImage2.jpg"
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>Student Management System</h2>
      </div>

      <header className="border-bottom border-light border-2 mb-0 p-0">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-lg">
              {/* <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/welcome">Home</a> */}
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item fs-5">
                    {isAuthenticated && (
                      <Link className="nav-link" to="/welcome/Charu">
                        Home
                      </Link>
                    )}
                  </li>
                  <li className="nav-item fs-5">
                    {isAuthenticated && (
                      <Link className="nav-link" to="/studentslist">
                        Students
                      </Link>
                    )}
                  </li>
                  <li className="nav-item fs-5">
                    {isAuthenticated && (
                      <Link className="nav-link" to="/courseslist">
                        Courses
                      </Link>
                    )}
                  </li>

                  <li className="nav-item fs-5">
                    {isAuthenticated && (
                      <Link className="nav-link" to="/registerlist">
                        Course Register
                      </Link>
                    )}
                  </li>

                  <li className="nav-item fs-5">
                    {isAuthenticated && (
                      <Link className="nav-link" to="/markslist">
                        Marks
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                  {!isAuthenticated && (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item fs-5">
                  {isAuthenticated && (
                    <Link className="nav-link" to="/logout" onClick={logout}>
                      Logout
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* <div>
      <ul className="nav"> 
        <li>
        {isAuthenticated && (
          <NavLink exact to="/welcome/Charu">Home</NavLink>
        )}
        </li>

        <li>
        {isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/studentslist">
            Students
          </NavLink>
        )}
        </li>
        <li>
        {isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/courseslist">
            Courses
          </NavLink>
        )}
        </li>

        <li>
          {isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/registerlist">
           Course Register
          </NavLink>
          )}
        </li>

        <li>
          {isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/markslist">
            Marks
          </NavLink>
          )}
        </li>
      </ul>
    </div>
    <ul>
      <li>
      {!isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/login">
            Login
          </NavLink>
          )}
      </li>
      <li>
      {isAuthenticated && (
          <NavLink activeStyle={{ color:'#5754a8' }} to="/logout" onClick={logout}>
            Login
          </NavLink>
          )}
      </li>

    </ul> */}
    </>
  );
}

export default HeaderComponent;
