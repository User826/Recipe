import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from 'react-bootstrap/InputGroup';

function TestRecipeModal(props) {
  const [steps, setSteps] = useState([]);

  const handleAddStep = () => {
    setSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleStepChange = (event, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = event.target.value;
    setSteps(updatedSteps);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send steps to database
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {steps.map((step, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Step {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={step}
                  onChange={(event) => handleStepChange(event, index)}
                />
                <Button variant="danger" onClick={() => handleDeleteStep(index)}>
                  Delete
                </Button>
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={handleAddStep}>
              Add Step
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TestRecipeModal;
