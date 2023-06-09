import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/main.scss";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Journal_Entries from "./components/Journal_Entries";
import Error_404 from "./components/Error_404";

function App() {
  return (
    // router
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/journal_entries" element={<Journal_Entries />} />
        <Route path="*" element={<Error_404 />} />
      </Routes>
    </Router>
  );
}

export default App;
