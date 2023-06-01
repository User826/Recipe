import { useState } from "react";
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"


export default function Useradmin() {
    
    return <div>
        {/* <Post></Post> */}
        <UserButton/>        
        <AdminButton/>
        
    </div>
  }