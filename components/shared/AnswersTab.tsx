import { getUserAnswers } from '@/lib/actions/users.action';
import { SearchParamsProps } from '@/types'
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';
// import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({  userId, clerkId, searchParams }: Props) => {
  const result = await getUserAnswers({
    userId,
     page: searchParams.page ? +searchParams.page : 1,
  })

  return (
    <>
      {result && result.answers.map((item) => (
        <AnswerCard 
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />  
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  )
}

export default AnswersTab