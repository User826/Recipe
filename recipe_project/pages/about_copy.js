// No React import needed up here! 😳
import { useRouter } from 'next/router'
import { useState } from "react";

export default function About(props) {

  const [grabbedData, setGrabbedData] = useState(false);
  const [storeTest, setStoreTest] = useState();

  // var storeTest

  const router = useRouter();   

  const numbers = [1,2,3,4,5]

  const listItems = numbers && numbers.map( (number) =>
      <li key={number.toString}>{number}</li>); 

  // console.log(listItems)

  const postData = async () => {
    const data = {
      "type": "Username"
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
    // console.log(typeof data.sendData)
    // console.log("Before Array.isArray")
    // console.log(Array.isArray(data.sendData))
    // console.log(data.sendData)
    // var keys = Object.keys(data.sendData);
    // console.log(Array.isArray(keys))
    // console.log(keys[0])
    // console.log(typeof keys[0])
    var testItems = (data.sendData).map( (datum) =>
        <li key={datum._id}> Hello!{datum.username} {datum.password}</li>)
    // console.log("Before console.log(testItems")
    // console.log(testItems)
    setStoreTest(testItems)
    // console.log(storeTest)

    setGrabbedData(true)

    return storeTest

    // return <div>
    //     About
    //     <p>Will this work? {router.query.test}</p>
    //     <ul>{listItems}</ul>
    //     <ul>{storeTest}</ul>
    //     </div>
  
  });



    // const router = useRouter();   

    // const numbers = [1,2,3,4,5]

    // const listItems = numbers && numbers.map( (number) =>
    //     <li key={number.toString}>{number}</li>); 

    if(grabbedData == true){
        // console.log("This is storeTest")
        // console.log(storeTest)
        // console.log("This is grabbed data")
        // console.log(grabbedData)
        return <div>
          About
          <p>Will this work? {router.query.test}</p>
          <ul>{listItems}</ul>
          <p>Grabbed Data is true!</p>
          <ul>{storeTest}</ul>
          <p>Above should have something....</p>
          </div>
      

    }
    else{
      return <div>
        About
        <p>Will this work? {router.query.test}</p>
        <ul>{listItems}</ul>
        <ul>{storeTest}</ul>
        </div>

    }

    
  }