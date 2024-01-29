'use client'

import taskSvg from '@/assets/task.svg'
import { addTask } from '@/services/taskServices'
import Image from 'next/image'
import { useState } from 'react'

import { toast } from 'react-toastify';

// Not Allowed because client component  
// export const metadata = {
//   title : "Add Task: Work Manager"
// }

const AddTask =  () => {
  // console.log("This is a Client Component");// print in browser console because client component
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: "",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    // console.log(task);

    // validation
    if (!task.content && !task.title && !task.status) {
      toast.error('All Field Are Required !! ')
      return;
    }

    // crete req
    try {
      const result = await addTask(task);
      console.log("Task Create ", result);
      if (result.data) {
        toast.success("Your Task is added !!", {
          position:"top-center"
        })
  
        setTask({
          title:"",
          content:"",
          status:"none",
        })
      }
      else {
        toast.error("Your Task Not added !!", {
          position:"top-center"
        })
      }

    } catch (error) {
      toast.error("Your Task Not added !!")
      throw new Error("Task Not Created")
    }
  }

  return (
    <div className="grid grid-cols-12 justify-center">
        
        <div className="col-span-6 col-start-4 shadow-sm p-5 mt-5">
          <div className='my-8 flex justify-center'>
            <Image src={taskSvg} style={{width:"50%"}} alt="login-img" priority></Image>
          </div>

          <h1 className="text-3xl text-center">Add your task here !!</h1>
          
          <form action="#" onSubmit={(e) => handleAddTask(e)}>
            <div className="mt-5">
                <label htmlFor="task_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text" 
                name="task_title"
                onChange={(event) => {
                  setTask({
                    ...task,
                    title: event.target.value,
                  });
                }}
                value={task.title} id="task_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required/>
            </div>

            <div className="mt-5">
                <label htmlFor="task_content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Content</label>
                <textarea rows={5} 
                name="task_content"
                onChange={(event) => {
                  setTask({
                    ...task,
                    content: event.target.value,
                  });
                }}
                defaultValue={task.content}
                value={task.content}  type="text" id="task_content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="mt-5">
                <label htmlFor="task_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select id="task_status" onChange={(e) => {
                  setTask({...task,status:e.target.value})
                }} 
                value={task.status} 
                name='task_status' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="none" disabled>--Select Status--</option>
                  <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="pending">Pending</option>
                  <option className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="complete">Completed</option>
                </select>
            </div>

            {/* Action button */}
            <div className="mt-5 flex justify-around">
              <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">Add Task</button>
              <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800">Clear</button>
            </div>

          </form>
        </div>

    </div>
  )
}

export default AddTask

// Use Grid System
// col-span-4 meaning combine 4col at starting
// if we use start at 2 so col-start-2

// Hear we have use 12 col in grid
// 1 2 3 4 5 6 7 8 9 10 11 12
// combine 6 col at center
// show we have to start at col - 4 