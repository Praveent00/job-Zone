import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
//const randomjobs = [0,1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
    const{allJobs}=useSelector(store=>store.job);
    return (
        <div className='mx-auto my-20 max-w-7xl'>
            <h1 className='text-4xl font-bold'><span className='text-[#41d3d6]'>Letest & Top </span>Job Opening</h1>

            <div className='grid grid-cols-3 gap-4 my-5'>{
                allJobs.length<=0?<span>No job Avalable</span>:allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)
            }
            </div>
        </div>
    )
}

export default LatestJobs


