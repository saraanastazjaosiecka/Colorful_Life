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
    <div className="Journal_Entries_container">
      <div className="Journal_Entries_Elements">
        <div className="logOut_Button_Entries">
          <button onClick={handleLogout}> Log out </button>{" "}
        </div>
        <div className="Title_Entries">
          {" "}
          <h1> Gratitude Journal </h1>{" "}
        </div>
        <div className="second_container_entries">
          <div className="Add_another_entry_button">
            <button onClick={handleTransferToTheBeginning}>
              {" "}
              Add another entry{" "}
            </button>
          </div>
          <div className="Journal_Entries">
            {entries && (
              <ul className="Ul_Entries">
                {entries.map(
                  ({
                    entry,
                    current_date,
                    random_song,
                    id,
                    selected_color,
                  }) => (
                    <li key={id}>
                      <div
                        style={{
                          backgroundColor: selected_color,
                        }}
                        className="journal_entry"
                      >
                        <div className="current_date_div"> {current_date}</div>
                        <div className="entry_div"> {entry} </div>
                        <div className="song_button">
                          {" "}
                          <a href={random_song} target="_blank">
                            Listen to your song on Spotify{" "}
                          </a>{" "}
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
