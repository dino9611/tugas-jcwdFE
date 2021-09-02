import React, { Component } from 'react';
import "./styles/filter_render.css"

class ResepFilter extends Component {
    state = {};

    render() {
        const {inputHandler, renderCuisines, renderDiet, choosenCuisine, choosenDiet, submitSearchClick, removeFilter} = this.props
        return (
            <>
                <div>
                    <select 
                        name="choosenCuisine" 
                        onChange={inputHandler} 
                        className="form-control"
                        id="test"
                    >
                        <option value="">All Cuisines</option>
                        {renderCuisines()}
                        {/* Pake () ya, biar lsg jalan dan render list cuisines nya */}
                    </select>
                    <select 
                        name="choosenDiet" 
                        onChange={inputHandler} 
                        className="form-control"
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
                        <div id="filterCuisinePill" className="btn btn-outline-success" onClick={removeFilter}>
                            {choosenCuisine} X
                        </div>
                        :
                        null
                    }
                    {
                        choosenDiet ?
                        <div className="btn btn-outline-success">
                            {choosenDiet} X
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