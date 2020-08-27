import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {axiosCAllTodo,valueClearing} from "../state-manegment/foodTruckReducer"
import store from "../state-manegment/store"
import {useAdminForm} from "../hooks/useAdminForm"
import {axiosWithAuth} from "../utils/axiosWithAuth"

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
        <div>
            {todos.map(data=>
                <div key={data.id}>
                    <div className={completeToggle == data.id? "complete" : "uncomplete"} 
                    onClick={()=> completeToggle == 0 ?  setCompleteToggle(data.id) : setCompleteToggle(0) }
                    > Todo: {data.todo}</div>
                    <button onClick={()=>setUpdateToggle(data.id)}>Update Todo</button>
                    <button onClick={()=> deleteTodo(data.id)}>Delete Todo</button>
                    
                    <div className={updateToggle == data.id? "show" : "no-show"}>
               <form onSubmit={(event)=> todoUpdating(data.id, event)} >
                   <label>
                       <input
                       type="text"
                       name="todoUpdate"
                       id="todoUpdate"
                       value={updaTodo.todoUpdate}
                       onChange={valueUpdate}
                        />
                   </label>
                   <button> Update</button>
               </form>
               <button onClick={()=>{setUpdateToggle(0)
               store.dispatch(valueClearing())
               }}>cancle</button>
           </div>

                </div>
           )}

            <div>
           <form
            onSubmit={submit} 
            >
               <label>
                   <input
                   type="text"
                   name="todo"
                   id="todo"
                   placeholder="Enter todo"
                   value={addTodo.todo}
                   onChange={valueUpdate}
                    />
               </label>
               <button type="submit">Add Todo</button>
           </form>
           </div>

        </div>
    )
}

export default Todos