import React, {useState, useEffect} from "react"
import store from "../../state-manegment/store"
import {useHistory, Link} from "react-router-dom"
import loginFormSchema from './Validation/loginFormSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
    username: '',
    password: '',
}

const initialFormErrors = {
    username: '',
    password: '',
}

const initialLogins = []
const initialDisabled = true

const UserLogin = () => {

    const [logins, setLogins ] = useState(initialLogins)
    const [ formValues, setFormValues ] = useState(initialFormValues)
    const [ formErrors, setFormErrors ] = useState(initialFormErrors)
    const [ disabled, setDisabled ] = useState(initialDisabled)

    const { push } = useHistory()

    // Below is just sample API to make sure everything is working as intended
    const getLogins = () => {
        axios.get('https://reqres.in/api/users')
          .then(res => {
            setLogins(res.data.data)
          })
          .catch(err => {
            debugger
          })
      }

      const postNewLogin = newLogin => {

        axios.post('https://reqres.in/api/users', newLogin)
          .then(res => {
            setLogins([...logins, res.data])
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
            .reach(loginFormSchema, name)
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

        const newLogin = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
        }
        console.log(newLogin)
        postNewLogin(newLogin)
      }

      useEffect(() => {
        getLogins()
    }, [])

    useEffect(() => {
        loginFormSchema.isValid(formValues)
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
        const {name, value } = evt.target
        inputChange(name, value)
    }

    return(
        <div className='userLogin__container'>
            <form onSubmit={onSubmit}>
                <label>Username:&nbsp;
                    <input
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={formValues.username}
                    onChange={onInputChange}
                    />
                </label>

                <label>Password:&nbsp;
                    <input 
                    name='password'
                    type='password'
                    placeholder='Enter Password'
                    value={formValues.password}
                    onChange={onInputChange}

                    />

                </label>
                <button lassName='submitBtn'>Login</button>
                <div className='errors'>
                    <p>{formErrors.username}</p>
                    <p>{formErrors.password}</p>
                </div>
            </form>
            <p>Don't have an account? <Link to='/UserRegister'>Register Here</Link></p>
            <p>Are you a food truck operator? Login <Link to='/AdminLogin'>here</Link></p>
        </div>
    )
}

export default UserLogin;


