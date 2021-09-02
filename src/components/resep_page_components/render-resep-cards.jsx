import React, { Component } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle
  } from 'reactstrap';

class ResepCards extends Component {
    state = {}

    render() { 
        const {resep, onCardClick} = this.props
        return (
            resep.map((val, index) => {
                return ( 
                    <div key={index} className="col-md-3 my-2">
                        <Card className="recipe-card-height" onClick={onCardClick}>
                            <CardImg top width="100%" src={val.image} alt={`resep-image-${index}`} />
                            <CardBody>
                                <CardTitle tag="h5">{val.title}</CardTitle>
                            </CardBody>
                        </Card>
                    </div>
                 );
            })
        )
    }
}
 
export default ResepCards;