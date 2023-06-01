import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/scss/App.scss";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Journal_Entries from "./components/Journal_Entries";

function App() {
  return (
    // router
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/journal_entries" element={<Journal_Entries />} />
      </Routes>
    </Router>
  );
}

export default App;
