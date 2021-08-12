import axios from 'axios';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Form, Header } from 'semantic-ui-react';
import { api } from '../api';
import Loaders from '../components/Loader';
import Message from '../components/Message';
import { authenticationService } from '../services/authentication-services';

const Signup = () => {
    const history = useHistory();
    
    const [username, setUsername] =  useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    function create_account(e){
        e.preventDefault();
        setLoading(true)
        
        authenticationService.signup(username, email, password, confirmPassword)
        .then(res =>{
            // console.log(res.data.key)
            setLoading(false)
            setError(null)
            history.push("/")
        })
        .catch(error =>{
            setLoading(false)
            setError(error.message)
            console.log(error)
        })

    }

    if (authenticationService.isAuthenticated){
        return <Redirect to="/"/>
    }

    return(
        <div>
            <Header>Create a new Account</Header>
            <Form onSubmit={create_account}>
                <Form.Field>
                    <label>Username</label>
                    <input 
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange = {e => setUsername(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange = {e => setPassword(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        placeholder='password'
                        value={confirmPassword}
                        onChange = {e => setConfirmPassword(e.target.value)}
                    />
                </Form.Field>

                <Button primary
                        fluid 
                        type='submit'
                >
                    Signup
                </Button>
            </Form>
            
            {error && <Message negative message={error}/>}
            {loading && <Loaders />}
        
        </div>

    )
}

export default Signup;