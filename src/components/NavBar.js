import React, { useContext } from 'react'
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const NavBar = observer( ()=> {
  const {user} = useContext(Context)
  const history = useHistory()

  const LogOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
        <NavLink style={{color: 'white', textDecoration: 'none', cursor: "pointer", fontFamily:"fantasy", fontSize:"26px"}} to={SHOP_ROUTE}>BUY IT!</NavLink>
        {user.isAuth ?
        <Nav style={{color: 'white', marginLeft: "auto"}}>
            {jwt_decode(localStorage.getItem('token')).role==='ADMIN' ? <Button to={LOGIN_ROUTE} variant="outline-light" onClick={()=>history.push(ADMIN_ROUTE)}>Админ панель</Button> : <></>}
            <Button to={LOGIN_ROUTE} variant="outline-light" onClick={()=>LogOut()} style={{marginLeft: "0.6vw"}}>Выйти</Button>
        </Nav>
        :
        <Nav style={{color: 'white', marginLeft: "auto"}}>
            <Button to={LOGIN_ROUTE} onClick={()=>history.push(LOGIN_ROUTE)} variant={"outline-light"}>Авторизация</Button>
        </Nav>
        }
        </Container>
    </Navbar>
  );
})

export default NavBar;