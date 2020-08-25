import React, { useState, useEffect } from "react"
import {useHistory, Link} from "react-router-dom"
import * as yup from 'yup'
import registerFormSchema from './Validation/registerFormSchema'
import axios from 'axios'
import styles from './UserStyles/UserRegister.css'

const initialFormValues = {
    newUsername: '',
    email: '',
    newPassword: '',
    location: '',
}

const initialFormErrors = {
    newUsername: '',
    email: '',
    newPassword: '',
    location: '',
}

const initialRegistrations = []
const initialDisabled = true


const UserRegister = (props) => {

    const [registrations, setRegistrations ] = useState(initialRegistrations)
    const [ formValues, setFormValues ] = useState(initialFormValues)
    const [ formErrors, setFormErrors ] = useState(initialFormErrors)
    const [ disabled, setDisabled ] = useState(initialDisabled)

    const {push} = useHistory()

    // Below is just sample API to make sure everything is working as intended
    const getRegistrations = () => {
        axios.get('https://reqres.in/api/users')
          .then(res => {
            console.log(res.data)
            setRegistrations(res.data.data)
          })
          .catch(err => {
            debugger
          })
      }

      const postNewRegistration = newRegistration => {

        axios.post('https://reqres.in/api/users', newRegistration)
          .then(res => {
            setRegistrations([...registrations, res.data])
          })
          .catch(err => {
            debugger
          })
          .finally(() => {
            setFormValues(initialFormValues)
          })
      }

      const inputChange = (name, value) => {

        yup
            .reach(registerFormSchema, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })

            setFormValues({
                ...formValues,
                [name]: value
            })

      }

      const submit = () => {

        const newRegistration = {
            newUsername: formValues.newUsername.trim(),
            email: formValues.email.trim(),
            newPassword: formValues.newPassword.trim(),
            location: formValues.location.trim(),
        }
        console.log(newRegistration)
        postNewRegistration(newRegistration)
      }

      useEffect(() => {
          getRegistrations()
      }, [])

      useEffect(() => {
          registerFormSchema.isValid(formValues)
            .then(valid => {
                setDisabled(!valid)
            })
      }, [formValues])

    

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
        push("/Hello")
    }

    const onInputChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    return(
        <div className='userRegister__container'>
            <form onSubmit={onSubmit} >
                <h3>Register a New Account</h3>
                <div className='form-inputs'>
                    <label>Username
                        <input 
                        name='newUsername'
                        type='text'
                        placeholder='Enter Username'
                        onChange={onInputChange}
                        value={formValues.newUsername}
                        />
                    </label>

                    <label>Email
                        <input 
                        name='email'
                        type='email'
                        placeholder='Enter email'
                        onChange={onInputChange}
                        value={formValues.email}
                        />

                    </label>

                    <label>Password
                        <input
                        name='newPassword'
                        type='password'
                        placeholder='Enter Password'
                        value={formValues.newPassword}
                        onChange={onInputChange}
                        />
                    </label>

                    <label>Your Location
                        <input
                        name='location'
                        type='text'
                        placeholder='Location'
                        value={formValues.location}
                        onChange={onInputChange}
                        />
                    </label>
                    </div>
                <button className='submitBtn' disabled={disabled}>Register</button> 
                <div className='errors'>
                    <p>{formErrors.newUsername}</p>
                    <p>{formErrors.email}</p>
                    <p>{formErrors.newPassword}</p>
                    <p>{formErrors.location}</p>
                </div>
            </form>
            <p>Already have an account? Login <Link to='/UserLogin'>here</Link></p>
        </div>
    )
}

export default UserRegister;