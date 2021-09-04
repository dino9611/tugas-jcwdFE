import React, {Component} from "react";
import {Container, Row, Spinner} from 'reactstrap';
import {HomeModal, RenderTabel03, DeleteModal, EditModal} from "../components/"
import axios from "axios"
import {connect} from "react-redux"
import {actionTambah, actionKurang, actionPerkalian} from "../redux/actions"

class Home extends Component {
    state = {
        todo: [],
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
        loading: true
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/todos`)
        .then((response) => {
            this.setState({todo: response.data });
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            this.setState({loading: false});
        })
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

        // Parameter kedua adalah datanya (yg mau kita kirim)
        // this.state.dataAdd harus object
        axios.post(`http://localhost:5000/todos`, this.state.dataAdd)
        .then((response) => {
            console.log(response.data)
            axios.get(`http://localhost:5000/todos`) // GET ulang buat dapetin data yg baru
            .then((response1) => {
                let restartDataAdd = {
                        tanggal: "",
                        jam: "",
                        kegiatan: "",
                        tempat: "",
                        waktuKegiatan: "0",
                        gambar: ""
                    };
                this.setState({todo: response1.data, dataAdd: restartDataAdd, modalOpen: false});
            }).catch((error1) => {
                console.log(error1);
                alert("Server Error");
            })
        }).catch((error) => {
            console.log(error);
            alert("Server Error");
        })
    } 

    onInputChange = (event) => {
        this.setState({kali: event.target.value});
    }

    cobaPerkalian = () => {
        this.props.actionPerkalian(this.state.kali)
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
        let idDelete = todo[indexDel].id // Utk track task mana yg akan di-delete

        axios.delete(`http://localhost:5000/todos/${idDelete}`, this.state.dataAdd)
        .then((response) => {
            console.log(response.data)
            axios.get(`http://localhost:5000/todos`)
            .then((response1) => {
                this.setState({
                    todo: response1.data, 
                    indexDel: -1, 
                    modalDel: !this.state.modalDel
                });
            }).catch((error1) => {
                console.log(error1)
                alert("Server Error")
            })
        }).catch((error) => {
            console.log(error)
            alert("Server Error")
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

    // SEARCH TASK RELATED FUNCTIONS SECTION
    hitAxios = 0;

    debounce = (func, delay, event) => {
        let debounceTimer
        return function() {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => func(event), delay)
        }
    } 

    searchDebounce = (event) => {
        this.debounce(this.searchTask, 1000, event)()
    }

    searchTask = (event) => {
        this.hitAxios+=1 // Buat ngitung berapa x kena
        console.log(this.hitAxios)
        axios.get(`http://localhost:5000/todos?kegiatan_like=${event.target.value}`)
        .then((response) => {
            this.setState({todo: response.data});
        }).catch((error) => {
            console.log(error)
            alert("Server Error")
        })
    }

    saveEditTask = () => {
        let {tanggal, jam, kegiatan, tempat, waktuKegiatan, gambar} = this.state.dataEdit;
        if(!tanggal || !kegiatan || !jam || !kegiatan || !tempat || !waktuKegiatan || !gambar) {
            alert("Harap isi semua!");
            return;
        }
        let {indexEdit, todo, dataEdit} = this.state;
        let idEdit = todo[indexEdit].id

        // Karena data editnya property dibawa semua, jadi bisa pake PATCH / PUT
        axios.put(`http://localhost:5000/todos/${idEdit}`, dataEdit)
        .then((response) => {
            console.log(response.data)
            axios.get(`http://localhost:5000/todos`)
            .then((response1) => {
                let restartDataEdit = {
                        tanggal: "",
                        jam: "",
                        kegiatan: "",
                        tempat: "",
                        waktuKegiatan: "0",
                        gambar: ""
                    };
                alert("Berhasil ubah data")
                this.setState({
                    todo: response1.data, 
                    dataAdd: restartDataEdit, 
                    modalEdit: false});
            }).catch((error1) => {
                console.log(error1)
                alert("Server Error")
            })
        }).catch((error) => {
            console.log(error)
            alert("Server Error")
        })
    }

    render() {
        const {modalOpen, todo, indexDel, modalDel, dataAdd, modalEdit, indexEdit, dataEdit} = this.state;
        return (
            <div className="mx-5">
                <h1 className="d-flex justify-content-center align-item-center mt-5 mb-3">To Do List</h1>
                <div className="d-flex justify-content-center align-item-center my-5">
                    <button className="btn btn-success m-0 btn-del-outline" onClick={this.toggleModalHandler}>Add Task</button>
                </div>
                <div className="d-flex justify-content-center align-item-center mb-3">
                    <input type="text" placeholder="Search Task" name="searchTask" onChange={this.searchDebounce} />
                </div>
                <div className="d-flex justify-content-center align-item-center">
                    {this.props.tambahKurang} 
                    {/* this.props.tambahKurang = manggil si reducer tambahKurang dgn INITIAL_STATE nya 20 */}
                    <button onClick={this.props.actionTambah} className="ml-3">
                        {/* this.props.actionTambah = manggil si function actionTambah ketika button di klik yg dimana dalemnya contain type: "operasiTambah", "operasiTambah" berasal dari case yg di-initiate pada reducer tambahKurang */}
                        Tambah
                    </button>
                    <button onClick={this.props.actionKurang} className="ml-3">
                        Kurang
                    </button>
                </div>
                <div className="d-flex justify-content-center align-item-center">
                    <input type="number" onChange={this.onInputChange} />
                    {this.props.kaliBagi}
                    <button onClick={this.cobaPerkalian} className="ml-3">
                        Perkalian {this.state.kali}
                    </button>
                </div>

                {/* MODAL ADD TASK COMPONENT */}
                <HomeModal modalOpen={modalOpen} toggle={this.toggleModalHandler} dataAdd={dataAdd} saveNewTask={this.saveNewTask} onAddInputHandler={this.onAddInputHandler} />

                {/* MODAL DELETE TASK COMPONENT */}
                <DeleteModal modalDel={modalDel} toggle={this.toggleDelHandler} todo={todo} confirmDelTask={this.confirmDelTask} indexDel={indexDel} />

                {/* MODAL EDIT TASK COMPONENT */}
                <EditModal modalEdit={modalEdit} toggle={this.toggleEditHandler} todo={todo} indexEdit={indexEdit} onEditInputHandler={this.onEditInputHandler} dataEdit={dataEdit} saveEditTask={this.saveEditTask} />
                
                {/* RENDER TABEL COMPONENT */}
                {
                    this.state.loading?
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner color="primary" />
                    </div>
                    :
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
                }
            </div>
        );
    }
}

// Menghubungkan redux ke component
const MapStatetoProps = (state) => {
    // Klo mau proses data dlu di bagian sini gapapa, up to the needs

    return {
        tambahKurang: state.tambahKurang,
        kaliBagi: state.kaliBagi
        // Klo reducers (initial state nya byk, harus diperjelas state yg dipanggil yg mana)
        // Klo nama property nya mau beda dari si state.ygDipanggil, itu ga masalah, asal diata2 klo manggil pake nama property nya (ex: this.props.multiply)
    }
}

export default connect(MapStatetoProps, {actionTambah, actionKurang, actionPerkalian}) (Home);
// Klo class component harus sambunginnya pake conncet(), klo udh banyak jadi cape, tapi klo pake react hooks ga harus gitu, lebih simpel (ada namanya use selector)