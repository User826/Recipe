import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';


export default function Admin(props) {
    const [isAdmin, setIsAdmin] = useState(null);
    const [grabbedData, setGrabbedData] = useState(false)
    const [initialData, setInitialData] = useState(false)
    const [awaitingArray, setAwaitingArray] = useState([])

    const rejectAwaiting = (index) => {

        const rejectAwaitingData = async () => {
        
            const response = await fetch(`http://localhost:5000/user`, {
              method: 'PUT', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'include', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify({"username":awaitingArray[index].username, "action": "reject"})
            });
            return response.json();
          };
          rejectAwaitingData().then(()=>{
                       
            const updatedAwaiting = [...awaitingArray];
            updatedAwaiting.splice(index, 1);
            setAwaitingArray(updatedAwaiting); 
        })



        
    
      }
    
    //   const handleDeleteStep = (index) => {
    //     deleteStep(index)
    //     console.log("Deleted step")
    //   };
    
    //   const awaitingChange = (event, index) => {
    //     const updatedSteps = [...steps];
    //     updatedSteps[index] = event.target.value;
    //     setSteps(updatedSteps);
    //   }
    

    if (initialData == false){

    const getAwaitingData = async () => {
        
        const response = await fetch(`http://localhost:5000/user?awaiting=yes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        console.log("before awaiting response")
        return response.json();
      };
      getAwaitingData().then((data)=>{
        console.log(`I'm in get awaiting`)
        console.log(data.awaiting)

        
        console.log(`I'm in data awaiting`)
        var r = [];
        var awaitingUsers = (data.awaiting).map( (datum) =>{
            
            r.push({username:datum.username})
            })
        
        setAwaitingArray(r)   
        console.log(r);
        setGrabbedData(true)
        setInitialData(true)   

        



      })}

    


    const getAdminData = async () => {
        
        const response = await fetch(`http://localhost:5000/admin`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        console.log("before response.json")
        return response.json();
      };

      useEffect( () =>{
        console.log("Before getAdminData")
        getAdminData().then((data) =>{
            console.log(`This is data.admin ${data.admin}`)
            setIsAdmin(data.admin);

        });
      }, []);
        
    // getAdminData().then((data) =>{
    // console.log(`This is data.admin ${data.wow}`)
    // setIsAdmin(data.wow);
    // console.log(isAdmin)

    // if (isAdmin) {
    //     return (
    //         <div>
    //         <p>Welcome Admin!</p>
    //         </div>
    //     );
    //     } else {
    //     return (
    //         <div>
    //         You're not an admin...
    //         </div>
    //     );
    // }

    // });

    if (isAdmin && initialData) {
        if (grabbedData){
            return (
                <div>
                <p>Welcome Admin!</p>
                {awaitingArray.map((individual, index) => {
                    return (
                    <div>
                        <p>{individual.username}</p>
                        <Button onClick={()=>{rejectAwaiting(index)}}> Reject </Button>
                    </div>
                    )})}
                </div>
            );
        } 
        else {
            return (
                <div>
                    <p>Welcome Admin! Currently no users awaiting!</p>
                </div>
            )

        }}
    else {
        return (
            <div>
            You're not an admin...
            </div>
        );
    }
}
