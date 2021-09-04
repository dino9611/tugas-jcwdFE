import React, { Component } from 'react';
import {connect} from "react-redux"
import { actionHitungKata } from '../redux/actions';

class HitungKata extends Component {
    state = { 
        kalimat: "",
        totalKalimat: 0
     }

     onKalimatChange = (event) => {
        let kalimat = event.target.value;
        kalimat = kalimat.split(" ");
        kalimat = kalimat.filter((val) => val != "")
        this.props.actionHitungKata(kalimat.length)
        this.setState({kalimat:event.target.value})
     }

    render() { 
        return ( 
            <div className="container">
                <textarea cols="60" rows="10" onChange={this.onKalimatChange} placeholder="Input Kata"></textarea>
                Jumlah Kata : {this.props.jumlahKata}
            </div>
         );
    }
}

const MapStatetoProps = (state) => {
    return {
        jumlahKata: state.hitungKata
    }
}
 
export default connect(MapStatetoProps, {actionHitungKata}) (HitungKata);