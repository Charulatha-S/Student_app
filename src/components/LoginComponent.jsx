import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import "./css/login.css";
import { useDispatch } from "react-redux";
import { setTrue, setFalse } from "../loggedInSlice";

function LoginComponent() {


  const [username, setUsername] = useState("Charu");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  let dispatch = useDispatch();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);

      dispatch(setTrue());
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/img/smsImage.jpg"
          })`,
          height: "79.4vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // opacity: .8
        }}
      >
        <div className="login">
          <h1>Login</h1>
          <br />
          {showErrorMessage && (
            <div className="errorMessage">
              Authenticated Failed. Please Check your credentials
            </div>
          )}
          <div className="LoginForm">
            <div>
              <label>User Name: </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <br />
            <div>
              <button type="button" name="login" onClick={ handleSubmit}>
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
