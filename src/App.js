import React from "react";
import { Route, Routes } from "react-router-dom";
// *-**--*-*-*--*-*-*--*-*-*-*-*-**--*--*-*-
import Home from "./components/home/Home";
import NoMatch from './components/noMatch/NoMatch';
import Navbar from './components/navbar/Navbar'


const App = () => {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ---------------------------------- */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
