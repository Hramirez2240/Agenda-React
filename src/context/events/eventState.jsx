import { useReducer } from "react"
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, GET_EVENT_BY_ID } from "../../types";
import EventContext from "./eventContext";
import EventReducer from "./eventReducer"

const EventState = (props) => {
    const initialState = {
        events : null,
        event : null
    }

    const [ state, dispatch ] = useReducer(EventReducer, initialState);

    const getEvents = async() => {
        const token = localStorage.getItem("token");

        if (token) {
          tokenAuth(token);
        }
        
        try {
            const result = await axiosClient.get('Event');

            dispatch({
                type: GET_EVENTS,
                payload: result.data
            })
        } catch (error) {
            return;
        }
    }

    const getEventById = async(id) => {
        try {
            const result = await axiosClient.get(`Event/GetById/${id}`)

            delete result.data.deleted;
            
            dispatch({
                type: GET_EVENT_BY_ID,
                payload: result.data
            });

        } catch (error) {
            return;
        }        
    }

    const addEvent = async(e) => {
        try {
            const result = await axiosClient.post('Event', e);
            
            delete result.data.deleted;
            
            dispatch({
                type: ADD_EVENT,
                payload: result.data
            });

            return;

        } catch (error) {
            return;
        }
    }

    const editEvent = async(e) => {
        try{
            const result = await axiosClient.put(`Event/Update/${e.id}`, e);

            dispatch({
                type: EDIT_EVENT,
                payload: result.data
            });
            
        }catch(e) {
            return;
        }
    }

    const deleteEvent = async(id) => {
        try{
            
            await axiosClient.delete(`Event/Delete/${id}`);

            dispatch({
                type: DELETE_EVENT,
                payload: id
            })

        }catch(e){
            return;
        }
    }

    return (
        <EventContext.Provider
            value={{
                events: state.events,
                event: state.event,
                getEvents,
                getEventById,
                addEvent,
                deleteEvent,
                editEvent
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}
export default EventState;