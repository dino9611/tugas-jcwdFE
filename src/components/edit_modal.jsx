import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditModal extends Component {
    render() {
        let {modalEdit, toggle, todo, indexEdit, onEditInputHandler, dataEdit, saveEditTask} = this.props
        return (
            // /* Modal Edit Task */
            <Modal isOpen={modalEdit} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Task {indexEdit < 0 ? "" : todo[indexEdit].kegiatan}
                </ModalHeader>
                <ModalBody>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="kegiatan"
                        value={dataEdit.kegiatan} 
                        onChange={onEditInputHandler} 
                        placeholder="Nama Task" 
                    />
                    <input 
                        type="date" 
                        className="form-control" 
                        name="tanggal"
                        value={dataEdit.tanggal} 
                        onChange={onEditInputHandler} 
                    />
                    <input 
                        type="time" 
                        className="form-control" 
                        name="jam"
                        value={dataEdit.jam} 
                        onChange={onEditInputHandler} 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        name="tempat"
                        value={dataEdit.tempat} 
                        placeholder="Tempat" 
                        onChange={onEditInputHandler} 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        name="gambar"
                        value={dataEdit.gambar} 
                        placeholder="Link Gambar" 
                        onChange={onEditInputHandler} 
                    />
                    <select 
                        defaultValue={0} 
                        className="form-control" 
                        name="waktuKegiatan" 
                        value={dataEdit.waktuKegiatan}
                        onChange={onEditInputHandler} 
                    >
                        <option value="0" hidden>Pilihan Jam</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="btn btn-primary" onClick={saveEditTask}>Save</Button>{' '}
                    <Button color="btn btn-secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EditModal;