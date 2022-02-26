import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import tokenAuth from "./config/token";
import AuthState from "./context/authorization/authorizationState";
import Events from "./components/events/Events";
import EventState from "./context/events/eventState";
import NewEvent from "./components/events/CreateEvent";
import UpdateEvent from "./components/events/UpdateEvent";
import CreateUser from "./components/authorization/CreateUser";

const token = localStorage.getItem("token");
if(token){
  tokenAuth(token);
}

ReactDOM.render(
  <React.StrictMode>
    <EventState>
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
            <Route exact path="/" element={<App />} />
            <Route exact path="/new-user" element={<CreateUser />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/events/new" element={<NewEvent />} />
            <Route exact path="/events/:id" element={<UpdateEvent />} />
          </Routes>
        </BrowserRouter>
      </AuthState>
    </EventState>
  </React.StrictMode>,
  document.getElementById('root')
);
