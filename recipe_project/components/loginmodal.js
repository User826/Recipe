import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';

function LoginModal(props) {
    const [signup, setSignup] = useState(false);
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const router = useRouter();

    const handleSignupTrue = () => setSignup(true);
    const handleSignupFalse = () => {
        setSignup(false);
        setValidated(false);
        setPasswordsMatch(true);
        handleLoginCloseChanges();
    };

    useEffect(() => {
        setValidated(password === confirmPassword && confirmPassword !== '');
    }, [confirmPassword, password]);

    const postData = async () => {
        const data = {
            username,
            password,
            admin: false,
            approved: false,
        };

        const response = await fetch("http://localhost:5000/user", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });

        return response.json();
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        if (validated) {
            await postData();
            handleSignupFalse();
        }
    };

    const getData = async () => {
        const response = await fetch(`http://localhost:5000/user?username=${loginUsername}&password=${loginPassword}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        return response.json();
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const data = await getData();
        console.log("Login Data:", data);
        if (data.sendData) {
            setLoggedIn(true);
            alert("Logged in!");

            // Store admin status in session storage
            sessionStorage.setItem('admin', data.sendData.admin);

            // Redirect to admin page if admin
            if (data.sendData.admin) {
              router.replace('/admin')
            } else {
                alert("Welcome, " + data.sendData.username);
            }

            handleLoginCloseChanges();
        } else {
            alert("Invalid login");
        }
    };

    const handleLoginCloseChanges = () => {
        props.handleLoginCloseChanges();
    };

    if (!signup) {
        return (
            <Modal show={props.show} onHide={handleLoginCloseChanges}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                        <Button variant="primary" type="button" onClick={handleSignupTrue}>
                            Sign up
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLoginCloseChanges}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={props.show} onHide={handleSignupFalse}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
                        <Form.Group className='mb-3' controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!passwordsMatch}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordsMatch ? 'Please confirm your password.' : 'Passwords do not match.'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button id="signUpButton" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSignupFalse}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginModal;
