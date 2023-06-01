import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"
import styles from '../pages/useradmin.module.css'


export default function Useradmin() {
    const [isLoggedIn, setIsLoggedIn] = useState("");

    function handleLoginClick() {
        //this.setState({isLoggedIn: true});
        setIsLoggedIn("user")
      };
    
    function handleLogoutClick() {
        //this.setState({isLoggedIn: false});
        setIsLoggedIn("admin")
      }
    
    
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
        <UserButton onClick ={handleLoginClick}/>        
        <AdminButton onClick = {handleLogoutClick}/>
        
    </div>
    }
    else if (isLoggedInVariable == "user"){
        return <div>
                    <p>You are a user!</p>
                    <p>Or are you an admin?<AdminButton className = {styles.admin} onClick = {handleLogoutClick}> </AdminButton></p>
                </div>
            
                // <UserButton onClick = {handleLoginCLick}> </UserButton>
        
    }
    else if (isLoggedInVariable == "admin"){
        return  <div>
                    <p>You are an admin!</p>
                    <p>Or are you a user? <UserButton className = {styles.user} onClick = {handleLoginClick}> </UserButton></p>
                </div> 
        
    }
    
    // return <div>
    //     {/* <Post></Post> */}
    //     <UserButton onClick ={handleLoginClick}/>        
    //     <AdminButton onClick = {handleLoginClick}/>
        
    // </div>
  }