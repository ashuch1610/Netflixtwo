import React, { useState, useRef } from 'react';
import Header from "./Header";
import { checkValidate } from "../utils/Validate";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "../utils/FireBase";
import { useNavigate } from "react-router-dom";





function Login() {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // validate the form data

        const message = checkValidate(email.current.value, password.current.value);
        console.log(message);
        console.log(email.current.value);
        console.log(password.current.value);
        setErrorMessage(message);
        if (!isSignInForm) {
            //sign up logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            
            
            .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);

                    updateProfile(user, {
                        displayName: "name.current.value", photoURL: "https://example.com/jane-q-user/profile.jpg"
                      }).then(() => {
                        // Profile updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });    
                                  
                   
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                    // ..
                });


        }
        else {
            //sign in logic
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }



    }


    const toggleSignInform = () => {
        //setTitle("Signup")
        setIsSignInForm(!isSignInForm);




    }

    return (
        <div >

            <div  >
                <Header />
                <img src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY-970-80.jpg.webp" alt="" className='w-[fill-available]' />

            </div>


            <form onSubmit={(e) => { e.preventDefault(); handleButtonClick(); }} action="" className='flex flex-col relative top-[-491px] ml-[432px] z-11 w-[400px] '>
                {/* <h1 className='bg-white'>{title}</h1> */}

                <h1 className='bg-white'>{isSignInForm ? "Sign IN" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder='Full Name' />}
                <input
                    ref={email}
                    type="text"
                    placeholder='email address' />
                <input
                    ref={password}
                    type="password"
                    placeholder='password' />
                <p>{errorMessage}</p>
                <button className='bg-white' type='submit'>{isSignInForm ? "Sign IN" : "Sign Up"}</button>

                <p className='bg-white' onClick={toggleSignInform}>{isSignInForm ? "new to netflix?Sign up now" : "Already resigtered? Sign In now"}</p>

            </form>


        </div>
    )
}
export default Login;