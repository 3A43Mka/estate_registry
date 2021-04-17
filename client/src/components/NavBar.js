import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, RECORDER_ROUTE, USERS_LIST_ROUTE, LOGS_LIST_ROUTE} from "../utils/consts";
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
        <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Реєстр</NavLink>
        {user.isAuth && (user.user.role === "ADMIN") && (
          <Nav className="ml-auto" style={{color: 'white'}}>
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
              onClick={() => history.push(ADMIN_ROUTE)}
              className="ml-2"
            >
              Админ панель
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
              onClick={() => history.push(RECORDER_ROUTE)}
            >
              Панель регистратора
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
        { !user.isAuth && (
          <Nav className="ml-auto" style={{color: 'white'}}>
            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        )

        }

      </Container>
    </Navbar>

  );
});

export default NavBar;