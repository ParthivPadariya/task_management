"use client"
import { UserContext } from '@/contexts/userContext';
import { deleteTaskAPI, getTaskOfUser } from '@/services/taskServices'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Task from './Task';

const ShowTaskPage = () => {
    
  const [tasks,setTasks] = useState([]);
  const context = useContext(UserContext);

  async function loadTask(userId) {
    try {
      
      const result = await getTaskOfUser(userId);
      console.log(result);
      if (result.status) {
        setTasks(result.data.reverse());
      }
      else{
        setTasks([]);
      }
    } catch (error) {
      console.log("Fetching Task",error);
    }  
  }

  useEffect(() => {
    if (context.user) {
      loadTask(context.user.data.message._id);
    }
  }, [context.user])

  async function deleteTaskParent(taskId) {
    try {
      const result = await deleteTaskAPI(taskId);
      // console.log(result);
      const newTask = tasks.filter(item => item._id !== taskId)
      setTasks(newTask);
      toast.success("Your Task is deleted")
    } catch (error) {
      console.log("Delete Error");
    }
  }

  return (
    <div className='grid grid-cols-12 grid-flow-row mt-3'>
        <div className=' col-span-6 col-start-4'>
          <h1 className='text-3xl mb-3' > Your tasks ({tasks.length})</h1>
          {
            tasks.map((task,index) => {
              return <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
            })
          }
        </div>
    </div>
  )
}

export default ShowTaskPage