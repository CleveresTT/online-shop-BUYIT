import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Card, Row } from 'react-bootstrap'


const BrandBar = observer( () => {
    const {device} = useContext(Context)
  return (
    <Row className="d-flex flex-row m-3">
        {device.brands.map(brand=>
        <Card 
            style={{cursor: "pointer", width: "auto"}} 
            bg={brand.id===device.selectedBrand.id ? "primary" : ''} 
            text={brand.id===device.selectedBrand.id ? "light" : ''}
            key={brand.id} className="p-3" 
            onClick={()=>brand.id===device.selectedBrand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand)}>
            {brand.name}
        </Card>)}
    </Row>
  );
})

export default BrandBar;