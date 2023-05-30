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
    <>
      <h1> Colorful life </h1>
      {authError && <div style={{ color: "red" }}> {authError} </div>}
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
      <Link to="/signup"> Sign up </Link>
    </>
  );
}

export default SignIn;
