import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import TicketDetail from "./components/TicketDetail";

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Zendesk Tickets Viewer</h1>
        </header>
        <Routes>
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
