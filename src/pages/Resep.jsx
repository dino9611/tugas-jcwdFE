import React, { Component } from 'react';
import axios from "axios";
import {ResepFilter, ResepCards, IngredientsModal} from '../components/resep_page_components';
import {Spinner} from 'reactstrap';

const ApiKey = "apiKey=13e0ca349c6643b6964304b33afd040d"
const URL = `https://api.spoonacular.com/recipes`

class Resep extends Component {
    state= {
        resep: [],
        cuisines: [
                "Japanese", 
                "Indian", 
                "Chinese", 
                "Thai", 
                "Middle Eastern"
            ],
        diet: [
                "Gluten Free", 
                "Ketogenic", 
                "Vegetarian"
            ],
        choosenCuisine: "",
        choosenDiet: "",
        loading: true,
        ingredientSelected: [],
        recipeNameSelected: "",
        modal: false
    }

    componentDidMount(){
        // Untuk akses GET data API menggunakan axios
        axios.get(`${URL}/complexSearch?${ApiKey}`)
        // GET data dari url API diatas, tapi dari webnya hanya ngasih data 10 item teratas dari ribuan
        .then((response) => {
            console.log(response.data);
            this.setState({resep: response.data.results});
            console.log(this.state.resep)
            // response.data adalah semua hasil dari data yg di-GET (array of objects, kasih .result utk select property nya, karena JSON bisa diperlakukan seperti JS, dan dari penyedia data object[0] propertynya "results" yg dalamnya ada array of objects berisi data2 resep)
            // Bagian ini juga bertujuan utk GET data biar masuk ke state kita agar bisa digunakan (ex: map)
        }).catch((error) => {
            console.log(error);
            alert("Server Error");
            // Klo promise diatas gagal akan masuk kesini
        }).finally(() => {
            this.setState({loading: false})
        })
        // Ini bersifat asynchronous, jd klo mau lanjut kodingan ga bs dibagian sini, tapi masukin di dalam .then(response)
    }

    // ONCLICK EVENT FUNCTIONS SECTION
    onCardClick = (id, name) => {
        axios.get(`${URL}/${id}/ingredientWidget.json?${ApiKey}`)
        .then((response) => {
            this.setState({ingredientSelected: response.data.ingredients, modal: true, recipeNameSelected: name})
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    submitSearchClick= () => {
        let url= `${URL}/complexSearch?${ApiKey}`
        const {choosenCuisine, choosenDiet} = this.state
        if (choosenCuisine && choosenDiet) {
            url+= `&cuisine=${choosenCuisine}&diet=${choosenDiet}`
        } else if (choosenCuisine) {
            url+= `&cuisine=${choosenCuisine}`
        } else if (choosenDiet) {
            url+= `&diet=${choosenDiet}`
        }
        this.setState({resep: [], loading: true})
        // Biar ada efek loading dahulu dan animasi spinner berjalan dlu baru GET data
        axios.get(`${url}`)
        .then((response) => {
            console.log(response.data);
            this.setState({resep: response.data.results});
        }).catch((error) => {
            console.log(error);
            alert("Server Error");
        }).finally(() => {
            this.setState({loading: false})
        })
        // Bila hasil berhasil masuk ke .then, atau gagal ke .catch, intinya finally (ujungnya) masuk ke .finally
        // Kasus ini finally untuk set loading false biar si spinner ga muter terus
        
    }

    // HANDLER & TOGGLE FUNCTIONS SECTION
    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    toggle = () => this.setState({modal:!this.state.modal})

    // RENDER SEARCH FILTER SECTION
    renderCuisines = () => {
        return this.state.cuisines.map((val) => {
            return <option key={val} value={val}> {val} </option>
            // Loopin utk render opsi2 si Cuisines
        })
    }

    renderDiet = () => {
        return this.state.diet.map((val) => {
            return <option key={val} value={val}> {val} </option>
        })
    }

    removeFilterEdit = () => {
        this.setState({choosenCuisine: ""})
    }

    removeFilterDiet = () => {
        this.setState({choosenDiet: ""})
    }

    render() {
        const {choosenCuisine, choosenDiet, resep, modal, ingredientSelected, recipeNameSelected} = this.state
        return (
            <div className="container">
                <ResepFilter 
                    inputHandler={this.inputHandler} 
                    renderCuisines={this.renderCuisines} 
                    renderDiet={this.renderDiet}
                    choosenCuisine={choosenCuisine}
                    choosenDiet={choosenDiet}
                    submitSearchClick={this.submitSearchClick}
                    removeFilterEdit={this.removeFilterEdit}
                    removeFilterDiet={this.removeFilterDiet}
                />
                <IngredientsModal 
                    modal={modal}
                    toggle={this.toggle}
                    ingredientSelected={ingredientSelected}
                    resep={resep}
                    recipeNameSelected={recipeNameSelected}
                />
                    {/* Klo loading: true, maka animasi spinner dibawah ini akan berjalan */}
                    {
                        this.state.loading?
                        <div className="container">
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner color="succes" />
                            </div>
                        </div>:
                        <div className="row justify-content-center">
                            <ResepCards resep={resep} onCardClick={this.onCardClick} />
                        </div>
                    }
                    {/* Diatas pake ternary, biar bisa kebaca walaupun oneline */}
            </div>
        );
    }
}

export default Resep;

// PR
// 1. Buat tampilan lbh bagus
// 2. Searching (Bisa filter by cuisine & diet) [DONE]
// 3. Filtered button klo klik close ilang [DONE]
// 4. Kasih skeleton
// 5. Di klik muncul modal ada list ingredient (bisa pilih satuannya) [DONE]