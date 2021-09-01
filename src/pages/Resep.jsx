import React, { Component } from 'react';
import axios from "axios";
import {
    Card, CardImg, CardBody,
    CardTitle, Spinner
  } from 'reactstrap';

const ApiKey = "apiKey=13e0ca349c6643b6964304b33afd040d"
const URL = `https://api.spoonacular.com/recipes`

class Resep extends Component {
    state={
        loading: true,
        resep: [],
        cuisines: ["japanese", "indian", "indian", "chinese", "thai", "Middle Eastern"],
        cuisineChoices: "",
        dietChoices: "",
        diet: ["Gluten Free", "Ketogenic", "Vegetarian"]
    }

    componentDidMount(){
        axios.get(`${URL}/complexSearch?${ApiKey}`)
        .then((response) => {
            console.log(response.data);
            this.setState({resep: response.data.results});
        }).catch((err) => {
            console.log(err);
            alert("Server Error");
        }).finally(() => {
            this.setState({loading: false})
        })
    }

    onCardClick = () => {

    }

    renderResep = () => {
        return this.state.resep.map((val, index) => {
            return (
                <div key={index} className="col-md-3 my-2">
                    <Card className="recipe-card-height" onClick={this.onCardClick}>
                        <CardImg top width="100%" src={val.image} alt={`resep-image-${index}`} />
                        <CardBody>
                            <CardTitle tag="h5">{val.title}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            );
        })

    }

    onSearchClick= () => {
        let url= `${URL}/complexSearch?${ApiKey}`
        const {cuisineChoices, dietChoices} = this.state
        if(cuisineChoices){
            url+= `&cuisine=${cuisineChoices}`
        }
        this.setState({resep: [], loading: true})
        axios.get(`${url}`)
        .then((response) => {
            console.log(response.data);
            this.setState({resep: response.data.results});
        }).catch((err) => {
            console.log(err);
            alert("Server Error");
        }).finally(() => {
            this.setState({loading: false})
        })
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    renderCuisines = () => {
        return this.state.cuisines.map((val) => {
            return <option key={val} value={val}> {val} </option>
        })
    }

    render() {
        return (
            <div className="container">

                <div>
                    <select name="cuisineChoices" onChange={this.inputHandler} className="form-control">
                        <option value="">All Cuisines</option>
                        {this.renderCuisines()}
                    </select>
                    <select className="form-control">
                        <option value="">All Diet</option>
                    </select>
                </div>
                
                <div style={{height: "5vh"}} className="py-2">
                    {
                        this.state.cuisineChoices?
                        <div className="btn btn-outline-success">
                            {this.state.cuisineChoices} X
                        </div>
                        :
                        null
                    }
                </div>
                <div>
                    <button className="btn btn-primary my-1" onClick={this.onSearchClick} >
                        Search
                    </button>
                </div>
                    {
                        this.state.loading?
                        <div className="container">
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner color="succes" />
                            </div>
                        </div>:
                        <div className="row justify-content-center">
                            {this.renderResep()}
                        </div>
                    }
            </div>
        );
    }
}

export default Resep;