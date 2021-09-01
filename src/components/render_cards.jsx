import React, {Component} from "react";
import {CgTrashEmpty} from "react-icons/cg";
import {FiEdit3} from "react-icons/fi";
import {GrLocation} from "react-icons/gr"
import {BiTimeFive} from "react-icons/bi"
import {GiSandsOfTime} from "react-icons/gi"
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Col, Row
  } from 'reactstrap';
import "./styles/render_tabel_03.css"

class RenderTabel03 extends Component {

    renderTglIndo = (tanggal) => {
        const event = new Date(tanggal);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return event.toLocaleDateString('id-ID', options)
    }

    render() {
        let {index, data, deleteTask, editTask} = this.props;

        return (
            <Col md="4" className="my-4">
                <Card className="render-card-shdw">
                    <CardImg top width="100%" src={data.gambar} alt={`test-${index + 1}`} />
                    <CardBody className="ps-1">
                        <CardTitle tag="h4">
                            {data.kegiatan}
                        </CardTitle>
                        <CardSubtitle tag="h6" className="d-flex align-items-center mt-1 mb-2 text-muted">
                            <GrLocation /> &nbsp;{data.tempat}
                        </CardSubtitle>
                    </CardBody>
                    <CardBody className="d-flex ps-1">
                        <CardSubtitle className="d-flex align-items-center">
                            <BiTimeFive /> &nbsp;{data.tanggal}, {data.jam}
                        </CardSubtitle>
                        <CardSubtitle className="d-flex align-items-center">
                            &nbsp; &nbsp; <GiSandsOfTime /> &nbsp;{data.waktuKegiatan} Jam
                        </CardSubtitle>
                        <div className="render-card-btn-wrap">
                            <button 
                                className="render-btn" 
                                onClick={()=>editTask(index)}
                            >
                                <FiEdit3 size={20} color="darkgreen"/>
                            </button>
                            <button 
                                className="render-btn right-btn-divider" 
                                onClick={()=>deleteTask(index)}
                            >
                                <CgTrashEmpty size={20} color="red"/>
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default RenderTabel03;