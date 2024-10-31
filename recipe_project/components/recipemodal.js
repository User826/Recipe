import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';
import { app } from './firebase'; // Need this in order to use firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function RecipeModal(props) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURI, setImageURI] = useState("Empty");
  const [steps, setSteps] = useState([""]);

  useEffect(() => {
    if (imageURI !== "Empty") {
      console.log("I'm running postData");
      postData().then(() => {
        window.location.reload(true);
      });
    }
  }, [imageURI]);

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleAddStep = () => {
    addStep();
    console.log("Added step");
  };

  const deleteStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleDeleteStep = (index) => {
    deleteStep(index);
    console.log("Deleted step");
  };

  const stepChange = (event, index) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = event.target.value;
    setSteps(updatedSteps);
  };

  const handleStepChange = (event, index) => {
    stepChange(event, index);
    console.log("Step changed");
  };

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const postData = async () => {
    const today = new Date();
    const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const data = {
      title: title,
      subheader: date,
      summary: description,
      steps: steps,
      imageURI: imageURI,
      nGrams: generateNGrams(title + " " + description + " " + steps.join(" ")) // Generating n-grams from title, description, and steps
    };
    
    const response = await fetch("http://localhost:5000/recipe", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };

  // Function to generate n-grams from the given text
  function generateNGrams(text) {
    const nGrams = [];
    const chars = text.replace(/\s+/g, '').split(''); // Split text into characters and remove spaces

    // Generate n-grams for n from 1 to the length of chars
    for (let n = 1; n <= chars.length; n++) {
      for (let i = 0; i <= chars.length - n; i++) {
        nGrams.push(chars.slice(i, i + n).join("")); // Join characters back into a string
      }
    }
    return nGrams;
  }

  const recipeSubmit = (event) => {
    event.preventDefault();

    const storeImage = async (image) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(image.name);
      imageRef.put(image).then(async (snapshot) => {
        const imageURL = await imageRef.getDownloadURL(); // Get the download URL
        setImageURI(imageURL);
      });
    };
    
    storeImage(image);
  };

  const handleCloseChanges = () => {
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
