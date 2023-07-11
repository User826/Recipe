import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';
import { app } from './firebase'; //Need this in order to use firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { useRouter } from 'next/router'


function LoginModal(props) {

    const [signup, setSignup] = useState(false);

    const handleSignupTrue = () => setSignup(true);
    const handleSignupFalse = () => {
      setSignup(false);
      setValidated(false);
      setPasswordsMatch(true)
      handleLoginCloseChanges()
    }

    const router = useRouter()

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
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

    const postData = async () => {
      const data = {
        "username": username,
        "password": password,
        "admin": false
      };
      //http://localhost:5000/
      const response = await fetch("http://localhost:5000/user", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json();
    };

    const handleSignupSubmit = (event) => {

      if (event.target.id==='signUpButton'){
        const form=event.target.closest('form')
        if (form.checkValidity() === false || password !== confirmPassword || confirmPassword === '') {
        
          event.stopPropagation();
          setPasswordsMatch(false);
        } else{
          setPasswordsMatch(true);
          setValidated(true);
          postData()
          handleSignupFalse()
        }
    
        
      }
      
    };

    const handleLoginSubmit = () => {
      console.log("getting clicked")
      const getData = async () => {
        
        const response = await fetch(`http://localhost:5000/user?username=${loginUsername}&password=${loginPassword}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json();
      };
      getData().then((data) => {
        console.log(data)

        if (data.sendData){
          
          console.log(`This is ${data}`)
          console.log(data)
          console.log("This is after data")
          // var r = [];
          // var testItems = (data.sendData).map( (datum) =>{
              
          //     r.push({title:datum.title, subheader:datum.subheader, imageURI: datum.imageURI, summary: datum.summary, steps:datum.steps})
          //     })
          
          // setRecipes(r)   
          // console.log(r);
          // setGrabbedData(true)
          // setInitialData(true)
          setLoggedIn(true)
          handleLoginCloseChanges()
          alert("Logged in!")
          // console.log(`This is ${data.sendData.admin}`)
          // console.log(data.sendData)
          if (data.sendData.admin){
            sessionStorage.setItem('admin', true)

            const sendAdminData = async () => {
        
              const response = await fetch(`http://localhost:5000/admin`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({"admin":true}) // body data type must match "Content-Type" header
              });
              return response.json();
            };
            sendAdminData().then((adminData) =>{
              console.log(`This is adminData.admin ${adminData.message}`)
              console.log(adminData.message)
              if (adminData.message){
                router.push({
                  pathname: '/admin',
                 })

              }

            })
            


            

          }
        }
        else{
          // setNoRecipes(true)
          alert("Invalid login")
          console.log("Not valid")
        }                           
      });
    }
    
    
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
              
              <Button variant="primary" onClick={handleLoginSubmit}>
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