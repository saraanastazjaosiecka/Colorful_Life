export default function Grid({ onColorSelected }) {
  function selectColor(color) {
    onColorSelected(color);
  }

  return (
    <>
      <h1 className="grid_title_question">
        {" "}
        What color matches your current mood?{" "}
      </h1>
      <br />
      <div className="grid_buttons">
        <div className="grid_buttons_first_line">
          <button
            className="grid_button_C_major"
            onClick={() => selectColor("#ff1d04")}
          >
            {/* C major */}
          </button>

          <button
            className="grid_button_G_major"
            onClick={() => selectColor("#fb9507")}
          >
            {/* G major */}
          </button>
          <button
            className="grid_button_D_major"
            onClick={() => selectColor("#fbff00")}
          >
            {/* D major */}
          </button>
        </div>

        <div className="grid_buttons_second_line">
          <button
            className="grid_button_A_major"
            onClick={() => selectColor("#4dd34d")}
          >
            {/* A major */}
          </button>

          <button
            className="grid_button_E_major"
            onClick={() => selectColor("#cef2f4")}
          >
            {/* E major */}
          </button>

          <button
            className="grid_button_B_major"
            onClick={() => selectColor("#86d3ff")}
          >
            {/* B major */}
          </button>
        </div>

        <div className="grid_buttons_third_line">
          <button
            className="grid_button_Gb_major"
            onClick={() => selectColor("#83a6f2")}
          >
            {/* F#/Gb */}
          </button>

          <button
            className="grid_button_Db_major"
            onClick={() => selectColor("#964df5")}
          >
            {/* Db major */}
          </button>

          <button
            className="grid_button_Ab_major"
            onClick={() => selectColor("#ca90f0")}
          >
            {/* Ab major */}
          </button>
        </div>

        <div className="grid_buttons_fourth_line">
          <button
            className="grid_button_Eb_major"
            onClick={() => selectColor("#df519a")}
          >
            {/* Eb major */}
          </button>
          <button
            className="grid_button_Bb_major"
            onClick={() => selectColor("#b48295")}
          >
            {/* Bb major */}
          </button>

          <button
            className="grid_button_F_major"
            onClick={() => selectColor("#b73939")}
          >
            {/* F major */}
          </button>
        </div>
      </div>
    </>
  );
}
