import React, { Component } from "react";
import fillerimg from "../../assets/fillerimg.png";
import icon_back from "../../assets/icons/back.png";

class CardViewOnly extends Component {
  state = {};

  render() {
    //console.log(this.props.results.TBRef);
    let condition = this.props.results.TBRef.aiDiagnosis.condition;
    //console.log(condition);
    return (
      <div className="row pr-5 pt-2">
        <div className="btn btn-secondary mx-3 " onClick={this.props.goBack}>
          <img
            style={{ marginTop: "-3px" }}
            className="iconFormat mr-2 align-middle"
            src={icon_back}
          />
          <span className="align-top">Back to all TBRefs</span>
        </div>
        <div className="col-md-12">
          <div className="card mr-3 mt-1 pb-3 w-100">
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
          </div>
        </div>
      </div>
    );
  }
}

export default CardViewOnly;
