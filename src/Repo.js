import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroupItem from "react-bootstrap/ListGroupItem"

const Repo = ({repo}) => {
    //console.log(repo);
    return(

        <>  
            <ListGroupItem>
                
             <Row>

                <Col xs="6">{repo.name}</Col>
                <Col xs="6"><Button href={repo.html_url}>Repo</Button></Col>
                
            </Row>    
            </ListGroupItem>
        </>
    )
}

export default Repo;
