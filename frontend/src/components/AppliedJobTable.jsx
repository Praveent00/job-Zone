import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((AppliedJob) => (
                            <TableRow key={AppliedJob._id}>
                                <TableCell>{AppliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{AppliedJob.job?.title}</TableCell>
                                <TableCell>{AppliedJob?.job?.location}</TableCell>
                                <TableCell className="text-right"><Badge className={`${AppliedJob?.status === "rejected" ? 'bg-red-400' : AppliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{AppliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable