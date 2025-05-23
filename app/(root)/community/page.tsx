import React from 'react'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { UserFilters } from '@/constants/filters';

import Filter from '@/components/shared/Filter';
import { getAllUsers } from '@/lib/actions/users.action';
import Link from 'next/link';
import UserCard from '@/components/cards/UserCard';
import Pagination from '@/components/shared/Pagination';



const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {

  const searchParams = await props.searchParams;

  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  })


  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between  gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for commmunity users"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result && result.users.length > 0 ? (
          result?.users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result && result.isNext}
        />
      </div>
    </>
  )
}

export default Page