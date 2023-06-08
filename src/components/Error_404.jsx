import { useNavigate } from "react-router-dom";

export default function Error_404() {
  //navigation
  const navigation = useNavigate();

  function handleTransferToMain() {
    navigation("/");
  }

  return (
    <>
      <div className="error_main_container">
        <div className="error_title">
          <h1> 404</h1>
        </div>
        <div className="error_subtitle">
          <p> Page not found </p>
        </div>
        <div className="error_button">
          <button onClick={handleTransferToMain}> Home </button>
        </div>
      </div>
    </>
  );
}
