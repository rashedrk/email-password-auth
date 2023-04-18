import React from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../../firebase/firebase.config';

const Register = () => {
    const auth = getAuth(app);
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        //firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <h4>Register Here</h4>
            <form onSubmit={handleSubmit} >
                <input type="email" name="email" id="email " placeholder='Enter email here' />
                <br />
                <input type="password" name="password" id="password"  placeholder='enter password'/>
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;