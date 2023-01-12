import './App.css';
import Form from './Form';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tos: false,
}

const initialErrorValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tos: ''
}

const formSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First Name is required.")
    .min(3, 'First Name must be a minimum of three characters'),
  lastName: yup
    .string()
    .trim()
    .required("Last Name is required.")
    .min(3, 'Last Name must be a minimum of three characters'),
  email: yup
    .string()
    .email('must be a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required("Password is required."),
  tos: yup.boolean().oneOf([true], 'This field must be checked')
})

function App() {
  const [userData, setUserData] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(initialErrorValues)
  const [disabled, setDisabled] = useState(true)

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setError({ ...error, [name]: '' }))
      .catch((err) => setError({ ...error, [name]: err.errors[0] }))
  }



  const manageState = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value })
  }

  const postForm =(formData)=>{
        axios.post('https://reqres.in/api/users',formData)
    .then(res=>{
      console.log(res);

    })
    .catch(err=> console.error(err))
    .finally(()=>{
       setFormValues(initialFormValues)
    })
  }

  const submitMyForm = (data) => {
    const { firstName, lastName, email, password, tos } = formValues;
    const trimmedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      tos: tos
    }

    setUserData([...userData, trimmedData])
    postForm(trimmedData)

  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  return (
    <div className="App">

      <Form values={formValues} manageState={manageState} submitMyForm={submitMyForm} disabled={disabled} error={error} />
      <br />

      <h2>User Data</h2>
      {userData.map((each, idx) => {
        return (<div key={idx}>
          <ul>
            <li>{each.firstName}</li>
            <li>{each.lastName}</li>
            <li>{each.email}</li>
          </ul>


        </div>)
      })}
    </div>
  );
}

export default App;
