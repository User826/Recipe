import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';

function RecipeModal(props) {

  const [show, setShow] = useState(false);

  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [steps, setSteps] = useState([""]);

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, ""]);

  }

  const handleAddStep = () => {
    addStep()
    console.log("Added step")
  };

  const deleteStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);

  }

  const handleDeleteStep = (index) => {
    deleteStep(index)
    console.log("Deleted step")
  };

  const stepChange = (event, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = event.target.value;
    setSteps(updatedSteps);
  }

  const handleStepChange = (event, index) => {
    stepChange(event, index)
    console.log("Step changed")
  };
  
  
  
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const recipeSubmit = (event) => {
    event.preventDefault()
    console.log(title)
    console.log(description)
    console.log(steps)
    console.log(image)
  }

    
  const handleCloseChanges = () => {
    // This function will update the state in the parent component
    
    props.handleCloseChanges();
  };

   

  return (
    <>
      <Modal show={props.show} onHide={handleCloseChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={recipeSubmit}>
            <Form.Group className="mb-3" controlId="RecipeTitle">
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type='text'
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="RecipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type='text'
                autoFocus
              />
            </Form.Group>
            <RecipeSteps steps={steps} handleAddStep={handleAddStep} handleDeleteStep={handleDeleteStep} handleStepChange={handleStepChange}/>
            
            <Form.Group className="mb-3" controlId="RecipeImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
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