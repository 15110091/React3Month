import React from "react";
import { connect } from "react-redux";
// import CustomCard from "./CustomCard";
import { Card, List, Col, Row, Button, Layout, Avatar, Spin } from "antd";
import { getListPhongRequest, pickCardPhong } from "../../actions/phong";
import { getDatPhongByPhongRequest,addDatPhongRequest } from "../../actions/datphong";
import { getListKhachHangRequest } from "../../actions/khachhang"
import ModalPhong from "./ModalPhong";
import ModalDatPhong from "./ModalDatPhong";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleModalPhong: false,
      visibleModalDatPhong: false,
    };
  }

  componentDidMount() {
    this.props.getListKhachHangRequest();
    this.props.getListPhongRequest();
  }

  handleOnclick = data => {
    pickCardPhong(data);
  };

  ontoggleModalOpen = () => {
    this.setState({
      visibleModalPhong: true
    });
  };

  ontoggleModalClose = () => {
    this.setState({
      visibleModalPhong: false
    });
  };

  ontoggleModalDatPhongOpen = () => {
    this.setState({
      visibleModalDatPhong: true
    });
  };

  ontoggleModalDatPhongClose = () => {
    this.setState({
      visibleModalDatPhong: false
    });
  };

  handleRenderList = data =>
    data.map(item => {
      console.log("Data ", item);
      if (item.TrangThai == "false")
        return (
          <Card.Grid
            key={item._id}
            style={{ width: "25%", textAlign: "center" ,backgroundColor:"#FFFA51",border:"solid"}}
            onClick={() => {
              this.ontoggleModalOpen();
              this.props.pickCardPhong(item);
              this.props.getDatPhongByPhongRequest(item._id);
            }}
          >
            {item.SoPhong}
          </Card.Grid>
        );
      else
        return (
          <Card.Grid
            key={item._id}
            style={{ width: "25%", textAlign: "center",backgroundColor:"#A8FFD4",border:"solid"}}
            // onClick={() => {
            //   this.ontoggleModalOpen();
            //   this.props.pickCardPhong(item);
            // }}
          >
            {item.SoPhong}
          </Card.Grid>
        );
    });

  render() {
    const { phong, dataPhong, datphongbyphong } = this.props;
    console.log("List props ", this.props);
    return (
      <div>
        <Row>
          <Col span="21">
            <Card title="Danh sách phòng ">
              {!phong.isFetching ? (
                this.handleRenderList(phong.listPhong)
              ) : (
                <Spin />
              )}
            </Card>
          </Col>
          <Col span="3">
            <Button
              style={{ float: "right", marginBottom: "0.5rem", width: "6rem" }}
              onClick={this.ontoggleModalDatPhongOpen}
            >
              Đặt phòng
            </Button>
            <Button
              style={{ float: "right", marginBottom: "0.5rem", width: "6rem" }}
            >
              Thanh toán
            </Button>
            {/* <Button></Button> */}
          </Col>
        </Row>
        <ModalPhong
          visible={this.state.visibleModalPhong}
          showModal={this.ontoggleModalOpen}
          onCancel={this.ontoggleModalClose}
          data={this.state.dataPhong}
          {...this.props}
        />
        <ModalDatPhong
          visible={this.state.visibleModalDatPhong}
          showModal={this.ontoggleModalDatPhongOpen}
          onCancel={this.ontoggleModalDatPhongClose}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    phong: state.phong.phong,
    dataPhong: state.phong.dataPhong,
    datphongbyphong: state.datphong.datphongbyphong,
    khachhang: state.khachhang.khachhang,
    adddatphong : state.datphong.adddatphong,
  };
};

const mapDispatchToProps = {
  getListPhongRequest,
  getDatPhongByPhongRequest,
  pickCardPhong,
  getListKhachHangRequest,
  addDatPhongRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);