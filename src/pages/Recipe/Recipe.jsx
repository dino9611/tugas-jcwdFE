import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Spinner } from 'reactstrap';
import "./Recipe.css"
const ApiKey = `apiKey=4b4a96f98f6443d0a77dac3c5d693158`
const URL = `https://api.spoonacular.com/recipes`

class Recipe extends Component {
    state = {
        loading: true,
        resep: [],
        cuisines: ['Japanese', 'Indian', 'Chinese', 'Thai', 'Middle Eastern'],
        cuisineChoices: '',
        opsiDiet: '',
        diet: ['Gluten Free', 'Ketogenic', 'Vegetarian'],
        ingredientSelected: [],
        resepNameSelected: "",
        modal: false
    }

    componentDidMount() {
        axios.get(`${URL}/complexSearch?${ApiKey}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ resep: res.data.results })
            }).catch((err) => {
                console.log(err)
                alert('server error')
            }).finally(() => {
                this.setState({ loading: false })
            })
    }

    onCardClick = ((id, name) => {
        axios.get(`${URL}/${id}/ingredientWidget.json?${ApiKey}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ ingredientSelected: res.data.ingredients, modal: true, resepNameSelected: name })
            }).catch((err) => {
                console.log(err)
                alert("error")
            })
    })

    renderRecipes = () => {
        if (!this.state.resep.length) {
            return (
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>No data</h1>
                </div>
            )
        }
        return this.state.resep.map((val, index) => {
            return (
                <div key={index} className="col-xl-3 col-md-6">
                    <Card onClick={() => this.onCardClick(val.id, val.title)} className="mb-xl-4 m-4">
                        <CardImg top width="100%" src={val.image} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" >{val.title}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    onSearchClick = () => {
        let url = `${URL}/complexSearch?${ApiKey}`
        const { cuisineChoices, opsiDiet } = this.state
        if (cuisineChoices) {
            url += `&cuisine=${cuisineChoices}`
        }
        if (opsiDiet) {
            url += `&diet=${opsiDiet}`
        }
        this.setState({ resep: [], loading: true })
        axios.get(`${url}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ resep: res.data.results })
            }).catch((err) => {
                console.log(err)
                alert('server error')
            }).finally(() => {
                this.setState({ loading: false })
            })
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderList = (prop) => {
        return this.state[prop].map((val) => {
            return <option key={val} value={val}>{val} </option>
        })
    }

    toggle = () => this.setState({ modal: !this.state.modal })

    renderModal = () => {
        if (this.state.ingredientSelected.length) {
            console.log(this.state.ingredientSelected[0].name)
            return (
                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Ingredients of {this.state.resepNameSelected}</ModalHeader>
                    <ModalBody>
                        {
                            this.state.ingredientSelected.map((val, index) => {
                                return (
                                    <div key={index}>
                                        {index + 1}. {val.name} {val.amount.us.value} {val.amount.us.unit}
                                    </div>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            )
        } else {
            return null
        }
    }


    renderCuisines = () => {
        return this.state.cuisines.map((val) => {
            return <option key={val} value={val}>{val} </option>
        })
    }


    render() {
        return (
            <div className="m-xl-5 m-md-5 m-5">
                {this.renderModal()}
                <div className="d-flex mb-md-1 mb-3">
                    <div>
                        <select name='cuisineChoices' value={this.state.cuisineChoices} onChange={this.inputHandler} className="mb-xl-3 mb-md-3 p-xl-2 p-md-2 p-2">
                            <option value="">All Cuisines</option>
                            {this.renderList("cuisines")}
                        </select>
                    </div>
                    <div className="mx-xl-4 mx-md-3 mx-3">
                        <select
                            value={this.state.opsiDiet}
                            name='opsiDiet'
                            onChange={this.inputHandler}
                            className="mb-xl-3 mb-md-3 p-xl-2 p-md-2 p-2"
                        >
                            <option value="">All Diet</option>
                            {this.renderList('diet')}
                        </select>
                    </div>
                </div>
                <div style={{ height: '7vh' }} className="mb-xl-2 mb-md-2 mb-1">
                    {
                        this.state.cuisineChoices ?
                            <div className="btn btn-outline-success">
                                {this.state.cuisineChoices} <span onClick={() => this.setState({ cuisineChoices: '' })}>x</span>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.opsiDiet ?
                            <div className="btn btn-outline-success mx-xl-4 mx-md-3 mx-3">
                                {this.state.opsiDiet} <span onClick={() => this.setState({ opsiDiet: '' })}>x</span>
                            </div>
                            :
                            null
                    }
                </div>
                <div>
                    <button onClick={this.onSearchClick} className='btn btn-primary mb-xl-3 mb-md-3 mb-1'>
                        Search
                    </button>
                </div>
                {
                    this.state.loading ?
                        <div className="text-center mt-xl-4">
                            <div><Spinner color="success" /></div>
                        </div> :
                        <div className="row d-flex justify-content-center">
                            {this.renderRecipes()}
                        </div>

                }
            </div>
        )
    }
}

export default Recipe