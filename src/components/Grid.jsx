import { useNavigate } from "react-router-dom";
import "../scss/Grid_Styles.scss";

export default function Grid({ onColorSelected }) {
  //
  function selectColor(color) {
    onColorSelected(color);
  }

  //navigation
  const navigation = useNavigate();

  // handleTransferToHistory()
  function handleTransferToHistory() {
    navigation("/journal_entries");
  }

  return (
    <div>
      <button className="grid_button_blue" onClick={() => selectColor("blue")}>
        blue
      </button>
      <button className="grid_button_red" onClick={() => selectColor("red")}>
        red
      </button>
      <button
        className="grid_button_green"
        onClick={() => selectColor("green")}
      >
        green
      </button>
      <button
        className="grid_button_yellow"
        onClick={() => selectColor("yellow")}
      >
        yellow
      </button>
      <br />
      <br />
      <button onClick={handleTransferToHistory}>
        {" "}
        Read your gratitude journal{" "}
      </button>
    </div>
  );
}
