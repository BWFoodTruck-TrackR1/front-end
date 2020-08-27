import React from "react"
import {useHistory} from "react-router-dom"
import { Button} from "semantic-ui-react";

const Logout = () => {
    const {push} = useHistory()
    const clickHandler = () =>{
        localStorage.clear()
        push("/AdminLogin")
    }
    return(
        <div>
            <Button className="red" onClick={clickHandler}>Logout</Button>
        </div>
    )
}

export default Logout