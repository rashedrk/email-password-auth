import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginError, setLoginError] =useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const auth = getAuth(app);
    const handleSubmit = (event) => {
        setLoginError('');
        setSuccess('');
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value
        if (!/(?=.*?[A-Z])/.test(password)) {
            setLoginError('Please include a UPPER CASE letter');
            return
        }
        else if(!/(?=.*?[0-9])/.test(password)){
            setLoginError('Please include at least one digit');
            return
        }
        else if (password.length < 6){
            setLoginError('pass must be 6 digit or more')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {
                    setLoginError('Verify your email to login');
                    return
                }
                setSuccess('user Login success')
            })
    }
    const handlePasswordReset = () => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
        .then(() => alert('please check your email'))
        .catch(error => console.log(error.message))
    }
    return (
        <div className='mx-auto mt-5 w-50'>
            <h2>Please Login is here</h2>
            <Form onSubmit={handleSubmit} className='w-75'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept all terms and condition" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>Forget password? change <button onClick={handlePasswordReset} className='btn btn-link'>here</button></small></p>
            <p><small>New to this website? <Link to='/register'>Register</Link> now</small></p>
            <p className='text-danger'>{loginError}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;