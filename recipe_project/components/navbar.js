// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserNavBar from './usernavbar';
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {LuChefHat} from 'react-icons/lu'
import {GrSearch} from 'react-icons/gr'
import RecipeModal from './modal'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TestRecipeModal from './recipesteps';

function BasicNavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseChanges = () => {
      // This function, when passed to the child, will update the state in the parent component
      handleClose()
      console.log("Save changes clicked");
    };

  return (
    <Container>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    
                        <NavDropdown.Divider />

                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Navbar.Brand>
                    <GiForkKnifeSpoon size={35}/>
                    <br/>
                    Submit a Recipe
                    </Navbar.Brand>
                    <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                    </Button>
                    <Navbar.Brand href="#home">
                        <LuChefHat size={35}/>
                        <br/>
                        My Account
                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                    <GrSearch size={35}/>
                        <br/>
                        Search for Recipes
                    </Navbar.Brand>
                </Nav>
            </Container>
        </Navbar>
        <RecipeModal show={show} onHide={handleClose} handleCloseChanges={handleCloseChanges}/>                
    </Container> 
  );
}

export default BasicNavBar;