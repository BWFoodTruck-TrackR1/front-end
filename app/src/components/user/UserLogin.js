import React from "react"
import store from "../../state-manegment/store"
import {useSelector} from "react-redux"
import {useHistory, Link} from "react-router-dom"

import {valueChanger, valueClearing} from "../../state-manegment/foodTruckReducer"


const UserLogin = () => {
    const login = useSelector(state => state.login)
    console.log(login)

    const {push} = useHistory()

    const valueUpdate = (event) => {
        const {name, value} = event.target
        store.dispatch(valueChanger(value,name))
    }

    const submit = (event) => {
        event.preventDefault()
        console.log("submitting!!!!!")
        store.dispatch(valueClearing())
        push("/Hello")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="username">
                Username
                <div>
                <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Your Username"
                value={login.username}
                onChange={valueUpdate}
                 />
                </div>
                    
                </label>

                <label htmlFor="password">
                Password
                <div>
                <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={login.password}
                onChange={valueUpdate}
                 />
                </div>
                    
                </label>
                <button type="submit">Login!</button>
            </form>
            dont have an accout? <Link to="/UserRegister" >
                register
            </Link>
            
        </div>
    )
}

export default UserLogin