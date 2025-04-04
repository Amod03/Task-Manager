import React, { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout';

const CreateTask = () => {
  const location=useLocation();
  const {taskId}=location.state || {};
  const navigate=useNavigate();

  const[taskData,setTaskData]=useState({
    title:"",
    description:"",
    priority:"Low",
    dueData:null,
    assignedTo:[],
    todoChecklist:[],
    attachments:[],
  })
  const[currentTask,setCurrentTask]=useState(null);
  const[error,setError]=useState(false);
  const[loading,setLoading]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState(false);

  const handleValueChange=(key,value)=>{
    setTaskData((prevData)=>({...prevData,[key]:value}))
  }

  const clearData=()=>{
    setTaskData({
      title:"",
      description:"",
      priority:"Low",
      dueData:null,
      assignedTo:[],
      todoChecklist:[],
      attachments:[],
    })
  }

  //Create Task
  const createTask=async()=>{

  }

  //Update Task
  const updateTask=async()=>{

  }

  const handleSubmit=async()=>{

  }

  //get task info by id
  const getTaskDetailsById=async()=>{

  }

  //delete task
  const deleteTask=async()=>{

  }
  return (
    <DashboardLayout activeMenu="Create Task">
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>{taskId ? "Update Task" : "Create Task"}</h2>
              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={()=>setOpenDeleteAlert(true)}
                  >
                    <LuTrash2 className='text-base' />Delete
                  </button>
              )}
            </div>
            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>Task Title</label>
              <input 
                placeholder='Create App UI'
                className='form-input'
                value={taskData.title}
                onChange={({target})=>handleValueChange("title",target.value)}
                />
            </div>
            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Description
              </label>
              <textarea
              placeholder='Describe Task'
              className='form-input'
              rows={4}
              value={taskData.description}
              onChange={({target})=>handleValueChange("description",target.value)}
             />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask
