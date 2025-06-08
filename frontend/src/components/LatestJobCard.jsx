import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({job}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)}className='p-5 bg-white border-gray-400 rounded-md shadow-xl cursor-pointer'>
       <div>
      <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
      <p className='text-sm text-gray-600'>India</p>
    </div>
    <div>
        <h1 className='my-2 text-lg font-bold'> { job?.title}</h1>
        <p className='text-sm text-gray-500'>{job?.description}.</p>
    </div> 
    <div className='flex items-center gap-2 mt-4 '>
        <Badge className={'text-blue-400 font-bold'} variant="ghost">{job?.position}</Badge>
        <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobtype}FullTime</Badge>
        <Badge className={'text-gray-500 font-bold'} variant="ghost">{job?.salary}</Badge>


    </div>
    </div>
    
  )
}

export default LatestJobCard
