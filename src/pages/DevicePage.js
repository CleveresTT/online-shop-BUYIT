import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row, Card } from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom'
import { fetchOneDevice, getRating } from '../http/deviceAPI';
import { SHOP_ROUTE } from '../utils/const';
import SetRating from '../components/modals/SetRating';
import './style.css';
import jwt_decode from 'jwt-decode'

function DevicePage() {
  const [device, setDevice] = useState({info:[]})
  const [rate, setRate] = useState('не выставлена')
  const [modalVisible, setModalVisible] = useState(false)
  const {id} = useParams()
  const history = useHistory()

  useEffect(()=>{
    fetchOneDevice(id).then(data => setDevice(data))
    getRating(jwt_decode(localStorage.getItem('token')).id, id).then(data => {
      if(data)
        setRate(data.rate)})
  }, [])


  return (
    <Container className="mt-5">
      <h1 className="d-flex justify-content-center mb-5" >{device.name}</h1>
      <Row>
        <Col md={4} className={"d-flex flex-column align-items-center"}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}></Image>
        </Col>
        <Col md={4}>
            <Row className={"d-flex flex-column align-items-center"}>
              <div className="d-flex justify-content-center align-items-center star" onClick={()=>setModalVisible(true)}>
                {device.rating}
              </div>
            </Row>
        </Col>
        <Col md={4}>
          <Card className="d-flex justify-content-around align-items-center"
            style={{width: "300px", height: "300px", fontSize:"32px", border:"5px solid lightgray"}}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Container className="mt-3 mb-3 d-flex justify-content-center">Ваша оценка: {rate}</Container>
      <h3 className="mt-5">Характеристики:</h3>
      <Row className="d-flex flex-column mt-3">
        {device.info.map( (info, index) =>
          <Row id={info.id}
            style={{background: index%2===0 ? "lightgray" : "transparent", padding: "10px"}}
          >
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
      <Button className="mt-5" variant="dark" onClick={()=>history.push(SHOP_ROUTE)}>Назад</Button>
      <SetRating show={modalVisible} onHide={()=>setModalVisible(false)}></SetRating>
    </Container>
  );
}

export default DevicePage;