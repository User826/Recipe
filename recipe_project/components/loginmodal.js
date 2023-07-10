import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';
import { app } from './firebase'; //Need this in order to use firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


function LoginModal(props) {

    const [signup, setSignup] = useState(false);

    const handleSignupTrue = () => setSignup(true);
    const handleSignupFalse = () => {
      setSignup(false);
      setValidated(false);
      setPasswordsMatch(true)
      handleLoginCloseChanges()
    }

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      // forceUpdate()
    //   if (password !== confirmPassword) {
    //     setValidated(false);
    //   } else {
    //     setValidated(true);
    //   }
    };
    useEffect(() => {
      if (password !== confirmPassword) {
        setValidated(false);
      } else {
        setValidated(true);
      }
    }, [confirmPassword, password]);

    const handleSignupSubmit = (event) => {

      if (event.target.id==='signUpButton'){
        const form=event.target.closest('form')
        if (form.checkValidity() === false || password !== confirmPassword || confirmPassword === '') {
        
          event.stopPropagation();
          setPasswordsMatch(false);
        } else{
          setPasswordsMatch(true);
          setValidated(true);
        }
    
        
      }
      
    };
    
    
  const recipeSubmit = (event) => {
    
    event.preventDefault()  
    console.log('recipeSubmit running')
  }
    
  const handleLoginCloseChanges = () => {
    // This function will update the state in the parent component    
    props.handleLoginCloseChanges();
  };

  if (!signup){
    return (
      <>
        <Modal show={props.show} onHide={handleLoginCloseChanges}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={recipeSubmit}>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'                
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'                
                />
              </Form.Group>
              
              <Button variant="primary" >
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
            <Button variant="primary" onClick={handleLoginCloseChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }
  else{
    return (
      <>
        <Modal show={props.show} onHide={handleSignupFalse}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
              <Form.Group className='mb-3' controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" required />
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
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  onChange={handleConfirmPasswordChange}
                  isInvalid={!passwordsMatch}
          
                />
                <Form.Control.Feedback type="invalid">
                  {passwordsMatch ? 'Please confirm your password.' : 'Passwords do not match.'}
                </Form.Control.Feedback>
              </Form.Group>

                <Button id="signUpButton" variant="primary" onClick={handleSignupSubmit}>  
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
      </>
    );

  }
   
  
}

export default LoginModal;