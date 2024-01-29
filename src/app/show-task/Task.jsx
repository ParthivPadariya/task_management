import { UserContext } from '@/contexts/userContext'
import React, { useContext } from 'react'

import {RxCross1} from 'react-icons/rx'
const Task = ({task, deleteTaskParent}) => {

    const {user} = useContext(UserContext);
    
    const deleteTask = async (taskId) => {
      await deleteTaskParent(taskId);
    }

  return (
    <div className={`shadow-lg mt-2 rounded-md ${task.status == "complete" ? "bg-green-800" : "bg-gray-800" }`}>
        <div className='p-5'>
            <div className='flex justify-between'>
              <h1 className='text-2xl font-semibold'>{task.title}</h1>
              <span onClick={() => deleteTask(task._id)} className='shadow-lg bg-gray-950  rounded-full w-9 h-9 flex justify-center items-center cursor-pointer'>
                <RxCross1 />
              </span>
            </div>
            <p className='font-normal'>{task.content}</p>
            <div className='flex justify-between'>
              <p className='font-normal'>{task.status}</p>
              <p className='text-right'><b>Author: </b>{user?.data?.message?.name}</p>
            </div>
        </div>
    </div>
  )
}

export default Task