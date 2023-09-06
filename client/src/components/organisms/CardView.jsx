import React, { Component } from "react";
import fillerimg from "../../assets/fillerimg.png";

class CardView extends Component {
  state = {};

  render() {
    //console.log(this.props.results.TBRef);
    let condition = this.props.results.TBRef.aiDiagnosis.condition;
    //console.log(condition);
    return (
      <div className="row pr-5 pt-2">
        <div className="col-md-12">
          <div className="card mr-3 mt-3 pb-3 w-100">
            <div className="card-header cardTitle">
              TBRef #{this.props.results.TBRef.id.slice(18).toUpperCase()}
            </div>
            <div className="row mt-4 ml-4 mb-0 pb-0">
              <div className="col-5 m-0 px-4 mb-3">
                <img
                  className="cardImg img-thumbnail"
                  style={{ width: "100%" }}
                  src={
                    "data:" +
                    this.props.results.TBRef.type +
                    ";base64," +
                    this.props.results.TBRef.image
                  }
                ></img>
              </div>
              <div className="col-5 text-left mt-0 pb-0">
                <div className="row">
                  <p className="firstCardText m-0">
                    TBRef AI Major Prediction:
                  </p>
                </div>
                <div className="row secondCardText my-3">
                  <div className="col-12 p-0">
                    {this.props.results.TBRef.aiDiagnosis.condition || "N/A"}
                  </div>
                  <div className="text-muted h6 col-12 px-0 pt-2">
                    {Math.round(
                      parseFloat(
                        this.props.results.TBRef.aiDiagnosis.confidence
                      ) * 100
                    )}
                    % confidence
                  </div>
                </div>
                <div className="row thirdCardText">
                  <a
                    href={
                      condition === "Tuberculosis"
                        ? "https://en.wikipedia.org/wiki/Tuberculosis"
                        : "https://www.who.int/tb/publications/Radiography_TB_factsheet.pdf"
                    }
                  >
                    <button type="button" class="btn btn-secondary btnText">
                      Read more about this condition
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mt-3 mb-1">
              <p className="col-12 text-center mx-auto h6 text-dark">
                Where to go from here?
              </p>
            </div>
            <div className="row ml-5 mr-5 cardbox">
              <div className="row col">
                <div className="col-6 pt-3 text-center">
                  <button
                    disabled={this.props.isRequested}
                    onClick={this.props.requestDerm}
                    type="button"
                    style={{ background: "#fc8766" }}
                    class="btn text-white btn-lg btnText"
                  >
                    {this.props.isRequested
                      ? "Consultation Requested"
                      : "Ask A Local Derm"}
                  </button>
                  <p className="smallButtonText pt-2 text-center">
                    3.99/Consult
                  </p>
                </div>
                <div className="col-6 mt-3 text-center">
                  <button type="button" class="btn btn-primary btn-lg btnText">
                    Upload to 1mg
                  </button>
                  <p className="smallButtonText pt-2 text-center">
                    Transfer To 1mg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardView;
