import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

import Grid from "./Grid";
import JournalForm from "./Journal_Form";

function Main() {
  //GRID
  const [gridVisible, setGridVisible] = useState(true);
  const [selectedColor, setColor] = useState(null);

  function colorSelection(color) {
    setGridVisible(false);
    setColor(color);
  }

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

  //LOGOUT
  const handleLogout = async () => {
    // supabase:
    let { error } = await supabase.auth.signOut();

    if (!error) {
      navigation("/signin");
    }
  };

  // handleTransferToHistory()
  function handleTransferToHistory() {
    navigation("/journal_entries");
  }

  return (
    <>
      <div className="Main_container">
        <div className="LogOutButtonDiv">
          {" "}
          <button onClick={handleLogout}> Log out </button>
        </div>
        {gridVisible && <Grid onColorSelected={colorSelection} />}
        {!gridVisible && <JournalForm color={selectedColor} />}
        <div className="transferToHistoryButton">
          <button onClick={handleTransferToHistory}>
            Your gratitude journal
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
