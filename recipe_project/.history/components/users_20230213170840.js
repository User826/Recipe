import { useState } from "react";
import styles from '../pages/users.module.css'
import {UserButton, AdminButton} from "./websitebuttons.js"
import { useRouter } from 'next/router'





const Post = (props) => {

  const router = useRouter()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        "name": name,
        "password": password,
        "type": props.name
      };
      //http://localhost:5000/
      const response = await fetch("http://localhost:5000/test", {
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
    postData().then((data) => {
      alert(data.message);
      if (data.message == "You can log in!"){
        router.push({
          pathname: '/about',
          query: { test: 'Testing'}}, "/about/what_are_you_looking_at"
        )
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className = {styles.form}>
      <div>
        <label htmlFor="Title">{props.name}</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="post">Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Post;