import React, { useRef, useState } from 'react';
import Header from './Header';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addLoginUser } from '../utils/userSlice';
import { validation } from '../utils/validation';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [validationCheck, setValidationCheck] = useState(null);
    const dispatch = useDispatch();

    const validationHandler = () => {
        const errorMessage = validation(emailRef?.current?.value, passwordRef?.current?.value);
        if (errorMessage) {
            setValidationCheck(errorMessage);
            return false;
        } else {
            setValidationCheck(null);
            return true;
        }
    }

    const toggleSignedInForm = () => {
        setLoggedInStatus(!loggedInStatus);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validationHandler();
        if (!isValid) return;

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userName = userNameRef.current?.value; // Optional, only if signing up

        if (!email || !password || (!loggedInStatus && !userName)) {
            setValidationCheck("Please fill in all fields.");
            return;
        }

        try {
            if (!loggedInStatus) {
                // Sign Up
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: userName
                });
                dispatch(addLoginUser({ uid: user.uid, email: user.email, displayName: userName }));
            } else {
                // Sign In
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                dispatch(addLoginUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setValidationCheck("Authentication failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600   flex flex-col items-center">
            <Header />
            <form onSubmit={handleSubmit}
                className="relative w-11/12 md:w-8/12 lg:w-5/12 p-10 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl space-y-6 mt-10">
                <h1 className='font-bold text-white text-4xl text-center'>
                    {loggedInStatus ? "Sign In" : "Sign Up"}
                </h1>
                
                {/* Displaying Error Message */}
                {validationCheck && (
                    <p className='text-red-500 text-center font-semibold'>
                        {validationCheck}
                    </p>
                )}
                
                {!loggedInStatus && (
                    <input
                        ref={userNameRef}
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
                
                <div className="space-y-2">
                    <label className="block text-white text-lg font-medium">Email</label>
                    <input 
                        ref={emailRef}
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full p-3 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-white text-lg font-medium">Password</label>
                    <input 
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <button 
                    type="submit"
                    className="w-full text-white bg-blue-600 p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {loggedInStatus ? "Sign In" : "Sign Up"}
                </button>

                <div className="text-center">
                    <p className="text-white font-medium cursor-pointer hover:underline"
                        onClick={toggleSignedInForm}>
                        {loggedInStatus ? "New to FitnessApp? Sign Up Now!" : "Already registered? Sign In Now"}
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;
