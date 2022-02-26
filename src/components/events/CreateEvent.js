import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authorizationContext from "../../context/authorization/authorizationContext";
import EventContext from "../../context/events/eventContext";
import Layout from "../Layout";

const formStyles = {
  width: "60%",
  margin: "5rem auto",
};

const NewEvent = () => {
    
  const authContext = useContext(authorizationContext);
  const { authenticate, user } = authContext;

  const eventContext = useContext(EventContext);
  const { addEvent } = eventContext;

  let navigate = useNavigate();
  
  useEffect(()=> {
      if(!authenticate) return navigate('/');
  }, [authenticate])

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
  });

  const {name,date} = newEvent;

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const checkDates = (date) => {
    
    let now = new Date(),
        event_date = new Date(date);

    if(event_date < now) {
      console.log('error');
      return null;
    }

    return {event_date};
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let dates = checkDates(date);
    if( dates === null) {
      return;
    }

    setNewEvent({
      ...newEvent,
      eventDate: dates.event_date.toISOString()
    })

    addEvent(newEvent);
    navigate('/events');
  };

  return (
    <Layout>
      <form 
        className="shadow-lg p-5 mb-5 bg-body rounded"
        style={formStyles}
        onSubmit={handleSubmit}>
        <h1 className="text-center">New Event</h1>

        <div className="form-group my-4">
          <label htmlFor="name" className="fw-bold">Name</label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="startDate" className="fw-bold">Date</label>
          <input
            value={date}
            onChange={handleChange}
            type="datetime-local"
            className="form-control"
            name="date"
            required
          />
        </div>

        <div className="d-grid center">
          <button type="submit" className="mt-4 btn btn-lg btn-primary btn-css">
            Create Event
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default NewEvent;