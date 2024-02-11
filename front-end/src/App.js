import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import NonMain from "./NonMain";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" Component={Main} />
          <Route path="/non-main" Component={NonMain} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
