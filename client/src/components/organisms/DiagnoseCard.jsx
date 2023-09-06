import React from "react";
import icon_back from "../../assets/icons/back.png";
export default class TBRefsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      TBRef: this.props.TBRef,
      condition: "Normal",
      confidence: 0,
    };
  }

  componentDidMount() {}

  sendDiagnosis() {
    this.setState({ loading: true });
    var request = new XMLHttpRequest();
    request.open("POST", "/api/TBRef/diagnose");
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        TBId: this.state.TBRef.id,
        diagnosis: {
          condition: this.state.condition,
          confidence: this.state.confidence,
        },
      })
    );
    request.onreadystatechange = (event) => {
      if (
        event.target.readyState === 4 &&
        event.target.status === 200 &&
        event.target.responseText
      ) {
        const response = JSON.parse(event.target.responseText);
        this.setState({ loading: false, sentDiagnosis: true });
      }
      if (event.target.status === 400 || event.target.status === 500) {
        this.setState({ loading: false });
      }
    };
  }

  render() {
    let { TBRef } = this.props;
    console.log(TBRef);
    return (
      <>
        <div
          className="btn btn-secondary mx-3 mt-4"
          onClick={this.props.goBack}
        >
          <img
            style={{ marginTop: "-3px" }}
            className="iconFormat mr-2 align-middle"
            src={icon_back}
          />
          <span className="align-top">Back to all TBRefs</span>
        </div>
        <div className="row">
          <div className="col-9 bg-white rounded box-shadow p-4 border m-4">
            <div className="row border-bottom p-4">
              <span className="h3 color-purple">
                TBRef #{TBRef.id.slice(18).toUpperCase()}
              </span>
            </div>
            <div className="row">
              <div className="col-5 p-4">
                <img
                  className="w-100 box-shadow rounded"
                  src={"data:" + TBRef.type + ";base64," + TBRef.image}
                />
              </div>
              <div className="col-7 p-4">
                <div className="text-muted">TBRef AI Major Prediction:</div>
                <div className="color-purple h2">
                  {TBRef.aiDiagnosis.condition || "N/A"}
                </div>
                <div className="text-dark">
                  Confidence: {parseInt(TBRef.aiDiagnosis.confidence * 100)}%
                </div>
                <div className="bg-light rounded p-3 mt-4 w-auto">
                  {!this.state.loading ? (
                    this.state.sentDiagnosis ? (
                      <div className="p-5 text-success font-weight-bold">
                        Your diagnosis has been submitted.
                      </div>
                    ) : (
                      <>
                        <div className="text-dark h4">Your Diagnosis:</div>
                        <select
                          className="custom-select align-middle pl-2 py-1 w-50 mt-2"
                          onChange={(e) =>
                            this.setState({ condition: e.target.value })
                          }
                        >
                          <option value="Tuberculosis">Tuberculosis</option>
                          <option value="Normal">Normal</option>
                        </select>
                        <input
                          type="number"
                          className="mt-2 form-control w-50"
                          onChange={(e) =>
                            this.setState({ confidence: e.target.value })
                          }
                          placeholder="Confidence (%)"
                        />
                        <div
                          onClick={() => this.sendDiagnosis()}
                          className="btn-primary btn btn-lg mt-3"
                        >
                          Submit Diagnosis
                        </div>
                      </>
                    )
                  ) : (
                    <div className="p-5">
                      <div className="loading"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
