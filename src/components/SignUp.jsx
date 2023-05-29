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
      <h1> SignUp </h1>
      <form onSubmit={handleSignUp}>
        <input id="email" placeholder="Podaj swój e-mail"></input>
        <br />
        <input id="password" type="password" placeholder="podaj hasło"></input>
        <br />
        <input
          id="password_repeat"
          type="password"
          placeholder="potwierdz haslo / re-enter haslo"
        ></input>
        <br />
        <button>Zarejestruj się</button>
      </form>
      <Link to="/signin">Zaloguj się</Link>
    </div>
  );
}

export default SignUp;
