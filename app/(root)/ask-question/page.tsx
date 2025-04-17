import Question from '@/components/form/Question'
import { getUserByID } from '@/lib/actions/users.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {

  const session = await auth();
  const { userId } = session;
  
  if (!userId) redirect("/sign-in")
  

  const mongoUser = await getUserByID({ userId })
  
  console.log(mongoUser);
  

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  )
}

export default page