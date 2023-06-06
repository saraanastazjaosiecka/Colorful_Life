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
    <div className="signUp_container">
      <div className="signUp_SignIn_button">
        <Link to="/signin">
          <button> Log in </button>
        </Link>
      </div>

      <div className="signUp_form">
        <div className="signUp_title">
          <h1> Colorful life </h1>
        </div>

        <div className="signUp_inputs">
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
        </div>
      </div>
    </div>
  );
}

export default SignUp;
