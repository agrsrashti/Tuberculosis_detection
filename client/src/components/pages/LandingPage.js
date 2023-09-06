import React from "react";
import landingImg from "../../assets/aiDOC.jpg";
import logo from "../../assets/logoTB-blue.png";
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  setUserType(type) {
    localStorage.setItem("userType", type);
  }

  render() {
    return (
      <div className="row m-0 p-0 h-100 bg-blue">
        <div
          className="col-6 landing-bg"
          style={{ backgroundImage: "url(" + landingImg + ")" }}
        ></div>
        <div className="col-6 rounded bg-purple my-auto">
          <div className="w-50 mx-auto mb-5 mt-2">
            <img src={logo} className="w-100" />
          </div>
          <div className="d-none text-dark font-weight-bold h5 text-center mb-4">
            I am a...
          </div>
          <div className="w-50 mx-auto">
            <a href="/login">
              <div
                onClick={() => this.setUserType("client")}
                className="p-3 rounded font-weight-bold mb-3 bg-orange text-center landing-btn"
              >
                Client
              </div>
            </a>
            <a href="/login">
              <div
                onClick={() => this.setUserType("doctor")}
                className="p-3 rounded font-weight-bold mb-3 bg-orange text-center landing-btn"
              >
                Medical Professional
              </div>
            </a>
            <a href="/login">
              <div
                onClick={() => this.setUserType("student")}
                className="p-3 rounded font-weight-bold bg-orange text-center landing-btn mb-2"
              >
                Student / Educator
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
