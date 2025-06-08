import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
  const navigate=useNavigate();
//const jobId='praveen123';
const daysAgoFunction=(mongodbTime)=>{
  const createdAt=new Date(mongodbTime);
  const curentTime=new Date();
  const timeDifference=curentTime - createdAt;
  return Math.floor(timeDifference/(1000*24*60*60));
}
  return (
    <div className='p-5 bg-white border border-gray-100 rounded-md shadow-xl'>
      <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
      <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
          
      </div>
<div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src= {job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
<div>
  <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
  <p className='text-sm text-gray-600'>{job?.discription}</p>
</div>
<div className='flex items-center gap-2 mt-4 '>
        <Badge className={'text-blue-400 font-bold'} variant="ghost">{job?.position} Position</Badge>
        <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobtype}Part Time</Badge>
        <Badge className={'text-gray-500 font-bold'} variant="ghost">{job?.salary}Lpa</Badge>


    </div>
    <div className='flex items-center gap-4 mt-4'>
      <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
      <Button className='bg-[#3587c5f7]'>Save For Later</Button>
    </div>
    </div>
  )
}

export default Job
