import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"
import styles from '../pages/index.module.css'
import {PopupTrigger,Backdrop, Popup} from "../components/popup";


export default function Useradmin() {
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    function handleLoginClick() {
        //this.setState({isLoggedIn: true});
        setIsLoggedIn("user")
      };
    
    function handleLogoutClick() {
        //this.setState({isLoggedIn: false});
        setIsLoggedIn("admin")
      }
    const handleParentClick = () => {
      setShowPopup(false);
    };
    
    
    const isLoggedInVariable = isLoggedIn;
    let button;

    // if (isLoggedInVariable) {
    //     button = <LogoutButton onClick={handleLogoutClick} />;
    // } else {
    //     button = <LoginButton onClick={handleLoginClick} />;
    // }

    console.log(isLoggedInVariable)

    if (isLoggedInVariable == ""){
        return <div>
        {/* <Post></Post> */}
        <UserButton onClick ={handleLoginClick} style="text-align: center;"/>        
        <AdminButton onClick = {handleLogoutClick} style="text-align: center;"/>
        
    </div>
    }
    else if (isLoggedInVariable == "user"){
        return <div onClick = {handleParentClick}>
                    <p>You are a user!</p>
                    <p>Or are you an admin? <AdminButton onClick = {handleLogoutClick}> </AdminButton></p>
                    <Post name="Username"></Post>
                    <PopupTrigger></PopupTrigger>
                </div>
            
                // <UserButton onClick = {handleLoginCLick}> </UserButton>
        
    }
    else if (isLoggedInVariable == "admin"){
        return  <div>
                    <p>You are an admin!</p>
                    <p>Or are you a user? <UserButton onClick = {handleLoginClick}> </UserButton></p>
                    <Post name="Admin Username"></Post>
                </div> 
        
    }
    
    // return <div>
    //     {/* <Post></Post> */}
    //     <UserButton onClick ={handleLoginClick}/>        
    //     <AdminButton onClick = {handleLoginClick}/>
        
    // </div>
  }