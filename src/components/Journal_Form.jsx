import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

export default function JournalForm({ color }) {
  //getSession()
  let alreadyMounted = false;

  const navigation = useNavigate();
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

    // supabase:
    const { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .insert([{ entry: text.value, author: session.session.user.email }])
      .select("*");

    console.log(error);
    console.log(data);
  };

  return (
    <form onSubmit={handleSaveText}>
      <textarea
        id="text"
        placeholder="Write here..."
        style={{ height: "300px", background: color }}
      />
      <br />
      <br />
      <button>Add entry</button>
    </form>
  );
}
