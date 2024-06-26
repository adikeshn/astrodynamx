import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FirebaseInfo from "../../../firebase-config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Import here

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== verifyPassword || !username) {
      setErrorMessage("Passwords do not match");
      return;
    }

    await createUserWithEmailAndPassword(FirebaseInfo.auth, username, password)
      .then(async (userCredential) => {
        await signInWithEmailAndPassword(FirebaseInfo.auth, username, password).then(
          (userCreds) => {}
        );
      })
      .catch((error) => {
        error.code == "auth/email-already-in-use"
          ? setErrorMessage("email already in use")
          : error.code == "auth/invalid-email"
          ? setErrorMessage("invalid email")
          : setErrorMessage(error.message);
        setUsername("");
        setPassword("");
        setVerifyPassword("");
      });

    // Passwords match and are valid, proceed with submission
    console.log("Username:", username, "Password:", password);
    // Send login data to backend for authentication
    //e.target.reset();
  };

  useEffect(() => {
    const moniterAuthState = async () => {
      await onAuthStateChanged(FirebaseInfo.auth, (users) => {
        if (users) {
          navigate("/home");
        }
      });
    };
    moniterAuthState();
  });

  return (
    <div className='outsideClass'>
      <div className='login-container'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Email:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='verifyPassword'>Verify Password:</label>
            <input
              type='password'
              id='verifyPassword'
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>

          <div className='logInButton'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        <div className='GoogleButton'>
          <br />
          <div className='GoogleGPlusSignIn'>
            <div className='customBtn'>
              <img
                className='icon'
                src='GoogleLogo2.png'
              />
              <span className='buttonText'> Sign up with Google</span>
            </div>
          </div>
        </div>
        <div className='wrongPage'>
          <Link to='/login'>
            <br />
            <p>Already have an account? Sign in here</p>
          </Link>
        </div>
        {errorMessage != "" ? (
          <div className='errText'>
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SignUp;
