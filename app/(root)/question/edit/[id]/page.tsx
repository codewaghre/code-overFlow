import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { getUserByID } from '@/lib/actions/users.action';
import { ParamsProps } from '@/types';
import { getQuestionById } from '@/lib/actions/question.action';
import Question from '@/components/form/Question';



const Page = async (props: ParamsProps) => {
  const params = await props.params;
  const session = await auth();
  const { userId } = session;

  if (!userId) return null

  const mongoUser = await getUserByID({ userId })
  const result = await getQuestionById({ questionId: params.id})

  return (
      <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page