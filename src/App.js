import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BiTime, BiTimer } from "react-icons/bi"
import { MdPlace } from "react-icons/md"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import "./App.css";

class App extends Component {
  state = {
    todo: [
      {
        kegiatan: "Belajar",
        tanggal: "2021-08-05",
        jam: "19:00",
        durasi: "2",
        tempat: "Rumah",
        gambar: "https://static.republika.co.id/uploads/images/inpicture_slide/belajar-ilustrasi-_160204092221-401.jpg"
      },
      {
        kegiatan: "Olahraga",
        tanggal: "2021-09-03",
        jam: "07:00",
        durasi: "3",
        tempat: "Outdoor",
        gambar: "https://fitnessindonesia.com/wp-content/uploads/2017/11/GYM-BEKASI.jpg"
      },
    ],
    modalOpen: false,
    modalEdit: false,
    indexEdit: -1,
    editData: {
      kegiatan: "",
      tanggal: "",
      jam: "",
      durasi: "0",
      tempat: "",
      gambar: ""
    },
    modalDelete: false,
    indexDelete: -1,
    addData: {
      kegiatan: "",
      tanggal: "",
      jam: "",
      durasi: "0",
      tempat: "",
      gambar: ""
    }
  }

  // Buka Modal
  toggleModalHandler = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  // Buka Edit To Do Modal
  // toggleEditHandler = (index) => {
  //   let editDataBaru = this.state.todo[index];

  //   this.setState({
  //     indexEdit: index, modalEdit: !this.state.modalEdit, editData: editDataBaru
  //   })
  // }
  toggleEditHandler = (index) => {

    this.setState({
      indexEdit: index, modalEdit: !this.state.modalEdit
    })
  }

  onEditInputHandler = (e) => {
    let editDataMute = this.state.editData
    editDataMute = { ...editDataMute, [e.target.name]: e.target.value }
    this.setState({ editData: editDataMute })
  }

  editSaveClick = () => {
    let { kegiatan, tanggal, jam, durasi, tempat, gambar } = this.state.editData

    if (!kegiatan || !tanggal || !jam || !durasi || !tempat || !gambar) {
      alert('Isi semuanya!')
      return
    }

    let { indexEdit, todo, editData } = this.state;
    let todoBaru = todo
    todoBaru.splice(indexEdit, 1, editData)

    let defaultEditData = {
      kegiatan: "",
      tanggal: "",
      jam: "",
      durasi: "0",
      tempat: "",
      gambar: ""
    }

    this.setState({ todo: todoBaru, editData: defaultEditData, modalEdit: false })
  }

  // Buka Delete To Do Modal
  toggleDeleteHandler = (index) => {
    this.setState({ indexDelete: index, modalDelete: !this.state.modalDelete })
  }

  // Delete To Do
  onYesDelete = () => {
    let { todo, indexDelete } = this.state
    let todoBaru = todo

    todoBaru.splice(indexDelete, 1)

    this.setState({
      todo: todoBaru,
      indexDelete: -1,
      modalDelete: !this.state.modalDelete,
    })
  }

  // Input To Do
  onAddInputHandler = (e) => {
    let addDataMute = this.state.addData
    addDataMute = { ...addDataMute, [e.target.name]: e.target.value }
    this.setState({ addData: addDataMute })
  }

  // Push To Do
  addSaveClick = () => {
    console.log(this.state.addData)
    let { kegiatan, tanggal, jam, durasi, tempat, gambar } = this.state.addData
    if (!kegiatan || !tanggal || !jam || !durasi || !tempat || !gambar) {
      alert('Isi semuanya!')
      return
    }
    let todoBaru = this.state.todo
    todoBaru.push(this.state.addData)

    let defaultAddData = {
      kegiatan: "",
      tanggal: "",
      jam: "",
      durasi: "0",
      tempat: "",
      gambar: ""
    }

    this.setState({ todo: todoBaru, addData: defaultAddData, modalOpen: false })
  }

  // Ubah Tanggal Ke Format ID
  renderTanggal = (tanggal) => {
    const event = new Date(tanggal);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString('id-ID', options)
  }

  // Render Modal Edit
  renderModalEdit = () => {
    if (this.state.indexEdit < 0) {
      return;
    }

    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEditHandler}>
        <ModalHeader toggle={this.toggleEditHandler}>Edit To Do</ModalHeader>
        <ModalBody>
          <input name="kegiatan" type="text" onChange={this.onEditInputHandler} value={this.state.editData.kegiatan} className="form-control my-1" placeholder="Kegiatan"></input>
          <input name="tanggal" type="date" onChange={this.onEditInputHandler} value={this.state.editData.tanggal} className="form-control my-1"></input>
          <input name="jam" type="time" onChange={this.onEditInputHandler} value={this.state.editData.jam} className="form-control my-1"></input>
          <input name="tempat" type="text" onChange={this.onEditInputHandler} value={this.state.editData.tempat} className="form-control my-1" placeholder="Tempat"></input>
          <input name="gambar" type="text" onChange={this.onEditInputHandler} value={this.state.editData.gambar} className="form-control my-1" placeholder="Link Gambar"></input>
          <select name="durasi" onChange={this.onEditInputHandler} className="form-control my-1">
            <option value={this.state.addData.durasi} hidden>Durasi</option>
            <option value="2">2 Jam</option>
            <option value="3">3 Jam</option>
            <option value="5">5 Jam</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={this.editSaveClick}>Save</button>
          <button onClick={this.toggleEditHandler} className="btn btn-secondary">Cancel</button>
        </ModalFooter>
      </Modal>
    );
  };


  // Render Kegiatan
  renderToDo = () => {
    return this.state.todo.map((val) => {
      return (
        <div className="col-12 mb-4 col-md-6 col-xl-3 mb-xl-3">
          <Card className="card-shadow">
            <CardImg src={val.gambar} alt="Gambar" />
            <CardBody>
              <CardTitle tag="h5">{val.kegiatan}</CardTitle>
              <CardSubtitle className="mb-xl-1">{this.renderTanggal(val.tanggal)}</CardSubtitle>
              <CardText className="mb-xl-0"><BiTime></BiTime> {val.jam}</CardText>
              <CardText className="mb-xl-0"><BiTimer></BiTimer> {val.durasi}</CardText>
              <CardText className="mb-xl-3"><MdPlace></MdPlace> {val.tempat}</CardText>
              <div className="d-flex">
                <button className="btn btn-primary" onClick={this.toggleEditHandler} style={{ marginRight: "4%" }}><FiEdit></FiEdit>  Edit</button>
                <button className="btn btn-danger" onClick={this.toggleDeleteHandler}><FiTrash2></FiTrash2>  Hapus</button>
              </div>
            </CardBody>
          </Card>
        </div >
      )
    })
  }


  render() {
    return (
      <div className="m-4 m-xl-4">

        {/* Input Modal */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModalHandler}>
          <ModalHeader toggle={this.toggleModalHandler}>Add To Do</ModalHeader>
          <ModalBody>
            <input name="kegiatan" type="text" onChange={this.onAddInputHandler} value={this.state.addData.kegiatan} className="form-control my-1" placeholder="Kegiatan"></input>
            <input name="tanggal" type="date" onChange={this.onAddInputHandler} value={this.state.addData.tanggal} className="form-control my-1"></input>
            <input name="jam" type="time" onChange={this.onAddInputHandler} value={this.state.addData.jam} className="form-control my-1"></input>
            <input name="tempat" type="text" onChange={this.onAddInputHandler} value={this.state.addData.tempat} className="form-control my-1" placeholder="Tempat"></input>
            <input name="gambar" type="text" onChange={this.onAddInputHandler} value={this.state.addData.gambar} className="form-control my-1" placeholder="Link Gambar"></input>
            <select name="durasi" onChange={this.onAddInputHandler} className="form-control my-1">
              <option value={this.state.addData.durasi} hidden>Durasi</option>
              <option value="2">2 Jam</option>
              <option value="3">3 Jam</option>
              <option value="5">5 Jam</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.addSaveClick}>Save</button>
            <button onClick={this.toggleModalHandler} className="btn btn-secondary">Cancel</button>
          </ModalFooter>
        </Modal>
        {/* Input Modal End */}

        {this.renderModalEdit()}

        {/* Delete To Do Modal */}
        <Modal isOpen={this.state.modalDelete} toggle={this.toggleDeleteHandler}>
          <ModalHeader toggle={this.toggleDeleteHandler}>Delete To Do</ModalHeader>
          <ModalBody>
            Apa kamu yakin?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.onYesDelete}>Yes</button>
            <button onClick={this.toggleModalHandler} className="btn btn-secondary">Cancel</button>
          </ModalFooter>
        </Modal>
        {/* Delete To Do Modal End */}

        <h1 className="text-center">To Do List</h1>
        <button onClick={this.toggleModalHandler} className="btn btn-outline-primary mb-3 my-xl-3">Add To Do</button>
        <div className="row d-flex justify-content-center my-xl-4">
          {this.renderToDo()}
        </div>
      </div>
    )
  }
}

export default App;
