import React, { Component } from 'react';
import { connect } from 'react-redux';
import { aksihitungkata } from "../redux/actions"

class Hitung extends Component {
    state = {
        kalimat: "",
        totalKalimat: 0
    }

    onKalimatChange = (e) => {
        let kalimat = e.target.value
        kalimat = kalimat.split(' ')
        kalimat = kalimat.filter((val) => val != '')
        this.props.aksihitungkata(kalimat.length)
        this.setState({ kalimat: e.target.value })
    }


    render() {
        return (
            <div className="container mt-5">
                <textarea className="form-control mb-2" onChange={this.onKalimatChange} cols="30" rows="10"></textarea>
                Jumlah kata = {this.props.jumlahKata}
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        jumlahKata: state.HitungKata
    }
}

export default connect(MapStateToProps, { aksihitungkata })(Hitung);