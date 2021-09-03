import React, {Component} from "react";
import {Container, Row} from 'reactstrap';
import {HomeModal, RenderTabel03, DeleteModal, EditModal} from "../src/components"

class Home extends Component {
    state = {
        todo: [
            {
              tanggal: "2021-08-25",
              jam: "19:00",
              kegiatan: "Masak",
              tempat: "Dapur",
              waktuKegiatan: 2,
              gambar:
                "https://i2.wp.com/resepkoki.id/wp-content/uploads/2017/08/masak-bersih1.jpg?fit=1920%2C1280&ssl=1",
            },
            {
              tanggal: "2021-08-26",
              jam: "10:00",
              kegiatan: "Dagang",
              tempat: "Local Market",
              waktuKegiatan: 5,
              gambar:
                "https://cdn.idntimes.com/content-images/community/2020/09/photo-1528952686551-542043782ab9-220a0e9189588b4419ad98cc1b5e5fe9_600x400.jpeg",
            },
            {
              tanggal: "2021-08-26",
              jam: "08:00",
              kegiatan: "Hiking",
              tempat: "Gunung",
              waktuKegiatan: 3,
              gambar:
                "https://images.theconversation.com/files/405661/original/file-20210610-18-imwshy.jpg?ixlib=rb-1.1.0&rect=6%2C0%2C4486%2C2997&q=45&auto=format&w=926&fit=clip",
            },
            {
              tanggal: "2021-08-28",
              jam: "01:00",
              kegiatan: "Stargazing",
              tempat: "Bukit Teletabis",
              waktuKegiatan: 2,
              gambar:
                "https://media.cntraveler.com/photos/60f5a7fa964f812d9f962ceb/master/pass/Stargazing-2021_PRK0G2.jpg",
            }
          ],
          modalOpen: false,
          modalDel: false,
          modalEdit: false,
          indexDel: -1,
          indexEdit: -1,
          dataAdd: {
                tanggal: "",
                jam: "",
                kegiatan: "",
                tempat: "",
                waktuKegiatan: "0",
                gambar: ""
          },
          dataEdit: {
            tanggal: "",
            jam: "",
            kegiatan: "",
            tempat: "",
            waktuKegiatan: "0",
            gambar: ""
        },
    }

    // INPUT RELATED FUNCTIONS SECTION
    toggleModalHandler = () => {
        this.setState({modalOpen: !this.state.modalOpen});
    };

    onAddInputHandler = (event) => {
        let dataAddMute = this.state.dataAdd
        dataAddMute = {...dataAddMute, [event.target.name]: event.target.value};
        this.setState({dataAdd: dataAddMute});
    }

    saveNewTask = () => {
        console.log(this.state.dataAdd)
        let {tanggal, jam, kegiatan, tempat, waktuKegiatan, gambar} = this.state.dataAdd;
        if(!tanggal || !kegiatan || !jam || !kegiatan || !tempat || !waktuKegiatan || !gambar) {
            alert("Harap isi semua!");
            return;
        }
        let newToDo = this.state.todo;
        newToDo.push(this.state.dataAdd);
        let restartDataAdd = {
            tanggal: "",
            jam: "",
            kegiatan: "",
            tempat: "",
            waktuKegiatan: "0",
            gambar: ""
        };
        this.setState({todo: newToDo, dataAdd: restartDataAdd, modalOpen: false});
    } 

    // DELETE RELATED FUNCTIONS SECTION
    toggleDelHandler = () => {
        this.setState({modalDel: !this.state.modalDel});
    }

    deleteTask = (index) => {
        this.setState({indexDel: index, modalDel: !this.state.modalDel});
    }

    confirmDelTask = () => {
        let {todo, indexDel} = this.state;
        let newToDo = todo;
        newToDo.splice(indexDel, 1);
        this.setState({
            todo: newToDo,
            indexDel: -1,
            modalDel: !this.state.modalDel,
        })
    }

    // EDIT RELATED FUNCTIONS SECTION
    toggleEditHandler = () => {
        this.setState({modalEdit: !this.state.modalEdit});
    }

    editTask = (index) => {
        let newDataEdit = this.state.todo[index]
        this.setState({indexEdit: index, modalEdit: !this.state.modalEdit, dataEdit: newDataEdit})
    }

    onEditInputHandler = (event) => {
        let dataEditMute = this.state.dataEdit
        dataEditMute = {...dataEditMute, [event.target.name]: event.target.value}
        this.setState({dataEdit: dataEditMute})
    }

    saveEditTask = () => {
        let {tanggal, jam, kegiatan, tempat, waktuKegiatan, gambar} = this.state.dataEdit;
        if(!tanggal || !kegiatan || !jam || !kegiatan || !tempat || !waktuKegiatan || !gambar) {
            alert("Harap isi semua!");
            return;
        }
        let {indexEdit, todo, dataEdit} = this.state;
        let editedToDo = todo;
        editedToDo.splice(indexEdit, 1, dataEdit);
        let restartDataEdit = {
            tanggal: "",
            jam: "",
            kegiatan: "",
            tempat: "",
            waktuKegiatan: "0",
            gambar: ""
        };
        this.setState({todo: editedToDo, dataEdit: restartDataEdit, modalEdit: false});
    }

    render() {
        const {modalOpen, todo, indexDel, modalDel, dataAdd, modalEdit, indexEdit, dataEdit} = this.state;
        return (
            <div className="mx-5">
                <h1 className="d-flex justify-content-center align-item-center mt-5 mb-3">To Do List</h1>
                <div className="d-flex justify-content-center align-item-center my-5">
                    <button className="btn btn-success m-0 btn-del-outline" onClick={this.toggleModalHandler}>Add Task</button>
                </div>

                {/* MODAL ADD TASK COMPONENT */}
                <HomeModal modalOpen={modalOpen} toggle={this.toggleModalHandler} dataAdd={dataAdd} saveNewTask={this.saveNewTask} onAddInputHandler={this.onAddInputHandler} />

                {/* MODAL DELETE TASK COMPONENT */}
                <DeleteModal modalDel={modalDel} toggle={this.toggleDelHandler} todo={todo} confirmDelTask={this.confirmDelTask} indexDel={indexDel} />

                {/* MODAL EDIT TASK COMPONENT */}
                <EditModal modalEdit={modalEdit} toggle={this.toggleEditHandler} todo={todo} indexEdit={indexEdit} onEditInputHandler={this.onEditInputHandler} dataEdit={dataEdit} saveEditTask={this.saveEditTask} />
                
                {/* RENDER TABEL COMPONENT */}
                <Container className="mb-5">
                    <Row>
                        {this.state.todo.map((data, index) => {
                                return (
                                    <RenderTabel03 
                                        key={index} 
                                        data={data} 
                                        index={index} 
                                        deleteTask={this.deleteTask} 
                                        editTask={this.editTask} 
                                    />
                                );
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;