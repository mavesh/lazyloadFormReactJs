import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const fruitsList = [
  { value: "mango", label: "Mango", isDisabled: false },
  { value: "apple", label: "Apple", isDisabled: false },
  { value: "orange", label: "Orange", isDisabled: false },
  { value: "banana", label: "Banana", isDisabled: false },
  { value: "grapes", label: "Grapes", isDisabled: false },
];

const cities = [
  { value: "Delhi", label: "Delhi" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Noida", label: "Banana" },
  { value: "Gurgaon", label: "Gurgaon" },
];
let isDisabled = false;

function HookSignUpForm() {
  const [fruits, setFruits] = useState(fruitsList);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { register, handleSubmit, watch, setValue, errors } = useForm();

  useEffect(() => {
    register({
      required: true,
      name: "favoriteFruit",
    });
    register({
      required: true,
      name: "city",
    });
  }, [register]);

  const changeSelectedFruit = (selectedFruit, inputRef) => {
    if (selectedFruit) {
      setValue(inputRef.name, selectedFruit.value);
      setSelectedFruit(selectedFruit);
    } else if (inputRef.action === "clear") {
      setValue(inputRef.name, null);
      setSelectedFruit(null);
    }
  };

  const changeSelectedCity = (selectedCity, inputRef) => {
    if (selectedCity) {
      setValue(inputRef.name, selectedCity.value);
      setSelectedCity(selectedCity);
    } else if (inputRef.action === "clear") {
      setValue(inputRef.name, null);
      setSelectedCity(null);
    }
  };

  const onSubmit = (formData) => {
    console.log("formData", formData);
  };

  const changePhoneNumber = (event) => {
    event.target.value =
      event.target.name === "mobileNumber"
        ? event.target.validity.valid
          ? event.target.value
          : null
        : event.target.name === "pinCode"
        ? event.target.validity.valid
          ? event.target.value
          : null
        : event.target.value;
  };

  const changeGenderSelection = (event) => {
    // reset the selected fruit option when gender change
    if (watch("favoriteFruit") && watch("favoriteFruit").length) {
      setValue("favoriteFruit", null);
      setSelectedFruit(null);
    }
    if (event && event.target.value === "Male") {
      fruits[1]["isDisabled"] = true;
      setFruits([...fruits]);
      isDisabled = true; // when the key is changing then component will render again
    } else {
      fruits[1]["isDisabled"] = false;
      setFruits([...fruits]);
      isDisabled = false; // when the key is changing then component will render again
    }
  };
  return (
    <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up Form Using Hook</h1>
        <label>
          Name
          <input
            type="text"
            name="name"
            ref={register({
              required: {
                value: true,
                message: "*name is required",
              },
              minLength: {
                value: 5,
                message: "*name should be minimum length of 5",
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            name="email"
            ref={register({
              required: {
                value: true,
                message: "*email is required",
              },
              pattern: {
                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: "*email should be in this format 'abc@gmail.com'",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </label>
        <br />
        <label>
          Mobile Number
          <input
            type="text"
            name="mobileNumber"
            pattern="[0-9]*"
            onChange={changePhoneNumber}
            ref={register({
              required: {
                value: true,
                message: "*mobile number is required",
              },
              maxLength: {
                value: 10,
                message: "*mobile number maximum should be 10 digits",
              },
            })}
          />
          {errors.mobileNumber && errors.mobileNumber.type === "required" && (
            <span style={{ color: "red" }}>{errors.mobileNumber.message}</span>
          )}
          {errors.mobileNumber && errors.mobileNumber.type === "maxLength" && (
            <span style={{ color: "red" }}>{errors.mobileNumber.message}</span>
          )}
        </label>
        <br />
        <label>
          Address
          <input
            type="text"
            name="address"
            ref={register({
              required: {
                value: true,
                message: "*address is required",
              },
              maxLength: {
                value: 200,
                message: "*address should be maximum length of 200",
              },
            })}
          />
          {errors.address && errors.address.type === "required" && (
            <span style={{ color: "red" }}>{errors.address.message}</span>
          )}
          {errors.address && errors.address.type === "maxLength" && (
            <span style={{ color: "red" }}>{errors.address.message}</span>
          )}
        </label>
        <br />
        <label>
          Pin Code
          <input
            type="text"
            name="pinCode"
            pattern="[0-9]*"
            onChange={changePhoneNumber}
            ref={register({
              required: {
                value: true,
                message: "*pin code is required",
              },
              maxLength: {
                value: 6,
                message: "*pin code maximum should be 6 digitss",
              },
            })}
          />
          {errors.pinCode && errors.pinCode.type === "required" && (
            <span style={{ color: "red" }}>{errors.pinCode.message}</span>
          )}
          {errors.pinCode && errors.pinCode.type === "maxLength" && (
            <span style={{ color: "red" }}>{errors.pinCode.message}</span>
          )}
        </label>
        <br />
        <label>
          Gender: &nbsp; &nbsp; Male
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={changeGenderSelection}
            ref={register({ required: true, message: "please select gender" })}
          />
          &nbsp; &nbsp; Female
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={changeGenderSelection}
            ref={register({ required: true, message: "please select gender" })}
          />
        </label>{" "}
        <br />
        <label>
          Select Your City
          <Select
            name="city"
            className="select-box"
            value={selectedCity}
            ref={register}
            onChange={(selected, action) => {
              changeSelectedCity(selected, action);
            }}
            options={cities}
            isClearable={true}
            isSearchable={true}
          />
        </label>
        <br />
        <label>
          Select Your Favorite Fruits:
          <Select
            key={isDisabled}
            name="favoriteFruit"
            className="select-box"
            value={selectedFruit}
            onChange={(selected, action) => {
              changeSelectedFruit(selected, action);
            }}
            options={fruits}
            isClearable={true}
            isSearchable={true}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default HookSignUpForm;
