import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteModal extends Component {
    render() {
        let {modalDel, indexDel, toggle, todo, confirmDelTask} = this.props
        return (
            // /* Modal Delete Task */
            <Modal isOpen={modalDel} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete Task</ModalHeader>
                <ModalBody>
                    Yakin hapus {indexDel < 0 ? "" : todo[indexDel].kegiatan} ?
                </ModalBody>
                <ModalFooter>
                    <Button color="btn btn-primary" onClick={confirmDelTask}>Yes</Button>{' '}
                    <Button color="btn btn-secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default DeleteModal;