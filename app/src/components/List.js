import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {axiosCallUser,  valueClearing} from "../state-manegment/foodTruckReducer"
import {axiosWithAuth} from "../utils/axiosWithAuth"
import {useHistory} from "react-router-dom"

import store from "../state-manegment/store"

import {useAdminForm} from "../hooks/useAdminForm"


const List = () => {
    const user = useSelector(state=> state.user)
    const [state, valueUpdate] = useAdminForm()
    const addList = state.addList
    const updateList = state.updateList
    const {push} = useHistory()
    const [updateToggle, setUpdateToggle] =useState(0)
    

    useEffect(
        () => {
            store.dispatch(axiosCallUser())
        }, [])

        const addlist = () => {
            axiosWithAuth()
            .post(`users/1/lists`, addList)
            .then(res=> {console.log("addlist success", res.data.listname)
            store.dispatch(axiosCallUser())
        })
            .catch(err=> console.log("addlist faild", err ))
        }

        const listUpdating = (listID, event) => {
            event.preventDefault()
            const updateObj = {listname: updateList.listUpdate }
            axiosWithAuth()
            .put(`users/1/lists/${listID}`, updateObj)
            .then(() =>{
                store.dispatch(valueClearing())
                setUpdateToggle(0)
                store.dispatch(axiosCallUser())
                
            })
            .catch(err=> console.log("updating List Error", err))
        }

        const deleteList = (listID) => {
            axiosWithAuth()
            .delete(`users/1/lists/${listID}`)
            .then(()=>{
                store.dispatch(axiosCallUser())
            })
            .catch(err=> console.log("deleting List Error", err))
        }

        const submit = (event) => {
            event.preventDefault();
            addlist()
            store.dispatch(valueClearing())
            
        }
        

  
    return(
        <div>
        
           {user.map(data=> <div key={data.id}>
           
           <div>List name: {data.listname}</div>
           <button onClick={()=>setUpdateToggle(data.id)}>Update List name</button>
           <button onClick={()=>deleteList(data.id)}>Delete List</button>
           <button onClick={()=> push(`/list/Todos/${data.id}`)}>View Todos</button>
           <div className={updateToggle == data.id? "show" : "no-show"}>
               <form onSubmit={(event)=> listUpdating(data.id, event)}>
                   <label>
                       <input
                       type="text"
                       name="listUpdate"
                       id="listUpdate"
                       value={updateList.listUpdate}
                       onChange={valueUpdate}
                        />
                   </label>
                   <button> Update</button>
               </form>
               <button onClick={()=>{setUpdateToggle(0)
               store.dispatch(valueClearing())
               }}>cancle</button>
           </div>
            </div>)}
            <div>
           <form onSubmit={submit} >
               <label>
                   <input
                   type="text"
                   name="listname"
                   id="listname"
                   placeholder="Enter List Name"
                   value={addList.listname}
                   onChange={valueUpdate}
                    />
               </label>
               <button type="submit">Add List</button>
           </form>
           </div>
           
        </div>
    )
}

export default List;