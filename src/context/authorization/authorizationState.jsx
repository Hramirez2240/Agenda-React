import { useReducer } from "react";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";
import { LOGIN_ERROR, LOGIN_SUCCESS, OBTAIN_USER, SIGN_OFF } from "../../types";
import authorizationContext from "./authorizationContext";
import authorizationReducer from "./authorizationReducer";

const AuthorizationState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        user: null
    }

    const [state, dispatch] = useReducer(authorizationReducer, initialState);

    const LogIn = async data => {
        try{
            const response = await axiosClient.post("Login", data);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })

            authenticateUser();
        } catch(error){

            console.log(error);
        }
    };

    const authenticateUser = async() => {
        const token = localStorage.getItem('token');

        if( token ) {

            tokenAuth(token);
        }

        try {
            
            const response = await axiosClient.get("Login");
            console.log(response.data)
            dispatch({
                type: OBTAIN_USER,
                payload: response.data
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    };

    const createUser = async(user) => {
        try{
            const response = await axiosClient.post("User", user)
            console.log(response);
        } catch(error){
            return;
        }
    };

    const signOut = () => {
        dispatch({
            type: SIGN_OFF,
        });
    };

    return(

        <authorizationContext.Provider
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                LogIn,
                createUser,
                authenticateUser,
                signOut

            }}
        >
            {props.children}
        </authorizationContext.Provider>
    );
};

export default AuthorizationState;