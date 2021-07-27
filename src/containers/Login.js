import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Header } from 'semantic-ui-react';
import { api } from '../api';
import Loaders from '../components/Loader';
import Message from '../components/Message';
import { history } from '../helpers';
import { authenticationService } from '../services/authentication-services';

const Login = () => {
    const [username, setUsername] =  useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    function user_login(e){
        e.preventDefault();
        setLoading(true)
        
        axios.post(api.auth.login, {
            username, email, password
        })
        .then(res =>{
            localStorage.setItem("token", res.data.key)
            console.log(res.data.key)
            setLoading(false)
            setError(null)
            history.push("/")
        })
        .catch(error =>{
            setLoading(false)
            setError(error.message || error)
            console.log(error.message)
        })

    }

    if (authenticationService.isAuthenticated){
        return <Redirect to="/"/>
    }

    return(
        <div>
            <Header>Log into your account</Header>
            <Form onSubmit={user_login}>
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

                <Button primary
                        fluid 
                        type='submit'
                >
                    Login
                </Button>
            </Form>
            
            {error && <Message negative message={error}/>}
            {loading && <Loaders />}
        
        </div>

    )
}

export default Login;