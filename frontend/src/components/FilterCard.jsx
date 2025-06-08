import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai","Udaipur"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Devloper", "Backend Devloper", "FullStack Devloper"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue,setSelectedValue]=useState('');
const dispatch=useDispatch();
  const changeHandler=(value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
dispatch  (setSearchedQuery(selectedValue));
  },[selectedValue]);
  return (
    <div className='w-full p-3 rounded-md bg-slate-100'> 
      <h1 className='text-lg font-bold'>Filter Jobs</h1>
      <hr className='mt-3 ' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='text-lg font-bold'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId=`r${index}-${idx}`
                  return (
                    <div className='flex items-center my-2 space-x-2'>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          )
          )
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
