import React from "react";
import { useDispatch } from "react-redux";
// UPDATED: Import from the new services folder
import authService from '../../services/auth'; 
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        // The new MERN authService.logout() calls the backend to clear the cookie
        authService.logout().then(() => {
            // Once backend confirms logout, we clear the Redux state
            dispatch(logout());
        });
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
