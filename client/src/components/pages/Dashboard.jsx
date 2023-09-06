import React, { Component } from "react";
import NavBar from "../organisms/NavBar";
import TopBar from "../molecules/TopBar";
import CardView from "../organisms/CardView";
import Upload from "../atoms/Upload";
import ConsultCard from "../organisms/ConsultCard";
import TBRefsGrid from "../organisms/TBRefsGrid";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: localStorage.getItem("userType"),
      isNextStep: false,
      isUploaded: false,
      loading: true,
      results: {},
    };
  }

  handleUpload(results) {
    this.setState({
      results: results,
      isUploaded: true,
      isRequested: false,
      isNextStep: false,
    });
  }

  componentDidMount() {
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
        if (response.length == 0) {
          this.setState({ loading: false, isUploaded: false });
        } else {
          this.setState({
            results: { TBRef: response[0] },
            isUploaded: true,
            loading: false,
            isNextStep: response[0].doctorDiagnosis,
            isRequested: response[0].doctorRequested,
          });
        }
      }
      if (event.target.status === 400 || event.target.status === 500) {
        console.log("err");
      }
    };
  }

  requestDerm() {
    var request = new XMLHttpRequest();
    request.open("POST", "/api/TBRef/request-doctor");
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        TBId: this.state.results.TBRef.id,
      })
    );
    request.onreadystatechange = (event) => {
      if (
        event.target.readyState === 4 &&
        event.target.status === 200 &&
        event.target.responseText
      ) {
        const response = JSON.parse(event.target.responseText);
        this.setState({ isRequested: true });
      }
      if (event.target.status === 400 || event.target.status === 500) {
        this.setState({ isRequested: true });
        console.log("err");
      }
    };
  }

  render() {
    return (
      <div>
        <TopBar userType={this.state.userType} />
        <div className="row" style={{ overflow: "scroll !important" }}>
          <div className="col-2 p-0" style={{ height: "calc(100vh - 83px)" }}>
            <NavBar userType={this.state.userType} />
          </div>

          <div className="col-10 bg-white">
            {this.state.userType === "client" ? (
              <div className="row">
                <div className="col-3 pt-4 pr-0 pl-4">
                  <Upload
                    toggleLoading={() =>
                      this.setState({
                        loading: !this.state.loading,
                        isUploaded: false,
                      })
                    }
                    handleUpload={(response) => this.handleUpload(response)}
                  />
                </div>
                <div className="col-9 px-4">
                  {!this.state.isNextStep ? (
                    <>
                      {this.state.isUploaded ? (
                        <CardView
                          isRequested={this.state.isRequested}
                          requestDerm={() => this.requestDerm()}
                          results={this.state.results}
                          nextStep={() => this.setState({ isNextStep: true })}
                        />
                      ) : (
                        <>
                          {this.state.loading ? (
                            <div className="m-4">
                              <div className="loading"></div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  ) : this.state.loading ? (
                    <div className="m-4">
                      <div className="loading"></div>
                    </div>
                  ) : (
                    <ConsultCard results={this.state.results}></ConsultCard>
                  )}
                </div>
              </div>
            ) : this.state.userType === "student" ? (
              <TBRefsGrid allowDiag={false} />
            ) : (
              <TBRefsGrid allowDiag={true} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
