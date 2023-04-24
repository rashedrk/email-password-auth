import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const auth = getAuth(app);
    //state for error in registration
    const [regError, setRegError] = useState('');
    
    //react toast to show successful msg
    const showToastMessage = () => {
        toast.success('Registration successful !', {
            position: toast.POSITION.TOP_CENTER
        });
    };
    //handle register click 
    const handleSubmit = (event) => {
        setRegError('');
        //prevent page refresh
        event.preventDefault();
        //collect data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        //validation
        if (!/(?=.*?[A-Z])/.test(password)) {
            setRegError('password must have At least one upper case');
            return 
        }
        else if (!/(?=.*?[0-9])/.test(password)){
            setRegError('password must have At least one digit');
            return 
        }
        else if (!/.{6,}/){
            setRegError('password must have At 6 digit');
            return 
        }
        //create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                // console.log(result.user);
                showToastMessage();
                sendVerificationEmail(result.user)
            })
            .catch(error =>setRegError(error.message))
        
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(() => {
                alert('verify email');
            })
            .catch(error => {
                setRegError(error.message)
            })
    }
    return (
        <div>
            <h4>Register now  Here</h4>
            <form onSubmit={handleSubmit} >
                <input type="email" name="email" id="email "  required placeholder='Enter email here' />
                <br />
                <input type="password" name="password" id="password" required placeholder='enter password'/>
                <br />
                <input type="submit" value="Register" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> here</small></p>
            <p className='text-danger'>{regError}</p>
            <ToastContainer/>
        </div>
    );
};

export default Register;