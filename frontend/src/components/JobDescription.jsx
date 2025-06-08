import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, Job_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${Job_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data

            }
            catch (error) {
                console.log(error);

            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    return (
        <div className='mx-auto my-10 max-w-7xl'>
            <div className='flex items-center justify-between '>
                <div>
                    <h1 className='text-xl font-bold'>{singleJob?.title}</h1>

                    <div className='flex items-center gap-2 mt-4 '>
                        <Badge className={'text-blue-400 font-bold'} variant="ghost">{singleJob?.position}</Badge>
                        <Badge className={'text-red-700 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-gray-500 font-bold'} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null :applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : "bg-[#7715b8]  hover:bg-[#bc7b60]"}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='py-4 font-medium border-b-2 border-b-gray-400'> Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-q'>Role: <span className='pl-4 font-normal text-gray-700'>{singleJob?.position}</span></h1>
                <h1 className='font-bold my-q'>Location: <span className='pl-4 font-normal text-gray-700'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-q'>Description: <span className='pl-4 font-normal text-gray-700'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-q'>Experience: <span className='pl-4 font-normal text-gray-700'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-q'>Salary: <span className='pl-4 font-normal text-gray-700'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-q'>Total Applicants: <span className='pl-4 font-normal text-gray-700'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-q'>Posted Date: <span className='pl-4 font-normal text-gray-700'>{singleJob?.createdAt.split("T")[0]}</span></h1>


            </div>


        </div>
    )
}

export default JobDescription
