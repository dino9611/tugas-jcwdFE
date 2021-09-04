import React, {Component} from "react";
import {connect} from "react-redux";

class Footer extends Component {
    render() {
        return (
            <footer className="d-flex flex-column justify-content-center align-items-center">
                <h3>2021</h3>
                <h4 className="mt-4">Test Redux = {this.props.tambahKurang}</h4>
                <h1>Jumlah Kata : {this.props.jumlahKata}</h1>
            </footer>
        );
    }
}

const MapStatetoProps = (state) => {
    return {
        tambahKurang: state.tambahKurang,
        jumlahKata: state.hitungKata
    }
}

export default connect(MapStatetoProps) (Footer);