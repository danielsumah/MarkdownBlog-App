import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import Message from '../components/Message';

const Login = () => {
    const [username, setUsername] =  useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    function user_login(e){
        e.preventDefault();
        alert("Logged in ")

    }

    return(
        <div>
            <Header>Log into your account</Header>
            {error && <Message negative message={error}/>}
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
        
        
        </div>

    )
}

export default Login;