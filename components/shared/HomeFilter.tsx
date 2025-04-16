"use client"
import React from 'react'
import { Button } from '../ui/button'
import { HomePageFilters } from '@/constants/filters'

const HomeFilter = () => {
    // const [active, setActive] = useState('Newest');
    
    // const handleTypeClick  =(item: string) => {}

    const active = "frequent"

    
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button key={item.value} onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value 
          ? 'dark:hover:bg-dark-400 bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500' 
          : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'
        }`}
        // onClickCapture={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilter