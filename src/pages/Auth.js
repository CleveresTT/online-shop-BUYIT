import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react'
import {Container, Card, Form, Button, Row} from 'react-bootstrap';
import { NavLink, useLocation, useHistory} from 'react-router-dom';
import { Context } from '../index';
import { registration, login } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const';

const Auth = observer( () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [emailLabel, setEmailLabel] = useState('')
    const [passwordLabel, setPasswordLabel] = useState('')
    const [passwordAgainLabel, setPasswordAgainLabel] = useState('')
    const [error, setError] = useState('')


    const signIn = async () => {
        try{
            let data
            if (isLogin){
                if(!email)
                    setEmailLabel("Введите email")
                if(!password)
                    setPasswordLabel("Введите пароль")
                if(email && password)
                    data = await login(email, password)
                else return
            }
            else{
                if(!email)
                    setEmailLabel("Введите email")
                if(!password)
                    setPasswordLabel("Введите пароль")
                if(!passwordAgain)
                    setPasswordAgainLabel("Повторите пароль")
                if(password && passwordAgain && password !== passwordAgain)
                    setError("Введенные пароли не совпадают")
                if(email && password && passwordAgain && password === passwordAgain)
                    data = await registration(email, password)
                else return
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        }catch(e){
            alert(e.response.data.message)
        }
    }

    useEffect(()=>{
        setEmailLabel("")
    }, [email])

    useEffect(()=>{
        setPasswordLabel("")
        setError("")
    }, [password])

    useEffect(()=>{
        setPasswordAgainLabel("")
        setError("")
    }, [passwordAgain])

    return (
        <Container style={{height: window.innerHeight-54, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card style={{width: "600px", padding: "5vw"}}>
                <h1 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                <h5 className="m-auto" style={{color: "red"}}>{error}</h5>
                <Form style={{display: "flex", flexDirection: "column"}}>
                    <label style={{color:"red"}}><Form.Control placeholder="Введите e-mail" style={{marginTop: "2vh"}} value={email} onChange={e => setEmail(e.target.value)} type="email"></Form.Control>{emailLabel}</label>
                    <label style={{color:"red"}}><Form.Control placeholder="Введите пароль" style={{marginTop: "2vh"}} value={password} onChange={e => setPassword(e.target.value)} type="password"></Form.Control>{passwordLabel}</label>
                    {!isLogin ?
                        <label style={{color:"red"}}><Form.Control placeholder="Повторите введенный пароль пароль" style={{marginTop: "2vh"}} value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} type="password"></Form.Control>{passwordAgainLabel}</label>
                        :
                        <label></label>
                    }
                    <Row style={{display: "flex", justifyContent: "space-between", marginTop: "5vh", paddingLeft: "3vw", paddingRight: "3vw"}}>
                        {isLogin ?        
                        <div style={{display: "flex", justifyContent: "center", marginBottom: "2vh", whiteSpace: "pre"}}>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                        :
                        <div style={{display: "flex", justifyContent: "center", marginBottom: "2vh", whiteSpace: "pre"}}>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                        }           
                        <Button variant={"outline-success"} onClick={signIn}>
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;