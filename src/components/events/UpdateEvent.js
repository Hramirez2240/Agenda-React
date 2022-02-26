import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authorizationContext from "../../context/authorization/authorizationContext";
import EventContext from "../../context/events/eventContext";
import Layout from "../Layout";

const formStyles = {
  width: "60%",
  margin: "5rem auto",
};

const UpdateEvent = () => {
    
  const authContext = useContext(authorizationContext);
  const { authenticate, user } = authContext;

  const eventContext = useContext(EventContext);
  const { events, editEvent } = eventContext;

  let params = useParams();

  const eventToEdit = events.find(e => e.id === parseInt(params.id));

  let navigate = useNavigate();
  
  useEffect(()=> {
      if(!authenticate) return navigate('/');
  }, [authenticate])

  const [event, setEvent] = useState({
    id : eventToEdit.id,
    name: eventToEdit.name,
    date: eventToEdit.date,
    completed:eventToEdit.completed,
  });

  const {name, date} = event;

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const checkDates = (date) => {
    
    let now = new Date(),
        event_date = new Date(date);

    if(event_date < now ) {
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

    setEvent({
      ...event,
      date: dates.event_date.toISOString()
    })

    editEvent(event);
    navigate('/events');
  };

  return (
    <Layout>
      <form 
        className="shadow-lg p-5 mb-5 bg-body rounded"
        style={formStyles}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Update Event</h1>

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
          <label htmlFor="date" className="fw-bold">Date</label>
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
            Edit Event
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateEvent;