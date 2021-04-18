import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {getRequest} from "../http/requestsAPI";

const RequestPage = () => {

  const {id} = useParams()
  const [request, setRequest] = useState({});

  useEffect(() => {
    getRequest(id).then((request) => setRequest(request));
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          {JSON.stringify(request)}
        </Col>
      </Row>
    </Container>
  );
};

export default RequestPage;