import React from "react"
import {useSelector} from "react-redux"
import {useHistory, Link} from "react-router-dom"

import store from "../../state-manegment/store"
import {valueChanger, valueClearing} from "../../state-manegment/foodTruckReducer"


// const UserRegister = () => {
//     const register = useSelector(state=> state.register)
//     console.log(register)

//     const {push} = useHistory()

//     const valueUpdate = (event) => {
//         const {name, value} = event.target
//         store.dispatch(valueChanger(value, name))
//     }

//     const submit = (event) => {
//         event.preventDefault()
//         console.log("submitting!!!!!")
//         store.dispatch(valueClearing())
//         push("/Hello")
//     }

//     return (
//         <div>
//            <form onSubmit={submit}>
//                <label htmlFor="usernameR">
//                Username
//                <div>
//                <input
//                 type="text"
//                 name="usernameR"
//                 id="usernameR"
//                 placeholder="Enter Your Username"
//                 value={register.usernameR}
//                 onChange={valueUpdate}
//                 />
//                </div>
//                </label>


//                <label htmlFor="email">
//                 Email
//                <div>
//                <input
//                type="text"
//                name="email"
//                id="email"
//                placeholder="Enter Your Email"
//                value={register.email}
//                onChange={valueUpdate}
//                 />
//                </div>
//                </label>

//                <label htmlFor="passwordR">
//                Password
//                <div>
//                <input
//                 type="text"
//                 name="passwordR"
//                 id="passwordR"
//                 placeholder="Enter Your Password"
//                 value={register.passwordR}
//                 onChange={valueUpdate}
//                 />
//                </div>
//                </label>

//                <label htmlFor="confirmPassword">
//                Confirm Your Password
//                <div>
//                <input
//                type="text"
//                name="confirmPassword"
//                id="confirmPassword"
//                placeholder="Confrim Your Password"
//                value={register.confirmPassword}
//                onChange={valueUpdate}
//                 />
//                </div>
//                </label>
//                <button type="submit">Register !</button>
              
//            </form>
//         </div>
//     )
// }

// export default UserRegister

const UserRegister = () => {

    return(
        <div className='userRegister__container'>
            <form>
                <h3>Register a New Account</h3>
                <label>Username:&nbsp;
                    <input 
                    name='newUsername'
                    type='text'
                    id='newUsername'
                    placeholder='Enter Username'
                    
                    />
                </label>

                <label>Password:&nbsp;
                    <input
                    name='newPassword'
                    type='password'
                    id='newPassword'
                    placeholder='Enter Password'

                    />
                </label>

                <label>Confirm Password: &nbsp;
                    <input
                    name='confirmPassword'
                    type='password'
                    id='confirmPassword'
                    placeholder='Re-enter Password'
                    />
                </label>

                <label>Your Location:&nbsp;
                    <input
                    name='location'
                    type='text'
                    id='location'
                    placeholder='Location'
                    />
                </label>
                <button className='submitBtn'>Register</button>
            </form>
            <p>Already have an account? Login <Link to='/UserLogin'>here</Link></p>
        </div>
    )
}

export default UserRegister;