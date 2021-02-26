import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Repo from "./Repo";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
let isSubmitted = false;

function App() {

    //state serait object avec submitted...

    const[user, setUser] = useState(''); 
    //const [repos, setRepos] = useState([]);

    const [state, setState] = useState({repos: [], isSubmitted: false})

    let message = null;    

  const myFetch = async () => {
    //isSubmitted = true; 
    console.log('submitted in fetch: ', isSubmitted);

    try {
        const res = await fetch(`https://api.github.com/users/${user}/repos`);
        const data = await res.json();
        console.log(data);
        //setRepos(data);
        setState({repos: data, isSubmitted: true})
    } catch (error) {
      console.log(error);
    } finally {
      console.log('dans le finally');
    }
    
  }

  let results;
  let jumbotronResults;
  
  console.log('repos lenth: ', state.repos.length);

  if (state.repos.length != null){
        results = state.repos.map(repo => (
       <Repo key={repo.id} repo={repo} />
        ))
        jumbotronResults = (<Jumbotron> {results} </Jumbotron>)

    }
    else {
        results = "Bad username";
        jumbotronResults = (<Jumbotron style={{color: 'red', backgroundColor: 'pink'}}> {results} </Jumbotron>)
    }

  //const jumbotronResults = (<Jumbotron> {results} </Jumbotron>)
  
  console.log('stuff before return');
  return (
    <div className="App">
      <header className="App-header">
          <Form>
              <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" onChange={(e) => setUser(e.target.value)} value={user} name="user" placeholder="Enter github username"/>
              </Form.Group>
          </Form>
         
          <Button variant="primary" onClick={myFetch} className="mt-3 mb-3">
            Submit
          </Button>
      </header>
      <main className="App-main">
          
            <ListGroup>
                { state.isSubmitted ? jumbotronResults : null    }
            </ListGroup>
          
                
      </main>
    </div>
  );
}

export default App;
