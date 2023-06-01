import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"


export default function Useradmin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    if (isLoggedInVariable) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }

    
    return <div>
        {/* <Post></Post> */}
        <UserButton/>        
        <AdminButton/>
        
    </div>
  }