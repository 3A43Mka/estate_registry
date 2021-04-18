import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {fetchLogs} from "../http/logsAPI";

const LogsList = () => {

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleFetchLogs = async () => {
    const logs = await fetchLogs(page);
    setLogs(logs.logs.rows);
    setTotalCount(logs.logs.count);
  }

  const handleNextPage = async () => {
    setPage(page + 1);
  }

  const handlePrevPage = async () => {
    setPage(page - 1);
  }

  useEffect(() => {
    handleFetchLogs();
  }, [page]);

  const renderLogsList = (logs) => logs.map((log) =>
    <tr key={log.id}>
      <td>{log.id}</td>
      <td>{(new Date(log.createdAt)).toLocaleString()}</td>
      <td>{log.type}</td>
      <td>{log.user.fullname}</td>
      <td>{log.reason}</td>
    </tr>
  )

  const renderPages = () => {
    const isFirstPage = page === 1;
    const isLastPage = page === Math.ceil(totalCount / 9);

    if (isFirstPage) {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block disabled>Попередня</Button>
          <div className="m-2"><p>{page}/{Math.ceil(totalCount / 9)}</p></div>
          <Button block onClick={() => handleNextPage()}>Наступна</Button>
        </div>
      )
    } else if (isLastPage) {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block onClick={() => handlePrevPage()}>Попередня</Button>
          <div className="m-2">{page}/{Math.ceil(totalCount / 9)}</div>
          <Button block disabled>Наступна</Button>
        </div>
      )
    } else {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block onClick={() => handlePrevPage()}>Попередня</Button>
          <div className="m-2">{page}/{Math.ceil(totalCount / 9)}</div>
          <Button block onClick={() => handleNextPage()}>Наступна</Button>
        </div>
      )
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mt-3 mb-3 col-5">
          {renderPages()}
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Час</th>
            <th>Тип</th>
            <th>Користувач</th>
            <th>Причина</th>
          </tr>
          </thead>
          <tbody>
          {renderLogsList(logs)}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-center">
        <Col className="mt-3 mb-3 col-5">
          {renderPages()}
        </Col>
      </Row>
    </Container>
  );
};

export default LogsList;