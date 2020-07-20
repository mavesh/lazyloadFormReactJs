import React from "react";
import HookSignUpForm from "./HookSignUpForm";
// import "./ContactForm.css";

const errorMessage = {
  name: "nameError",
  email: "emailError",
  mobileNumber: "mobileError",
  address: "addressError",
  gender: "genderError",
  pinCode: "pinCodeError",
};

const fruits = [
  { value: "mango", label: "Mango", isdisabled: false },
  { value: "apple", label: "Apple", isdisabled: true },
  { value: "orange", label: "Orange", isdisabled: false },
  { value: "banana", label: "Banana", isdisabled: false },
  { value: "grapes", label: "Grapes", isdisabled: false },
];

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

class ContactForm extends React.Component {
  initializeState() {
    return {
      name: "",
      email: "",
      mobileNumber: "",
      address: "",
      pinCode: "",
      gennder: "",
      city: "",
      favoriteFruit: "",
      errors: {
        nameError: "",
        emailError: "",
        mobileError: "",
        addressError: "",
        pinCodeError: "",
        genderError: "",
        blnIsFormvalid: false,
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.submitForm = this.submitForm.bind(this);
    this.changeFormFields = this.changeFormFields.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeFruits = this.changeFruits.bind(this);
    this.fruitsList = fruits;
  }

  isFormValid(event) {
    const state = { ...this.state };
    if (
      event &&
      event.target.name === "name" &&
      !(event.target.value.length > 5)
    ) {
      state["errors"]["nameError"] = "Name character must be greater than 5";
      this.setState(state);
    } else if (
      event &&
      event.target.name === "email" &&
      !emailPattern.test(event.target.value)
    ) {
      state["errors"]["emailError"] =
        "email should be in this format 'abc@gmail.com'";
      this.setState(state);
    } else if (
      event &&
      event.target.name === "mobileNumber" &&
      !(event.target.value.length === 10)
    ) {
      state["errors"]["mobileError"] = "mobile number should be 10 digits";
      this.setState(state);
    } else if (
      event &&
      event.target.name === "address" &&
      !event.target.value.length
    ) {
      state["errors"]["addressError"] = "address required";
      this.setState(state);
    } else if (
      event &&
      event.target.name === "pinCode" &&
      !(event.target.value.length === 6)
    ) {
      state["errors"]["pinCodeError"] = "pin code number should be 6 digits";
      this.setState(state);
    } else if (
      event &&
      event.target.name === "gender" &&
      !event.target.checked
    ) {
      state["errors"]["genderError"] = "*please select gender";
      this.setState(state);
    } else {
      this.removeErrorMessage(errorMessage[event.target.name]);
    }
    setTimeout(() => {
      this.checkAllFieldIsValid();
    }, 100);
  }

  checkAllFieldIsValid() {
    const state = { ...this.state };
    let blnIsFormvalid = false;
    const formKeysList = Object.keys(errorMessage);
    for (let key of formKeysList) {
      if (!state[key]) {
        blnIsFormvalid = false;
        break;
      } else if (state["errors"][errorMessage[key]] !== "") {
        blnIsFormvalid = false;
        break;
      } else {
        blnIsFormvalid = true;
      }
    }
    state["errors"]["blnIsFormvalid"] = blnIsFormvalid;
    this.setState(state);
  }

  removeErrorMessage(errorMessageState) {
    const state = { ...this.state };
    state["errors"][errorMessageState] = "";
    this.setState(state);
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

  changeGender(event) {
    this.setState({ gender: event.target.value });
  }

  changeFruits(event) {
    this.setState({ favoriteFruit: event.target.value });
  }

  submitForm(event) {
    console.log("Name: ", this.state);
    this.setState(this.initializeState());
    event.preventDefault();
  }

  componentDidMount() {
    this.inputValue.focus();
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="main-container">
        <div className="form-container">
          <h1>Sign Up</h1>
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
              {this.state.errors.nameError && (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {this.state.errors.nameError}
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
                {this.state.errors.emailError}
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
                {this.state.errors.mobileError}
              </span>
            </label>{" "}
            <br />
            <label>
              Address:
              <input
                type="text"
                name="address"
                maxLength="200"
                value={this.state.address}
                onChange={this.changeFormFields}
              />
              <span style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.addressError}
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
                {this.state.errors.pinCodeError}
              </span>
            </label>{" "}
            <br />
            <label>
              Gender: &nbsp; &nbsp; Male
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={this.changeFormFields}
              />
              &nbsp; &nbsp; Female
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={this.changeFormFields}
              />
              <span style={{ color: "red", fontSize: "10px" }}>
                {this.state.errors.genderError}
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
            <label>
              Select Your Favorite Fruits:
              <select
                value={this.state.favoriteFruit}
                onChange={this.changeFruits}
              >
                {this.fruitsList.map((fruitItem) => (
                  <option
                    key={fruitItem.value}
                    value={fruitItem.label}
                    disabled={
                      this.state.gender === "Male"
                        ? fruitItem.value === this.fruitsList[1]["value"]
                          ? true
                          : false
                        : false
                    }
                  >
                    {fruitItem.value}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <input
              type="submit"
              value="Submit"
              className={!this.state.errors.blnIsFormvalid ? "disabled" : ""}
            />
          </form>
        </div>
        <HookSignUpForm />
        {/* <HookSignUpForm /> */}
      </div>
    );
  }
}

export default ContactForm;
