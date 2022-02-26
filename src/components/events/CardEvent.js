import { useContext } from "react";
import { Link } from "react-router-dom";
import EventContext from "../../context/events/eventContext";

const EventCard = ({ event }) => {

  const eventContext = useContext(EventContext);

  const { deleteEvent } = eventContext;

  const { id, name, date } = event;

  return (
    <div className="card border-primary mx-auto" style={{ width: "18rem", border: "2px solid blue" }}>
     <div className="card-header text-primary">
       <h5>{name}</h5>
     </div>
      <div className="card-body">
        <p className="card-text">
          <span className="mb-2">Date: {new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()}  </span>
        </p>
        <Link id="btnEdit" className="me-3 btn btn-primary" to={`${id}`}>Edit</Link>
        <Link id="btnDelete" className="btn btn-danger"to={"#"} onClick={()=> deleteEvent(id)}>
          Delete
        </Link>
      </div>
    </div>
  );
};

export default EventCard;