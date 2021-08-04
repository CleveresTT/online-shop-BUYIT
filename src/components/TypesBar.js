import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { ListGroup } from 'react-bootstrap'


const TypesBar = observer( () => {
    const {device} = useContext(Context)
  return (
    <ListGroup className="mt-3">
        {device.types.map(type=>
            <ListGroup.Item style={{cursor: "pointer"}} 
              id={type.id} active={type.id === device.selectedType.id} 
              onClick={()=>type.id===device.selectedType.id ? device.setSelectedType({}) : device.setSelectedType(type)}
            >
              {type.name}
            </ListGroup.Item>
        )}
    </ListGroup>
  );
})

export default TypesBar;