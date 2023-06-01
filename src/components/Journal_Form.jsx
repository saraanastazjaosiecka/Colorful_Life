import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

export default function JournalForm({ color }) {
  //navigation
  const navigation = useNavigate();

  // handleTransferToHistory()
  function handleTransferToHistory() {
    navigation("/journal_entries");
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
        },
      ])
      .select("*");

    console.log(error);
    console.log(data);

    handleTransferToHistory();
  };

  return (
    <>
      <form onSubmit={handleSaveText}>
        <textarea
          id="text"
          placeholder="Write here..."
          style={{ height: "300px", background: color }}
        />
        <br />
        <br />
        <button>Add entry</button>
        <br />
        <br />
      </form>
      <button onClick={handleTransferToHistory}>
        {" "}
        Read your gratitude journal{" "}
      </button>
    </>
  );
}
