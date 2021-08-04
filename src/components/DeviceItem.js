import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import star from "../assets/star.png"
import { DEVICE_ROUTE } from '../utils/const'

const DeviceItem = ({device}) => {
    const history = useHistory()
  return (
    <Col md={3} className="mt-3" onClick={()=> history.push(DEVICE_ROUTE+"/"+device.id)}>
        <Card style={{cursor: "pointer", width: "200px"}} border={"light"}>
            <Image src={process.env.REACT_APP_API_URL + device.img} style={{height: "200px", width: "200px"}}></Image>
            <div className="d-flex justify-content-between align-items-center mt-2 h6">
                <div>{device.name}</div>
                <div className="d-flex align-items-center text-black-50">
                    <div style={{marginRight: "6px"}}>{device.rating}</div>
                    <Image styles={{width: "20px", height: "20px"}} src={star}></Image>
                </div>
            </div>
            <div>{device.price} Руб.</div>
        </Card>
    </Col>
  );
}

export default DeviceItem;