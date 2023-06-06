import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../services/supabase";

function SignIn() {
  const navigation = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    let { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      navigation("/");
      return;
    }

    setAuthError(error.message);
  };

  return (
    <div className="signIn_container">
      <div className="signIn_signUp_button">
        <Link to="/signup">
          {" "}
          <button> Sign up </button>
        </Link>
      </div>

      <div className="signIn_form">
        <div className="signIn_title">
          {" "}
          <h1> Colorful life </h1>
        </div>
        <div className="signIn_inputs">
          <div className="signIn_error">
            {" "}
            {authError && (
              <div style={{ color: "red" }}> {authError} </div>
            )}{" "}
          </div>

          <form onSubmit={handleSignIn}>
            <input id="email" placeholder="Enter your e-mail address"></input>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            ></input>
            <br />
            <button> Log in </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
