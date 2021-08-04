import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';

const CreateType = ({show, onHide}) => {
  const [addValue, setAddValue] = useState('')

  const addType = () => {
    createType({name: addValue})
      .then(data => {
        setAddValue('')
        onHide()}
    )
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
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control placeholder="Введите название типа" value={addValue} onChange={e => setAddValue(e.target.value)}></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>Добавить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType;