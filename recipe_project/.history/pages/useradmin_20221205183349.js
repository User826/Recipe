import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"


export default function Useradmin() {
    const [isLoggedIn, setIsLoggedIn] = useState("");

    function handleLoginClick() {
        //this.setState({isLoggedIn: true});
        setIsLoggedIn(true)
      };
    
    function handleLogoutClick() {
        //this.setState({isLoggedIn: false});
        setIsLoggedIn(false)
      }
    
    
    const isLoggedInVariable = isLoggedIn;
    let button;

    // if (isLoggedInVariable) {
    //     button = <LogoutButton onClick={handleLogoutClick} />;
    // } else {
    //     button = <LoginButton onClick={handleLoginClick} />;
    // }

    if (isLoggedInVariable == ""){
        return <div>
        {/* <Post></Post> */}
        <UserButton onClick ={handleLoginClick}/>        
        <AdminButton onClick = {handleLoginClick}/>
        
    </div>
    }
    else if (isLoggedInVariable == true){
        return <div>
                    <p>You are a user!</p>
                    <UserButton onClick = {handleLoginCLick}> </UserButton>
                </div>
            
                // <UserButton onClick = {handleLoginCLick}> </UserButton>
        
    }
    else if (isLoggedInVariable == false){
        return <p>You are an admin!</p>
    }
    
    // return <div>
    //     {/* <Post></Post> */}
    //     <UserButton onClick ={handleLoginClick}/>        
    //     <AdminButton onClick = {handleLoginClick}/>
        
    // </div>
  }