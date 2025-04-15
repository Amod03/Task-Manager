import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import UserCard from '../../components/Cards/UserCard';

const ManageUsers = () => {
  const [allUsers,setAllUsers]=useState([]);

  const getAllUsers=async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if(response.data?.length > 0){
        setAllUsers(response.data);
      }
    }catch(error){
      console.error("Error Fetching users:",error);
    }
  }

  const handleDownloadReport=async ()=>{

  }

  useEffect(()=>{
    getAllUsers();
    return ()=>{}
  },[])

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className='mt-5 mb-10'>
        <div className='flex md:flex-row md:items-center justify-between'>
          <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
          <button className='flex md:flex download-btn' onClick={handleDownloadReport}>
            <LuFileSpreadsheet className='text-lg'/>
            Downlaod Report
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
         {allUsers?.map((user)=>(
          <UserCard key={user._id} userInfo={user}/>
         ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
