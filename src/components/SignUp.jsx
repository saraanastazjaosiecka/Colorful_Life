import { useNavigate, Link } from "react-router-dom";
import supabase from "../services/supabase";

function SignUp() {
  const navigation = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, password_repeat } = e.target.elements;

    if (password.value !== password_repeat.value) {
      alert("Oba hasła muszą być identyczne");
      return;
    }

    let { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      navigation("/");
      return;
    }

    console.error(error);
  };

  return (
    <div>
      <h1> Colorful life </h1>
      <form onSubmit={handleSignUp}>
        <input id="email" placeholder="Enter your e-mail address"></input>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Enter password"
        ></input>
        <br />
        <input
          id="password_repeat"
          type="password"
          placeholder="Re-enter password"
        ></input>
        <br />
        <button> Sign up </button>
      </form>
      <Link to="/signin"> Log in </Link>
    </div>
  );
}

export default SignUp;
