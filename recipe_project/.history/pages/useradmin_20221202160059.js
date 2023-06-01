import { useState } from "react";
// import styles from './users.module.css'
import {UserButton, AdminButton} from "../components/websitebuttons"
import Post from "../components/users"


export default function Useradmin() {
    Post()
    return <div>
        UserButton = <UserButton/>;
        AdminButton = <AdminButton/>
        
    </div>
  }