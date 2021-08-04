import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';

function Admin() {
  const [brandModalVisible, setBrandModalVisible] = useState(false)
  const [typeModalVisible, setTypeModalVisible] = useState(false)
  const [deviceModalVisible, setDeviceModalVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-dark" className="mt-4 p-2" onClick={()=>setTypeModalVisible(true)}>Добавить тип</Button>
      <Button variant="outline-dark" className="mt-4 p-2" onClick={()=>setBrandModalVisible(true)}>Добавить бренд</Button>
      <Button variant="outline-dark" className="mt-4 p-2" onClick={()=>setDeviceModalVisible(true)}>Добавить устройство</Button>
      <CreateType show={typeModalVisible} onHide={()=>setTypeModalVisible(false)}></CreateType>
      <CreateBrand show={brandModalVisible} onHide={()=>setBrandModalVisible(false)}></CreateBrand>
      <CreateDevice show={deviceModalVisible} onHide={()=>setDeviceModalVisible(false)}></CreateDevice>
    </Container>
  );
}

export default Admin;