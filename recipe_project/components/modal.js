import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';

function RecipeModal(props) {

  const [show, setShow] = useState(false);

    
    const handleCloseChanges = () => {
      // This function will update the state in the parent component
      
      props.handleCloseChanges();
    };
    // const handleShow = () => setShow(true);

   

  return (
    <>
      <Modal show={props.show} onHide={handleCloseChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="RecipeTitle">
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control
                // type="email"
                // placeholder="name@example.com"
                type='text'
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="RecipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control
                // type="email"
                // placeholder="name@example.com"
                type='text'
                autoFocus
              />
            </Form.Group>
            <RecipeSteps/>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
              
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChanges}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecipeModal;