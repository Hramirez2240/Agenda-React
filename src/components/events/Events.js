import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authorizationContext from "../../context/authorization/authorizationContext";
import EventContext from "../../context/events/eventContext";
import Layout from "../Layout";
import EventCard from "./CardEvent";

const Events = () => {
  const authContext = useContext(authorizationContext);

  const eventContext = useContext(EventContext);

  const { authenticate, authenticateUser } = authContext;

  const { events, getEvents } = eventContext;

  let navigate = useNavigate();

  useEffect(() => {
    if (!authenticate) return navigate("/");
    authenticateUser();

    getEvents();
  }, [authenticate]);

  return (
    <Layout>
      <div className="text-center">
        <Link className="ms-3 text-decoration-none" to={"new"}><button className="btn btn-primary" style={{background: "#1a304e", color: "white", border: "1px solid white", width: "300px", fontSize: "25px", padding: "10px"}}>Add Event</button></Link>
      </div>

      <section style={{width: "100%"}} className="my-4 mx-auto row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {events &&
          events.map((e) => (
            <div key={e.id} className="col">
              <EventCard event={e} />
            </div>
          ))}
      </section>
    </Layout>
  );
};

export default Events;