import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class HomeModal extends Component {
    render() {
        let {modalOpen, toggle, dataAdd, saveNewTask, onAddInputHandler} = this.props
        return (
            // /* Modal Add Task */
            <Modal isOpen={modalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                <ModalBody>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="kegiatan"
                        value={dataAdd.kegiatan} 
                        onChange={onAddInputHandler} 
                        placeholder="Nama Task" 
                    />
                    <input 
                        type="date" 
                        className="form-control" 
                        name="tanggal"
                        value={dataAdd.tanggal} 
                        onChange={onAddInputHandler} 
                    />
                    <input 
                        type="time" 
                        className="form-control" 
                        name="jam"
                        value={dataAdd.jam} 
                        onChange={onAddInputHandler} 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        name="tempat"
                        value={dataAdd.tempat} 
                        placeholder="Tempat" 
                        onChange={onAddInputHandler} 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        name="gambar"
                        value={dataAdd.gambar} 
                        placeholder="Link Gambar" 
                        onChange={onAddInputHandler} 
                    />
                    <select 
                        defaultValue={0} 
                        className="form-control" 
                        name="waktuKegiatan" 
                        value={dataAdd.waktuKegiatan}
                        onChange={onAddInputHandler} 
                    >
                        <option value="0" hidden>Pilihan Jam</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="btn btn-primary" onClick={saveNewTask}>Save</Button>{' '}
                    <Button color="btn btn-secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default HomeModal;