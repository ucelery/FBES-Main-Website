import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { FloatingLabel, Stack, Form, Button } from 'react-bootstrap';
import ApiController from '../utils/ApiController'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveEdits = async () => {
        try {
            const res = await ApiController.post("https://inventory-system-server-44k0.onrender.com/api/secure/user/login", {
                username,
                password
            });

            // If no errors redirect to dashbaord
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Stack gap={3} className='col-md-6 mx-auto'>
                <br></br>
                <h1>
                    Login
                </h1>
                <FloatingLabel controlId="login" label="Login">
                    <Form.Control size="sm" type="text" placeholder="Login" onChange={(event) => { setUsername(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password">
                    <Form.Control size="sm" as="textarea" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <Button variant="primary" type="submit" onClick={() => {
                    setIsLoading(true);
                    saveEdits()
                }}>
                    Submit
                </Button>
            </Stack>
        </>
    );
}

export default Login;

