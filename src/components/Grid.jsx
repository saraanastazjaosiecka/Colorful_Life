import "../scss/Grid_Styles.scss";

export default function Grid({ onColorSelected }) {
  //
  function selectColor(color) {
    onColorSelected(color);
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
    </div>
  );
}
