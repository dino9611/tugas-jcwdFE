import React, { Component } from "react";
import Cards from "./components/cards";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";

class App extends Component {
  state = {
    data: [
      {
        tanggal: "2021-08-25",
        jam: "19:00",
        kegiatan: "belajar",
        tempat: "rumah",
        waktuKegiatan: 2,
        gambar:
          "https://asset.kompas.com/crops/eljeeuZu6b2-KjeeYETjEvzPR4Y=/0x0:1000x667/750x500/data/photo/2019/11/13/5dcbd2356022a.jpg",
      },
      {
        tanggal: "2021-08-01",
        jam: "20:00",
        kegiatan: "kondangan",
        tempat: "di luar",
        waktuKegiatan: 2,
        gambar:
          "https://asset.kompas.com/crops/eljeeuZu6b2-KjeeYETjEvzPR4Y=/0x0:1000x667/750x500/data/photo/2019/11/13/5dcbd2356022a.jpg",
      },
    ],
    modalOpen: false,
    modalDel: false,
    modalEdit: false,
    indexDel: -1,
    indexEdit: -1,
    defaultData: {
      tanggal: "",
      jam: "",
      kegiatan: "",
      tempat: "",
      waktuKegiatan: "",
      gambar: "",
    },
    defDataEdit: {
      tanggal: "",
      jam: "",
      kegiatan: "",
      tempat: "",
      waktuKegiatan: "0",
      gambar: "",
    },
  };

  renderData = () => {
    return this.state.data.map((el, index) => {
      return (
        <Cards
          val={el}
          ind={index}
          del={this.onClickDeleteData}
          edit={this.onClickEdit}
        />
      );
    });
  };

  isAddDataModal = () => {
    console.log("tes");
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onAddData = () => {
    let { isAddDataModal, inputData } = this;

    return (
      <div>
        <Modal isOpen={this.state.modalOpen} toggle={isAddDataModal}>
          <ModalHeader toggle={isAddDataModal}>Add Data</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="kegiatan" sm={2}>
                  Kegiatan
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    onChange={inputData}
                    value={this.state.defaultData.kegiatan}
                    name="kegiatan"
                    id="kegiatan"
                    placeholder="Masukkan kegiatan baru"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dates" sm={2}>
                  Tanggal
                </Label>
                <Col sm={10}>
                  <Input
                    type="date"
                    onChange={inputData}
                    value={this.state.defaultData.tanggal}
                    name="tanggal"
                    id="dates"
                    placeholder="Tanggal"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="time" sm={2}>
                  Waktu
                </Label>
                <Col sm={10}>
                  <Input
                    type="time"
                    onChange={inputData}
                    value={this.state.defaultData.jam}
                    name="jam"
                    id="time"
                    placeholder="Waktu"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="place" sm={2}>
                  Tempat
                </Label>
                <Col sm={10}>
                  <Input
                    type="place"
                    onChange={inputData}
                    value={this.state.defaultData.tempat}
                    name="tempat"
                    placeholder="Masukkan tempat"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Waktu
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="waktuKegiatan"
                    id="waktu"
                    onChange={inputData}
                    value={this.state.defaultData.waktuKegiatan}
                  >
                    <option value="0" hidden>
                      Pilih durasi
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gambar" sm={2}>
                  Gambar
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    onChange={inputData}
                    value={this.state.defaultData.gambar}
                    name="gambar"
                    id="gambar"
                    placeholder="Masukkan alamat gambar"
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveAddData}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.cancelAddData}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  inputData = (e) => {
    let dataMutate = this.state.defaultData;
    dataMutate = { ...dataMutate, [e.target.name]: e.target.value };
    this.setState({ defaultData: dataMutate });
  };

  saveAddData = () => {
    for (let obj in this.state.defaultData) {
      if (!this.state.defaultData[obj]) {
        alert("Isi semua data");
        return;
      }
    }

    this.state.data.push(this.state.defaultData);
    this.setState({ modalOpen: false });
  };

  cancelAddData = () => {
    this.setState({ modalOpen: false });
  };

  onClickDeleteData = (index) => {
    this.setState({ modalDel: !this.state.modalDel, indexDel: index });
  };

  onDeleteData = () => {
    let index = this.state.indexDel;
    console.log(index);
    return (
      <div>
        <Modal isOpen={this.state.modalDel} toggle={this.onClickDeleteData}>
          <ModalHeader>Delete Data</ModalHeader>
          <ModalBody>
            <h6>
              Apakah anda yakin ingin menghapus kegiatan{" "}
              {index < 0 ? "" : this.state.data[index].kegiatan}?
            </h6>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" value="1" onClick={this.onDeleteClick}>
              Delete
            </Button>{" "}
            <Button color="primary" onClick={this.onCancelDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  onCancelDelete = () => {
    this.setState({ modalDel: false });
  };

  onDeleteClick = () => {
    this.state.data.splice(this.state.indexDel, 1);
    this.setState({ modalDel: false });
  };

  onClickEdit = (el, index) => {
    console.log(el);
    this.setState({
      modalEdit: !this.state.modalEdit,
      indexEdit: index,
      defDataEdit: el,
    });
  };

  showModalEdit = () => {
    console.log(this.state.defDataEdit);
    let { onClickEdit, editData } = this;
    let { defDataEdit } = this.state;

    if (this.state.indexEdit < 0) {
      return;
    }
    return (
      <div>
        <Modal isOpen={this.state.modalEdit} toggle={onClickEdit}>
          <ModalHeader toggle={onClickEdit}>Add Data</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="kegiatan" sm={2}>
                  Kegiatan
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    onChange={editData}
                    value={defDataEdit.kegiatan}
                    name="kegiatan"
                    id="kegiatan"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dates" sm={2}>
                  Tanggal
                </Label>
                <Col sm={10}>
                  <Input
                    type="date"
                    onChange={editData}
                    value={defDataEdit.tanggal}
                    name="tanggal"
                    id="dates"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="time" sm={2}>
                  Waktu
                </Label>
                <Col sm={10}>
                  <Input
                    type="time"
                    onChange={editData}
                    value={defDataEdit.jam}
                    name="jam"
                    id="time"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="place" sm={2}>
                  Tempat
                </Label>
                <Col sm={10}>
                  <Input
                    type="place"
                    onChange={editData}
                    value={defDataEdit.tempat}
                    name="tempat"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Waktu
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="waktuKegiatan"
                    id="waktu"
                    onChange={editData}
                    value={defDataEdit.waktuKegiatan}
                  >
                    <option value="0" hidden>
                      Pilih durasi
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gambar" sm={2}>
                  Gambar
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    onChange={editData}
                    value={defDataEdit.gambar}
                    name="gambar"
                    id="gambar"
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSaveClick}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.onCancelEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  editData = (e) => {
    let dataMutate = this.state.defDataEdit;
    dataMutate = { ...dataMutate, [e.target.name]: e.target.value };
    this.setState({ defDataEdit: dataMutate });
  };

  onSaveClick = () => {
    this.state.data.splice(this.state.indexEdit, 1, this.state.defDataEdit);
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  onCancelEdit = () => {
    this.setState({ modalEdit: false });
  };

  render() {
    let { onAddData, onDeleteData, showModalEdit } = this;
    return (
      <div className="d-flex flex-column align-items-center">
        {onAddData()}
        {onDeleteData()}
        {showModalEdit()}
        <h2>Todo List</h2>
        <Button
          color="primary"
          className="align-self-start mt-5 ml-5"
          onClick={this.isAddDataModal}
        >
          Add Data
        </Button>{" "}
        <div className="container-md mt-3">
          <div className="row">{this.renderData()}</div>
        </div>
      </div>
    );
  }
}

export default App;
