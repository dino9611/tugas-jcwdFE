import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class IngredientsModal extends Component {
    render() {
        let {modal, toggle, ingredientSelected, recipeNameSelected} = this.props

        if (ingredientSelected.length) {
            return (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Ingredients of {recipeNameSelected}</ModalHeader>
                    <ModalBody>
                        {
                            ingredientSelected.map((val, index) => {
                                return (
                                    <div key={index}>
                                        {index + 1}. {val.name} {val.amount.metric.value} {val.amount.metric.unit}
                                    </div>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            )
        } else {
            return null
        }
    }
}

export default IngredientsModal;