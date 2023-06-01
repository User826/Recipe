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
                    <p>Or are you an admin?</p><AdminButton onClick = {handleLogoutClick}> </AdminButton>
                </div>
            
                // <UserButton onClick = {handleLoginCLick}> </UserButton>
        
    }
    else if (isLoggedInVariable == false){
        return  <div>
                    <p>You are an admin!</p>
                    <p>Or are you a user? <UserButton onClick = {handleLoginClick}> </UserButton></p>
                </div> 
        
    }
    
    // return <div>
    //     {/* <Post></Post> */}
    //     <UserButton onClick ={handleLoginClick}/>        
    //     <AdminButton onClick = {handleLoginClick}/>
        
    // </div>
  }