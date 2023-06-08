import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

// Array with songs
const songs = {
  "#ff1d04": {
    links: ["C major 1", " C major 2", " C major 3", "C major 4"],
  },
  "#fb9507": {
    links: ["G major 1 ", " G major 2", "G major 3", "G major 4"],
  },
  "#fbff00": {
    links: ["D major 1", "D major 2", "D major 3", "D major 4"],
  },
  "#4dd34d": {
    links: [" A major 1", " A major 2", " A major 3", "A major 4"],
  },
  "#cef2f4": {
    links: ["E major 1", " E major  2", " E major  3", "E major  4"],
  },
  "#86d3ff": {
    links: ["B major 1", " B major 2", " B major 3", "B major 4"],
  },
  "#83a6f2": {
    links: ["Gb major 1", " Gb major 2", " Gb major 3", "Gb major 4"],
  },
  "#964df5": {
    links: ["Db major 1", " Db major 2", " Db major 3", "Db major 4"],
  },
  "#ca90f0": {
    links: ["Ab major 1", " Ab major 2", " Ab major 3", "Ab major 4"],
  },
  "#df519a": {
    links: [" Eb major 1", "  Eb major 2", "  Eb major 3", " Eb major 4"],
  },
  "#b48295": {
    links: ["  Bb major 1", "   Bb major 2", "   Bb major 3", "  Bb major 4"],
  },
  "#b73939": {
    links: [" F major 1", "  F major 2", "  F major 3", " F major 4"],
  },
};

export default function JournalForm({ color }) {
  // Getting random song
  const mySong =
    songs[color].links[Math.floor(Math.random() * songs[color].links.length)];
  console.log(mySong);

  //navigation
  const navigation = useNavigate();

  // handleTransferToHistory()
  function handleTransferToHistory() {
    navigation("/journal_entries");
  }

  // refreshing page
  function handleTransferToTheBeginning() {
    window.location.reload(false);
  }

  //getSession()
  let alreadyMounted = false;

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!alreadyMounted) {
      getSession();
    }

    alreadyMounted = true;
  }, []);

  const getSession = async () => {
    //supabase:
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigation("/signin");
      return;
    }

    setSession(data);
  };

  //handleSaveText() - sending text entries to supabase
  const handleSaveText = async (e) => {
    e.preventDefault();

    const { text } = e.target.elements;

    // currentDate
    const currentDate = new Date();
    const visiblecurrentDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    console.log(visiblecurrentDate);

    // supabase:
    const { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .insert([
        {
          entry: text.value,
          author: session.session.user.email,
          current_date: visiblecurrentDate,
          random_song: mySong,
          selected_color: color,
        },
      ])
      .select("*");

    console.log(error);
    console.log(data);

    handleTransferToHistory();
  };

  // textarea text Color
  const [textColor, setTextColor] = useState(null);
  const [backgroundColor, setbackgroundColor] = useState(null);

  useEffect(() => {
    if (color == "#ff1d04") {
      setTextColor("white");
    } else if (color == "#964df5") {
      setTextColor("white");
    } else if (color == "#b48295") {
      setTextColor("white");
    } else if (color == "#b73939") {
      setTextColor("white");
    } else if (color == "#df519a") {
      setTextColor("white");
    } else {
      setTextColor("black");
    }
    alreadyMounted = true;
  }, []);

  //backgroundColor

  return (
    <>
      <div className="Journal_Form">
        <h1 className="journal_form_title_question">
          {" "}
          What are you grateful for today?{" "}
        </h1>

        <form onSubmit={handleSaveText}>
          <div className="Journal_Form_Div">
            <div className="Journal_Form_textarea">
              <textarea
                className="form_textarea"
                id="text"
                placeholder="Write here..."
                style={{
                  background: color,
                  color: textColor,
                }}
              />
            </div>
            <div className="Add_entry_button">
              <button>Add entry </button>
            </div>
          </div>
          <br />
          <br />
        </form>
        <br />
        <div className="button_choose_color">
          <button onClick={handleTransferToTheBeginning}>
            {" "}
            Choose another color{" "}
          </button>
        </div>
      </div>
    </>
  );
}
