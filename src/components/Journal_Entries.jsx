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
      .eq("author", session.session.user.email)
      .order("id", { ascending: false }); // Sorting entries
    console.log(data);

    if (!error) {
      setEntries(data);
    }
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
              <div
                className="journal_entry"
                style={{ border: `3px solid black` }}
              >
                <div
                  className="current_date_div"
                  style={{ border: "1px solid red" }}
                >
                  {" "}
                  {current_date}
                </div>
                <div style={{ border: `1px solid blue` }}> {entry} </div>
                <div>
                  {" "}
                  <a
                    href={random_song}
                    target="_blank"
                    style={{ border: "1px solid yellow" }}
                  >
                    {" "}
                    Listen to your song on Spotify{" "}
                  </a>{" "}
                </div>
              </div>
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
