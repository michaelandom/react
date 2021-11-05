import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask,showAddTaskState]=useState(false)
  const [tasks,setTasks]=useState([])
  useEffect( () => {
    const getTask= async ()=> {
       const taskFromServer= await fatchTasks()
       setTasks(taskFromServer)
    }
    getTask()
  },[])
  const fatchTasks= async ()=> {
    const res= await fetch('http://localhost:5000/tasks')
    const data= await res.json()

    return data;
 }
 const fatchTask= async (id)=> {
  const res= await fetch(`http://localhost:5000/tasks/${id}`)
  const data= await res.json()

  return data;
}
const removeTask= async (id) => {
await fetch(`http://localhost:5000/tasks/${id}`,{
  method:'DELETE'
}) 
  setTasks(
    tasks.filter((task) => task.id!== id)
  )
}
const onReminder= async (id) => {
  const task= await fatchTask(id)
  const res=  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({...task,reminder:!task.reminder})
  }) 
  const updateTask= await res.json()
  setTasks(
    tasks.map((task) =>task.id===id? updateTask:task)
    )
}
const onAdd = async (task) => {
const res=  await fetch(`http://localhost:5000/tasks`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  }) 
  const newTask= await res.json()

  setTasks(
    [...tasks,newTask]
    )
}
  return (
   <Router>    
    <div className="container">
     <Header showAddTask={() => showAddTaskState(!showAddTask)} showAdd={showAddTask}/>
  
    <Routes>
    <Route path="/" exact element={
      <>
     {showAddTask && <AddTask onSave={onAdd}/>}
     {tasks.length>0? <Tasks tasks={tasks} onDelete={removeTask} onReminder={onReminder}/>:"no task here"}
      
      </>
    } />
    <Route path="/about" element={<About />} />
    </Routes>
     
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
