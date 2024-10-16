import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fitnessLogo } from '../utils/Constants';
import { onAuthStateChanged } from 'firebase/auth';
import { addLoginUser, removeLoginUser } from "../utils/userSlice";
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { FaSignOutAlt } from 'react-icons/fa';  // Importing an icon for Sign Out

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                navigate("/error");
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addLoginUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(removeLoginUser());
                navigate("/");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [dispatch, navigate]);

    return (
        <header className='flex justify-between items-center p-4 bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg bg-opacity-50'>
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
                <img className="w-28 h-auto" src={fitnessLogo} alt="Fitness Logo" />
                <h1 className="text-2xl text-yellow-400 font-bold tracking-wide">
                    Fitness Tracker
                </h1>
            </div>

            {/* User Information */}
            {user?.email && (
                <div className="flex items-center space-x-6">
                    <p className="text-white text-lg font-semibold">
                        Welcome, <span className="text-yellow-400">{user.displayName || user.email}</span>
                    </p>
                    <button 
                        className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                        onClick={handleSignOut}
                    >
                        <FaSignOutAlt />  {/* Sign out icon */}
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
