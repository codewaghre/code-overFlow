"use client"
import React from 'react'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface CustomInputProps {
    route?: string
    iconPosition: string
    imgSrc: string
    placeholder: string
    otherClasses?: string 
}

const LocalSearchbar = ({
    // route, 
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses,
}: CustomInputProps) => {

    // const router = useRouter();
    // const pathname = usePathname();
    // const searchParams = useSearchParams();
    return (

        <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
            {iconPosition === 'left' && (
                <Image
                    src={imgSrc}
                    alt="search icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
            )}

            <Input
                type="text"
                placeholder={placeholder}
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-hidden"
            />

            {iconPosition === 'right' && (
                <Image
                    src={imgSrc}
                    alt="search icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
            )}
        </div>
    )
}

export default LocalSearchbar