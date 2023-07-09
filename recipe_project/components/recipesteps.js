import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

function RecipeSteps(props) {
  // const [steps, setSteps] = useState([""]);

  
  // const handleStepChange = (event, index) => {
  //   const updatedSteps = [...steps];
  //   updatedSteps[index] = event.target.value;
  //   setSteps(updatedSteps);
  // };
  const handleStepChange = (event, index) => {
    // const updatedSteps = [...steps];
    // updatedSteps[index] = event.target.value;
    // setSteps(updatedSteps);
    props.handleStepChange(event, index)
  };

  const handleAddStep = () => {
    // setSteps((prevSteps) => [...prevSteps, ""]);
    props.handleAddStep()
  };

  const handleDeleteStep = (index) => {
    // const updatedSteps = [...steps];
    // updatedSteps.splice(index, 1);
    // setSteps(updatedSteps);
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
                {/* <Form.Label>Step {index + 1}</Form.Label> */}
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
