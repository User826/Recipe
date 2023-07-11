import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';

export default function Admin(props) {
    const [isAdmin, setIsAdmin] = useState(null);
    
    console.log("Is admin rendering")


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

    if (isAdmin) {
        return (
            <div>
            <p>Welcome Admin!</p>
            </div>
        );
        } else {
        return (
            <div>
            You're not an admin...
            </div>
        );
    }
}
