import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import RecipeSteps from './recipesteps';
import { app } from './firebase'; //Need this in order to use firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


function RecipeModal(props) {

  const [show, setShow] = useState(false);

  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageURI, setImageURI] = useState("Empty");

  useEffect(() => {
    if (imageURI !== "Empty") {
      console.log("I'm running postData");
      postData().then(()=>{
        window.location.reload(true);
      });
    }
  }, [imageURI]);
  
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

  const postData = async () => {
    var today = new Date();
    var date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const data = {
      "title": title,
      "subheader": date,
      "summary": description,
      "steps": steps,
      "imageURI":imageURI
    };
    //http://localhost:5000/
    const response = await fetch("http://localhost:5000/recipe", {
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

  const recipeSubmit = (event) => {
    
    event.preventDefault()

    const storeImage = async (image) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(image.name);
      imageRef.put(image).then(async (snapshot) => {
        const imageURL = imageRef.toString()          
        setImageURI(imageURL)                             
      })
    };
    storeImage(image)    
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