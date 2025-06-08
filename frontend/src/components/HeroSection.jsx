import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
 const [query,setQuery]=useState("");
 const dispatch=useDispatch();
const navigate=useNavigate();

 const searchJobHandler=()=>{
  dispatch(setSearchedQuery(query));
  navigate("/browse")
 }
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#ae3b21] font-medium'>No.1 job Hunt website</span>
        <h1 className='text-5xl font-bold'>Search , Apply & <br />Get Your <span className='text-[#6a3862]'> Dream Jobs</span></h1>
        <div className='flex w-[40%] shadow-lg border-gray-400 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input type="text"
            placeholder='Find Your Dream Job'
            onChange={(e)=>setQuery(e.target.value)}
            className='w-full border-none outline-none' />
          <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6a38c2]'>
            <Search className='w-5 h-5' />
          </Button>
        </div>
      </div>

    </div>
  )
}
