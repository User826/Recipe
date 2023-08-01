import 'bootstrap/dist/css/bootstrap.min.css';
import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RecipeReviewCard from '../components/card';


export default function Search(props) {

    const [searching, setSearching] = useState("")
    const [recipes, setRecipes] = useState([])
    const [grabbedData, setGrabbedData] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSearch()
    }
    
    const handleSearch = () => {
        const getData = async () => {

            const searchingSplit = searching.split(' ');
            const searchingArray = []
            
            for (const s of searchingSplit) {
            searchingArray.push(searching);
            }
        
            const response = await fetch(`http://localhost:5000/searchrecipe?search=${searching}`, {
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
                // body: JSON.stringify({"search":searchingArray, "searching": true})
            });
            return response.json();
            };
            getData().then((data)=>{

                console.log(`getData was run`)
                console.log(data.sendData)
                var r = []
                if (data.sendData){
                    {data.sendData.map((datum) => {

                        r.push({title:datum.title, subheader:datum.subheader, imageURI: datum.imageURI, summary: datum.summary, steps:datum.steps})
                        setRecipes(r)   
                        
                        // setInitialData(true)  
                        
                    })}
                    console.log(r);
                    setGrabbedData(true)
                }
                else{
                    alert(data.message)

                }
        }
        )

    }

    


    if (grabbedData==true){
        console.log("GrabbedData is true!")
        return <div>
        <p>Welcome to Search!</p> <a href="/">Home</a>
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearching(e.target.value)} 
            />
            <Button variant="outline-success" onClick={() => handleSearch()}>Search</Button>
          </Form>
          <div>
          {recipes.map((recipe) => {
            console.log(recipe)
              return (
              <RecipeReviewCard
                key={recipe.title}
                cardTitle={recipe.title}
                cardSubheader={recipe.subheader}
                cardImageURI={recipe.imageURI}
                cardSummary={recipe.summary}
                cardSteps={recipe.steps}
              />
            )})}
            </div>
    </div>

    }
        
    else{
        return <div>
        <p>Welcome to Search!</p> <a href="/">Home</a>
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearching(e.target.value)} 
            />
            <Button variant="outline-success" onClick={() => handleSearch()}>Search</Button>
          </Form>
          
    </div>

    }

}