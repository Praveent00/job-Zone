import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
const isResume = true;

const Skills = ["Html", "Javascript", "React"]
const Profile = () => {
    useGetAppliedJobs();
    const [open,setOpen]=useState(false);
    const {user}=useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl p-8 mx-auto my-5 border-gray-500 bg-gray-50 rounded-2xl'>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-4'>
                        <Avatar className='w-24 h-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt='/Profile' />
                        </Avatar>

                        <div>
                            <h1 className='text-xl font-medium'> {user?.fullname}</h1>
                            <p>{user?.profile?.bio}.</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>

                </div>
                <div >
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                    {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>

                </div>
                <br />
                <div className='grid items-center w-full max-w-sm gap-2'>
                    <Label className='font-bold text-md'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='w-full text-blue-600 cursor-pointer hover:underline '>{user?.profile?.resumeOriginalName}</a> : <span>Na</span>
                    }
                </div>
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                    <h1 className='my-5 text-lg font-bold'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
