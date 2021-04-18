import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  RECORDER_ROUTE,
  USERS_LIST_ROUTE,
  LOGS_LIST_ROUTE,
  REGISTER_NEW_USER_ROUTE,
  SEARCH_REQUESTS_ROUTE,
  SEARCH_RECORDS_ROUTE,
  ADD_ISSUER_ROUTE,
  ADD_ESTATE_ROUTE,
  ADD_REQUEST_ROUTE, ADD_RECORD_ROUTE
} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const history = useHistory()

  const logOut = () => {
    user.setUser(null);
    user.setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Реєстр</NavLink>
        {user.isAuth && (user.user.role === "ADMIN") && (
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_REQUESTS_ROUTE)}
              className="ml-2"
            >
              Заяви
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_RECORDS_ROUTE)}
              className="ml-2"
            >
              Відомості
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(REGISTER_NEW_USER_ROUTE)}
              className="ml-2"
            >
              Створити користувача
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGS_LIST_ROUTE)}
              className="ml-2"
            >
              Логи
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(USERS_LIST_ROUTE)}
              className="ml-2"
            >
              Список користувачів
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button>
          </Nav>)
        }
        {user.isAuth && (user.user.role === "RECORDER") && (
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADD_REQUEST_ROUTE)}
              className="ml-2"
            >
              Додати заяву
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADD_RECORD_ROUTE)}
              className="ml-2"
            >
              Додати відомість
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADD_ESTATE_ROUTE)}
              className="ml-2"
            >
              Додати нерухомість
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADD_ISSUER_ROUTE)}
              className="ml-2"
            >
              Додати заявника
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_REQUESTS_ROUTE)}
              className="ml-2"
            >
              Заяви
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_RECORDS_ROUTE)}
              className="ml-2"
            >
              Відомості
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button>
          </Nav>)
        }
        {!user.isAuth && (
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_REQUESTS_ROUTE)}
              className="ml-2"
            >
              Заяви
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(SEARCH_RECORDS_ROUTE)}
              className="ml-2"
            >
              Відомості
            </Button>
            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
          </Nav>
        )
        }
      </Container>
    </Navbar>

  );
});

export default NavBar;