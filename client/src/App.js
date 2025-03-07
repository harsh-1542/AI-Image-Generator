// import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>

<div className="container">
<div className="wrapper">

      <Navbar /> {/* ✅ Navbar is always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
</div>

</div>
    </>
  );
}

export default App;
