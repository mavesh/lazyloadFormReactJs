import React from "react";
import "./ContactForm.css";

const errorMessage = {
  name: "nameError",
  email: "emailError",
  mobileNumber: "mobileError",
  pinCode: "pinCodeError",
};

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobileNumber: "",
      pinCode: "",
      city: "",
      nameError: "",
      emailError: "",
      mobileError: "",
      pinCodeError: "",
      blnIsFormvalid: false,
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeFormFields = this.changeFormFields.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  isFormValid(event) {
    if (
      event &&
      event.target.name === "name" &&
      !(event.target.value.length > 5)
    ) {
      this.setState({
        nameError: "Name character must be greater than 5",
      });
    } else if (
      event &&
      event.target.name === "email" &&
      !emailPattern.test(event.target.value)
    ) {
      this.setState({
        emailError: "email should be in this format 'abc@gmail.com'",
      });
    } else if (
      event &&
      event.target.name === "mobileNumber" &&
      !(event.target.value.length === 10)
    ) {
      this.setState({
        mobileError: "mobile number should be 10 digits",
      });
    } else if (
      event &&
      event.target.name === "pinCode" &&
      !(event.target.value.length === 6)
    ) {
      this.setState({
        pinCodeError: "pin code number should be 6 digits",
      });
    } else {
      this.removeErrorMessage(errorMessage[event.target.name]);
    }
    setTimeout(() => {
      this.checkAllFieldIsValid();
    }, 100);
  }

  checkAllFieldIsValid() {
    let blnIsFormvalid = false;
    const formKeysList = Object.keys(errorMessage);
    for (let key of formKeysList) {
      if (!this.state[key]) {
        blnIsFormvalid = false;
        break;
      } else if (this.state[errorMessage[key]] !== "") {
        blnIsFormvalid = false;
        break;
      } else {
        blnIsFormvalid = true;
      }
    }
    this.setState({ blnIsFormvalid });
    console.log("blnIsFormvalid", blnIsFormvalid);
  }

  removeErrorMessage(errorMessageState) {
    this.setState({
      [errorMessageState]: "",
    });
  }

  changeFormFields(event) {
    this.isFormValid(event);
    event.target.value =
      event.target.name === "mobileNumber"
        ? event.target.validity.valid
          ? event.target.value
          : this.state.mobileNumber
        : event.target.name === "pinCode"
        ? event.target.validity.valid
          ? event.target.value
          : this.state.pinCode
        : event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  }

  changeCity(event) {
    this.setState({ city: event.target.value });
  }

  submitForm(event) {
    console.log("Name: ", this.state);
    this.setState({
      name: "",
      email: "",
      mobileNumber: "",
      pinCode: "",
      city: "",
      nameError: "",
      emailError: "",
      mobileError: "",
      pinCodeError: "",
    });
    event.preventDefault();
  }

  componentDidMount() {
    this.inputValue.focus();
  }

  render() {
    return (
      <div className="form-container">
        <h1>Contact Form</h1>
        <form onSubmit={this.submitForm}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.changeFormFields}
              ref={(input) => (this.inputValue = input)}
            />
            {this.state.nameError && (
              <span style={{ color: "red", fontSize: "10px" }}>
                {this.state.nameError}
              </span>
            )}
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.changeFormFields}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.emailError}
            </span>
          </label>{" "}
          <br />
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              maxLength="10"
              pattern="[0-9]*"
              value={this.state.mobileNumber}
              onChange={this.changeFormFields}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.mobileError}
            </span>
          </label>{" "}
          <br />
          <label>
            Pin Code:
            <input
              type="text"
              name="pinCode"
              maxLength="6"
              pattern="[0-9]*"
              value={this.state.pinCode}
              onChange={this.changeFormFields}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.pinCodeError}
            </span>
          </label>{" "}
          <br />
          <label>
            Select Your City:
            <select value={this.state.city} onChange={this.changeCity}>
              <option value="Delhi">Delhi</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Noida">Noida</option>
            </select>
          </label>
          <br />
          <input
            type="submit"
            value="Submit"
            className={!this.state.blnIsFormvalid ? "disabled" : ""}
          />
        </form>
      </div>
    );
  }
}

export default ContactForm;
