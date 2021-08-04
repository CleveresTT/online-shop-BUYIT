import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { setRating } from '../../http/deviceAPI';

const SetRating = ({show, onHide}) => {
  const [addValue, setAddValue] = useState('')
  const {id} = useParams()

  const setMyRating = () => {
    setRating({userId: jwt_decode(localStorage.getItem('token')).id, deviceId: id, rate: addValue})
      .then(data => {
        if (data==="Оценка уже была поставленна")
          alert(data)
        window.location.reload();
      }
    )
  }

  const changeInput = (value) => {
    if(value>=0 && value<=5)
        Number(setAddValue(value))
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Оцените товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
            <Form.Control style={{width: "100px", marginLeft: "auto", marginRight: "auto", textAlign: "center"}} type="number" value={addValue} onChange={e => changeInput(e.target.value)}></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={setMyRating}>Оценить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SetRating;