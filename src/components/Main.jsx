import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

function Main() {
  let alreadyMounted = false;

  const navigation = useNavigate();

  const [session, setSession] = useState(null);
  const [entries, setEntries] = useState(null);

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

  useEffect(() => {
    if (session) {
      getEntries();
    }
  }, [session]);

  const getEntries = async () => {
    //supabase:
    let { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .select("*")
      .eq("author", session.session.user.email);

    if (!error) {
      setEntries(data);
    }
  };

  const handleLogout = async () => {
    // supabase:
    let { error } = await supabase.auth.signOut();

    if (!error) {
      navigation("/signin");
    }
  };

  const handleSaveText = async (e) => {
    e.preventDefault();

    const { text } = e.target.elements;

    // supabase:
    const { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .insert([{ entry: text.value, author: session.session.user.email }])
      .select("*");

    if (!error) {
      setEntries((prev) => [...prev, data[0]]);
    }
  };

  return (
    <>
      <button onClick={handleLogout}> Wyloguj </button>
      <h1> Main </h1>
      <form onSubmit={handleSaveText}>
        <textarea id="text" placeholder="Wpisz tekst..."></textarea>
        <button> Zapisz </button>
      </form>

      {entries && (
        <ul>
          {entries.map(({ entry, id }) => (
            <li key={id}> {entry} </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Main;
