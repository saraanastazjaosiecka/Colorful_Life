import { useNavigate } from "react-router-dom";

export default function Error_404() {
  //navigation
  const navigation = useNavigate();

  function handleTransferToMain() {
    navigation("/");
  }

  return (
    <>
      <h1>404</h1>

      <button onClick={handleTransferToMain}> Home </button>
    </>
  );
}
