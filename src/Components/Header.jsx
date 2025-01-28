import React, { useState , useEffect } from 'react';
import { onAuthStateChanged,getAuth, signOut } from "firebase/auth";
import { auth } from "../utils/FireBase";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/Constants";


function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user)

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
        });


    }

    
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid , email , displayName} = user;
          dispatch
          (addUser({
            uid: uid ,
             email:email,
              displayName:displayName
            })
        )
          navigate("/browse")
          // ...
        } else {
          // User is signed out
          // ...
          dispatch(removeUser());
          navigate("/");
        }
      })
        return () => unsubscribe();
    },[])
    return (
        <div className='absolute px-8 py-2 bg-gradient-to-b flex'>
            <img className='w-36'
src = {LOGO}
alt="logo" />

            {user && (<div className='bg-red-500 rounded'>
                <button onClick={handleSignOut}>Signout</button>
            </div>)


            }


        </div>
    )
}
export default Header;