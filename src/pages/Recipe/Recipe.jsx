import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
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
        diet: ['Gluten Free', 'Ketogenic', 'Vegetarian']
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



    renderRecipes = () => {
        return this.state.resep.map((val, index) => {
            return (
                <div key={index} className="col-xl-3 col-md-4">
                    <Card onClick={this.onCardClick} className="mb-xl-4" className="tinggi">
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

    renderCuisines = () => {
        return this.state.cuisines.map((val) => {
            return <option key={val} value={val}>{val} </option>
        })
    }


    render() {
        return (
            <div className="m-xl-5 m-md-5">
                <div className="d-flex flex-column">
                    <select name='cuisineChoices' onChange={this.inputHandler} className="mb-xl-3 mb-md-3 p-xl-2 p-md-2">
                        <option value="">All Cuisines</option>
                        {this.renderCuisines()}
                    </select>
                    <select className="mb-xl-3 mb-md-3 p-xl-2 p-md-2">
                        <option value="">All Diet</option>
                    </select>
                </div>
                <div style={{ height: '7vh' }} className="mb-xl-2">
                    {
                        this.state.cuisineChoices ?
                            <div className="btn btn-outline-success">
                                {this.state.cuisineChoices} X
                            </div>
                            :
                            null
                    }
                </div>
                <div>
                    <button onClick={this.onSearchClick} className='btn btn-primary mb-xl-3 mb-md-3'>
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