import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {axiosCAllTodo,valueClearing} from "../state-manegment/foodTruckReducer"
import store from "../state-manegment/store"
import {useAdminForm} from "../hooks/useAdminForm"
import {axiosWithAuth} from "../utils/axiosWithAuth"
import { Button, Form} from "semantic-ui-react"

const Todos = () => {
    const {id} = useParams()
    const todos = useSelector(state=>state.todos)
    const [state, valueUpdate] = useAdminForm()
    const addTodo = state.addTodo
    const updaTodo = state.updaTodo
    const [updateToggle, setUpdateToggle] =useState(0)
    const [completeToggle, setCompleteToggle] =useState(0)
  
   
    useEffect(()=>{
        store.dispatch(axiosCAllTodo(id))
    }, [])

    const axiosAddTodo = () => {
        axiosWithAuth()
        .post(`users/1/lists/${id}/todos`, addTodo)
        .then(()=> store.dispatch(axiosCAllTodo(id)))
        .catch(err=> console.log("addTodo faild", err ))
    }

    const submit = (event) => {
        event.preventDefault();
       axiosAddTodo()
        store.dispatch(valueClearing())
        
    }

    const todoUpdating = (todoID, event) => {
        event.preventDefault()
        const updateObj = {todo: updaTodo.todoUpdate }
        axiosWithAuth()
        .put(`users/1/lists/${id}/todos/${todoID}`, updateObj)
        .then(() =>{
            store.dispatch(valueClearing())
            setUpdateToggle(0)
            store.dispatch(axiosCAllTodo(id))
            
        })
        .catch(err=> console.log("updating Todo Error", err))
    }

    const deleteTodo = (todoID) => {
        axiosWithAuth()
        .delete(`users/1/lists/${id}/todos/${todoID}`)
        .then(()=>{
            store.dispatch(axiosCAllTodo(id))
        })
        .catch(err=> console.log("deleting List Error", err))
    }
    
    return (
        <div className="flex">
        <div className="container">
            {todos.map(data=>
                <div key={data.id} className="flex2" > 
                <div key={data.id} className="container3">
                    <div className={completeToggle == data.id? "complete" : "uncomplete"} 
                    onClick={()=> completeToggle == 0 ?  setCompleteToggle(data.id) : setCompleteToggle(0) }
                    > Todo: {data.todo}</div>
                    <button onClick={()=>setUpdateToggle(data.id)}>Update Todo</button>
                    <button onClick={()=> deleteTodo(data.id)}>Delete Todo</button>
                    
                    <div className={updateToggle == data.id? "show" : "no-show"}>
               <Form onSubmit={(event)=> todoUpdating(data.id, event)} >
                  
                       <Form.Input
                       type="text"
                       name="todoUpdate"
                       id="todoUpdate"
                       placeholder="Update Todo"
                       value={updaTodo.todoUpdate}
                       onChange={valueUpdate}
                        />
                   
                   <Button className="blue"> Update</Button>
               </Form>
               <div className="button-margin">
               <Button className="orange" onClick={()=>{setUpdateToggle(0)
               store.dispatch(valueClearing())
               }}>cancle</Button>
               </div>
           </div>

                </div>
                </div>
           )}

            <div>
           <Form onSubmit={submit}>
               
                   <Form.Input
                   type="text"
                   name="todo"
                   id="todo"
                   placeholder="Enter todo"
                   value={addTodo.todo}
                   onChange={valueUpdate}
                    />
               
               <Button type="submit" className="green">Add Todo</Button>
           </Form>
           </div>

        </div>
        </div>

    )
}

export default Todos