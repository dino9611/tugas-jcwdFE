import React, { Component } from 'react';

class ResepFilter extends Component {
    state = {};

    render() {
        const {inputHandler, renderCuisines, renderDiet, choosenCuisine, choosenDiet, submitSearchClick, removeFilterEdit, removeFilterDiet} = this.props
        return (
            <>
                <div>
                    <select 
                        name="choosenCuisine" 
                        onChange={inputHandler} 
                        className="form-control"
                        value={this.props.choosenCuisine}
                        // Ga bisa pake destructuring, karena dia ga dinamis gonta ganti state, jadi akalinnya pake this.props walau diatas udh destructuring, klo ga nnti remove filter tp input nya ga balik ke default
                    >
                        <option value="">All Cuisines</option>
                        {renderCuisines()}
                        {/* Pake () ya, biar lsg jalan dan render list cuisines nya */}
                    </select> 
                    <select 
                        name="choosenDiet" 
                        onChange={inputHandler} 
                        className="form-control"
                        value={this.props.choosenDiet}
                        // Ga bisa pake destructuring, karena dia ga dinamis gonta ganti state, jadi akalinnya pake this.props walau diatas udh destructuring, klo ga nnti remove filter tp input nya ga balik ke default
                    >
                        <option value="">All Diet</option>
                        {renderDiet()}
                        {/* Pake () ya, biar lsg jalan dan render list diet nya */}
                    </select>
                </div>
            
            {/* Below is bagian untuk menampilkan steady state choosen filter */}
                <div className="py-2">
                    {/* Dibawah pake ternary */}
                    {
                        choosenCuisine ?
                        <div className="btn btn-outline-success">
                            {choosenCuisine} <span onClick={removeFilterEdit}>X</span>
                        </div>
                        :
                        null
                    }
                    {
                        choosenDiet ?
                        <div className="btn btn-outline-success">
                            {choosenDiet} <span onClick={removeFilterDiet}>X</span>
                        </div>
                        :
                        null
                    }
                    {/* Pake ternary biar button nya ga langunsg muncul, munculnya pas filter terpilih aja */}
                </div>
                <div>
                    <button className="btn btn-primary my-1" onClick={submitSearchClick}>
                        Search
                    </button>
                </div>
            </>
        )
    }
}

export default ResepFilter;