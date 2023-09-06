import React from "react";
import icon_refresh from "../../assets/icons/refresh.png";
import CardView from "./CardView";
import CardViewOnly from "../molecules/CardViewOnly";
import DiagnoseCard from "./DiagnoseCard";
export default class TBRefsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      TBRef: [],
    };
    this.date = new Date();
  }
  componentDidMount() {
    this.loadTBRefs();
  }

  loadTBRefs() {
    //console.log("IN");
    this.setState({ loading: true });
    var request = new XMLHttpRequest();
    request.open("GET", "/api/TBRef/all");
    request.send();
    request.onreadystatechange = (event) => {
      if (
        event.target.readyState === 4 &&
        event.target.status === 200 &&
        event.target.responseText
      ) {
        const response = JSON.parse(event.target.responseText);
        console.log(response);
        this.setState({
          TBRef: response.filter(
            (g) => g.doctorRequested && !g.doctorDiagnosis
          ),
          loading: false,
        });
        console.log(this.state);
      }
      if (event.target.status === 400 || event.target.status === 500) {
        console.log("error");
      }
    };
  }

  goBack() {
    this.loadTBRefs();
    this.setState({ selectedTBRef: null });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="mx-auto p-5">
          <div className="loading"></div>
        </div>
      );
    } else {
      console.log(this.props.allowDiag);
      if (this.state.selectedTBRef && this.props.allowDiag === false) {
        return (
          <CardViewOnly
            goBack={() => this.goBack()}
            results={{ TBRef: this.state.selectedTBRef }}
          />
        );
      } else if (this.state.selectedTBRef && this.props.allowDiag === true) {
        console.log("YO");
        return (
          <DiagnoseCard
            goBack={() => this.goBack()}
            TBRef={this.state.selectedTBRef}
          />
        );
      }
      //console.log(this.state);
      return (
        <>
          <div className="row text-right w-100">
            <div className="col-12 px-4 pt-3 pb-0">
              <div className="d-inline-block text-muted align-middle mr-3 mt-1">
                Last Updated: {this.date.toLocaleString()}
              </div>
              <img
                onClick={() => this.loadTBRefs()}
                className="align-middle float-right"
                style={{ width: "40px", cursor: "pointer" }}
                src={icon_refresh}
              />
            </div>
          </div>
          <div className="row pr-5 pt-3 pl-4">
            {this.state.TBRef.length > 0 ? (
              this.state.TBRef.map((TBRef, i) => (
                <div
                  className="col-3 p-2"
                  onClick={() => this.setState({ selectedTBRef: TBRef })}
                >
                  <img
                    className="w-100 rounded-top box-shadow grid-img"
                    style={{ maxHeight: "300px" }}
                    src={"data:" + TBRef.type + ";base64," + TBRef.image}
                  />
                  <div className="rounded-bottom bg-light text-dark font-weight-bold text-center p-3 border">
                    TBref {TBRef.id.slice(16).toUpperCase()}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 text-muted">
                There are no TBRefs currently ready for diagnosis
              </div>
            )}
          </div>
        </>
      );
    }
  }
}
