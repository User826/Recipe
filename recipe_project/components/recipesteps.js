import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

function RecipeSteps(props) {

  const handleStepChange = (event, index) => {
    props.handleStepChange(event, index)
  };

  const handleAddStep = () => {
    props.handleAddStep()
  };

  const handleDeleteStep = (index) => {
    props.handleDeleteStep(index)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send steps to database
  };

  return (
    <>      
          <Form onSubmit={handleSubmit}>
            {props.steps.map((step, index) => (
              <InputGroup key={index} className="mb-3">
                <Form.Control
                  placeholder= {`Step ${index + 1}`}
                  aria-label={`Step ${index + 1}`}
                  type="text"
                  value={step}
                  onChange={(event) => handleStepChange(event, index)}
                />
                <Button variant="danger" onClick={() => handleDeleteStep(index)}>
                  Delete
                </Button>
              </InputGroup>
            ))}
            <Button variant="secondary" onClick={handleAddStep}>
              Add Step
            </Button>
          </Form>
    </>
  );
}

export default RecipeSteps;
