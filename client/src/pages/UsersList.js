import React, {useEffect, useState} from 'react';
import {fetchUsers, toggleUser} from "../http/usersListAPI";
import {Button, Container, Table} from "react-bootstrap";

const UsersList = () => {

  const [users, setUsers] = useState([]);

  const handleFetchUsers = async () => {
    const users = await fetchUsers();
    setUsers(users);
  }

  const handleToggleUser = async (id) => {
    const answer = await toggleUser(id);
    handleFetchUsers();
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const renderUsersList = (users) => users.map((user) =>
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{(user.role === "RECORDER") && (
        <>
          {user.is_active ? (
            <Button block variant="danger" onClick={() => handleToggleUser(user.id)}>Деактивувати</Button>
          ) : (
            <Button block variant="success" onClick={() => handleToggleUser(user.id)}>Активувати</Button>
          )}
        </>
      )}</td>
    </tr>
  )

  return (
    <Container>
      <Table className="mt-3" striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>ПІБ</th>
          <th>EMAIL</th>
          <th>Роль</th>
          <th>Дія</th>
        </tr>
        </thead>
        <tbody>
        {renderUsersList(users)}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;