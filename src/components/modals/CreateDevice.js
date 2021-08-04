import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = observer( ({show, onHide}) => {
  const {device} = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  const addInfo = () => {
    setInfo([...info, {title:'', description:'', id: Date.now()}])
  }

  const removeInfo = (num) => {
    setInfo(info.filter(i => i.id !== num))
  }
  const changeInfo = (key, value, id) => {
    setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => {onHide()})
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrands().then(data=>device.setBrands(data))
  }, [])

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.types.map( type =>
                    <Dropdown.Item key={type.id} onClick={()=>device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        <Dropdown  className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map( brand =>
                    <Dropdown.Item key={brand.id} onClick={()=>device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control placeholder="Введите название устройства" className="mt-3" value={name} onChange={e => setName(e.target.value)}></Form.Control>
        <Form.Control placeholder="Введите стоимость устройства" className="mt-3" type="number" value={price} onChange={e => Number(setPrice(e.target.value))}></Form.Control>
        <Form.Control className="mt-3" type="file" onChange={selectFile}></Form.Control>
        <hr></hr>
        <Button
            variant="outline-dark"
            onClick={addInfo}
        >
            Добавить новое свойство
        </Button>
        {
            info.map(i=>
                <Row className="mt-3" key={i.id}>
                    <Col md={4}>
                        <Form.Control placeholder="Введите название свойства" value={i.title} onChange={e => changeInfo('title', e.target.value, i.id)}></Form.Control>
                    </Col>
                    <Col md={4}>
                        <Form.Control placeholder="Введите описание свойства"  value={i.description} onChange={e => changeInfo('description', e.target.value, i.id)}></Form.Control>
                    </Col>
                    <Col md={4}>
                        <Button variant="outline-danger" onClick={() => removeInfo(i.id)}>Удалить</Button>
                    </Col>
                </Row>    
            )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice;