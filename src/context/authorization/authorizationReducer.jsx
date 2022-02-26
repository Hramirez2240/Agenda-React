import { LOGIN_ERROR, LOGIN_SUCCESS, OBTAIN_USER, SIGN_OFF } from "../../types";

const AuthorizationReducer = (state, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload);

            return{
                ...state,
                token: localStorage.getItem("token"),
                authenticate: true,
            }

        case OBTAIN_USER:
            return{
                ...state,
                authenticate: true,
                user: {
                    id: parseInt(action.payload[0])
                },
            }

        case LOGIN_ERROR:
        case SIGN_OFF:
            localStorage.removeItem("token");
            return{
                ...state,
                token: null,
                authenticate: false,
                user: null
            }

        default:
            return state;
    }
};

export default AuthorizationReducer;