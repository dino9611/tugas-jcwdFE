import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { BiCalendar } from "react-icons/bi";
import {
  BsFillClockFill,
  BsHouseDoorFill,
  BsClockHistory,
  BsFillTrashFill,
} from "react-icons/bs";

const Cards = (props) => {
  let { val, ind, del, edit } = props;
  return (
    <div className="col-3 mb-5">
      <Card>
        <CardImg top width="100%" src={val.gambar} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{val.kegiatan}</CardTitle>
          <div className="d-flex flex-column small">
            <CardText className="">
              <BiCalendar className="mr-1" /> {val.tanggal}
            </CardText>
            <CardText>
              <BsHouseDoorFill className="mr-1" /> {val.tempat}
            </CardText>
            <CardText>
              <BsFillClockFill className="mr-1" /> {val.jam}
            </CardText>
            <CardText>
              <BsClockHistory className="mr-1" /> {val.waktuKegiatan}
            </CardText>
            <div className="align-self-end">
              <Button
                className="bg-success mr-2"
                onClick={() => edit(val, ind)}
              >
                Edit
              </Button>
              <Button className="bg-danger" onClick={() => del(ind)}>
                <BsFillTrashFill />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cards;
