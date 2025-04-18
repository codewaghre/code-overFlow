import React from 'react'
import { auth } from '@clerk/nextjs/server'
import Profile from '@/components/form/Profile';
import { getUserByID } from '@/lib/actions/users.action';

const Page = async () => {

  const session = await auth();
  const { userId } = session;

  if (!userId) return null

  const mongoUser = await getUserByID({ userId })
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  )
}

export default Page