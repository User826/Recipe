import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { LuChefHat } from 'react-icons/lu';
import { GrSearch } from 'react-icons/gr';
import RecipeModal from './recipemodal';
import LoginModal from './loginmodal';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function BasicNavBar() {
    const [show, setShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleClose = () => setShow(false); // Close RecipeModal
    const handleShow = () => setShow(true); // Show RecipeModal
    const handleLoginClose = () => setLoginShow(false); // Close LoginModal
    const handleLoginShow = () => setLoginShow(true); // Show LoginModal

    const handleLoginCloseChanges = () => {
        handleLoginClose();
        console.log("Login modal closed");
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin'); // Clear admin session storage
        setIsLoggedIn(false); // Update logged-in state
        console.log("Logged out");
    };

    useEffect(() => {
        // Check if the admin is already logged in when the component mounts
        const adminSession = sessionStorage.getItem('admin');
        if (adminSession) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Container>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Recipe Manager</Navbar.Brand>
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
                        {/* <Navbar.Brand>
                            <GiForkKnifeSpoon size={35} />
                            <br />
                            Submit a Recipe
                        </Navbar.Brand> */}
                        <Button variant="primary" onClick={handleShow}>
                            Add a Recipe
                        </Button>
                        {isLoggedIn ? ( // Conditional rendering for Log Out
                            <Button variant="danger" onClick={handleLogout}>
                                Log Out
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleLoginShow}>
                                Log In
                            </Button>
                        )}
                        <Navbar.Brand href="#home">
                            <LuChefHat size={35} />
                            <br />
                            My Account
                        </Navbar.Brand>
                        <Navbar.Brand href="/search">
                            <GrSearch size={35} />
                            <br />
                            Search for Recipes
                        </Navbar.Brand>
                    </Nav>
                </Container>
            </Navbar>
            {/* Pass the correct props for modals */}
            <RecipeModal show={show} handleCloseChanges={handleClose} />
            <LoginModal show={loginShow} handleCloseChanges={handleLoginCloseChanges} />
        </Container>
    );
}

export default BasicNavBar;
