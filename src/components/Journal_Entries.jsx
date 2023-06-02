import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";

export default function Journal_Entries() {
  //session
  let alreadyMounted = false;
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!alreadyMounted) {
      getSession();
    }
    alreadyMounted = true;
  }, []);

  // getSession()
  const getSession = async () => {
    //supabase:
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      navigation("/signin");
      return;
    }
    setSession(data);
    console.log(data);
  };

  // getEntries
  const [entries, setEntries] = useState(null); // for getEntries

  //getEntries
  const getEntries = async () => {
    // getting Entries from supabase
    //  needed getSession
    //supabase:
    let { data, error } = await supabase
      .from("Gratitude Journal Entries")
      .select("*")
      .eq("author", session.session.user.email);

    if (!error) {
      setEntries(data);
      setEntries((prev) => [...prev, data[0]]);
    }
    // entries.sort((a, b) => a.id - b.id); // Sorting entries

    console.log(data);
  };

  useEffect(() => {
    if (session) {
      getEntries();
    }
  }, [session]); // getEntries

  // navigation
  const navigation = useNavigate();
  function handleTransferToTheBeginning() {
    navigation("/");
  }

  //LOGOUT
  const handleLogout = async () => {
    // supabase:
    let { error } = await supabase.auth.signOut();

    if (!error) {
      navigation("/signin");
    }
  };

  return (
    <>
      <h1> Gratitude Journal Entries </h1>
      <h2>Your colorful memories...</h2>
      {entries && (
        <ul>
          {entries.map(({ entry, current_date, random_song, id }) => (
            <li key={id}>
              {" "}
              {entry} {current_date}
              <a href={random_song}> Listen to your song on Spotify </a>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleLogout}> Log out </button>
      <br />
      <br />
      <button onClick={handleTransferToTheBeginning}>
        {" "}
        Add another entry{" "}
      </button>
    </>
  );
}
