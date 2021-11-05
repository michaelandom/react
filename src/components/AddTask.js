import React from 'react'
import { useState } from 'react'
const AddTask = ({onSave}) => {
   const [text,setText]=useState("")
   const [day,setDay]=useState("")
   const [reminder,setReminder]=useState(false)
  const onSubmit = (e) => {
 e.preventDefault()

 if(!text){
alert("plece ad text")
return
 }
 onSave({text,day,reminder})
 setText("")
 setDay("")
 setReminder(false)
  }
    return (
        <form className="form" onSubmit={onSubmit}>
        <div className= "form-control">
            <label>
                Add Text
            </label>
            <input type="text" placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}></input>
            </div>    
            <div className= "form-control">
            <label>
                day and time
            </label>
            <input type="text" placeholder="date and time" value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>    
            <div className= "form-control form-control-check">
            <label>
                set reminder
            </label>
            <input type="checkbox" value={reminder} checked={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}></input>
            </div>
            <input type="submit" value="save Task" className="btn btn-block" ></input>
                        
        </form>
    )
}

export default AddTask
