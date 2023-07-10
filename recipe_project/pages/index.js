import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"
import styles from '../pages/index.module.css'
import {PopupTrigger,Backdrop, Popup} from "../components/popup";
import RecipeReviewCard from "../components/card";
import BasicNavBar from "../components/navbar";
import { set } from "mongoose";




export default function Useradmin() {
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [grabbedData, setGrabbedData] = useState(false);
    const [noRecipes, setNoRecipes] = useState(false)
    const [initialData, setInitialData] = useState(false);

    function handleLoginClick() {
        
        setIsLoggedIn("user")
      };
    
    function handleLogoutClick() {
        
        setIsLoggedIn("admin")
      }
    const handleParentClick = () => {
      setShowPopup(false);
    };
    
    
    const isLoggedInVariable = isLoggedIn;
    let button;

    
    if (initialData==false){
    const getData = async () => {
      const data = {
        "type": "Username"
      };
     
      const response = await fetch("http://localhost:5000/recipe", {
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
        var r = [];
        var testItems = (data.sendData).map( (datum) =>{
            
            r.push({title:datum.title, subheader:datum.subheader, imageURI: datum.imageURI, summary: datum.summary, steps:datum.steps})
            })
        
        setRecipes(r)   
        console.log(r);
        setGrabbedData(true)
        setInitialData(true)          
      }
      else{
        setNoRecipes(true)

      }                           
    });
  }
    if (grabbedData == true) {
        return <div className={styles.bg}style={{overflow:'hidden'}}>
          <div className={styles.parent}>
            <div>
            <div>
              <BasicNavBar/>
            </div>
            <div className={styles.buttons}>
              <UserButton onClick ={handleLoginClick} />        
              <AdminButton onClick = {handleLogoutClick}/>            
            </div>
            <article className={styles.mainArticle}>
              <h1>Welcome to Momo's World!</h1>
              <p>This is where you can find and upload recipes!</p>
            </article>
          </div>
          <div className={styles.recipecardscontainer}>
            {recipes.map((recipe) => {
              return (
              <RecipeReviewCard
                key={recipe.title}
                cardTitle={recipe.title}
                cardSubheader={recipe.subheader}
                cardImageURI={recipe.imageURI}
                cardSummary={recipe.summary}
                cardSteps={recipe.steps}
              />
            )})}
          </div>
            </div> 
            
          <div>
            <p>Hello</p>
          </div>
        </div>
    }
    else if (noRecipes == true){
      return <div className={styles.bg}style={{overflow:'hidden'}}>
          <div className={styles.parent}>
            <div>
            <div>
              <BasicNavBar/>
            </div>
            <div className={styles.buttons}>
              <UserButton onClick ={handleLoginClick} />        
              <AdminButton onClick = {handleLogoutClick}/>            
            </div>
            <article className={styles.mainArticle}>
              <h1>Welcome to Momo's World!</h1>
              <p>This is where you can find and upload recipes!</p>
            </article>
          </div>
          {/* <div className={styles.recipecardscontainer}>
            {recipes.map((recipe) => {
              return (
              <RecipeReviewCard
                key={recipe.title}
                cardTitle={recipe.title}
                cardSubheader={recipe.subheader}
                cardImageURI={recipe.imageURI}
                cardSummary={recipe.summary}
                cardSteps={recipe.steps}
              />
            )})}
          </div> */}
            </div> 
            
          <div>
            <p>Hello</p>
          </div>
        </div>

    }
    else if (isLoggedInVariable == "user"){
        return <div onClick = {handleParentClick}>
                    <p>You are a user!</p>
                    <p>Or are you an admin? <AdminButton onClick = {handleLogoutClick}> </AdminButton></p>
                    <Post name="Username"></Post>
                    <PopupTrigger></PopupTrigger>
                </div>
        
    }
    else if (isLoggedInVariable == "admin"){
        return  <div>
                    <p>You are an admin!</p>
                    <p>Or are you a user? <UserButton onClick = {handleLoginClick}> </UserButton></p>
                    <Post name="Admin Username"></Post>
                </div> 
        
    }
  }