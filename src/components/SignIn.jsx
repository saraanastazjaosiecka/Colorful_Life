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
      <h1> SignIn </h1>
      {authError && <div style={{ color: "red" }}> {authError} </div>}
      <form onSubmit={handleSignIn}>
        <input id="email" placeholder="podaj swój adres email"></input>
        <br />
        <input id="password" type="password" placeholder="Podaj hasło"></input>
        <br />
        <button>Zaloguj się</button>
      </form>
      <Link to="/signup"> Załóż konto </Link>
    </>
  );
}

export default SignIn;
