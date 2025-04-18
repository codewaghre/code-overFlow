// app/(root)/profile/[id]/page.tsx
'use client'; // Add this at the top

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserInfo } from '@/lib/actions/users.action';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import ProfileLink from '@/components/shared/ProfileLink';
import { getJoinedDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionTab from '@/components/shared/QuestionTab';
import Stats from '@/components/shared/Stats';
import AnswersTab from '@/components/shared/AnswersTab';

interface UserInfoType {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    portfolioWebsite?: string;
    location?: string;
    joinedAt: Date;
    bio?: string;
  };
  totalQuestions: number;
  totalAnswers: number;
}

export default function ProfilePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string  | undefined };
}) {
  const { id } = params;
  const { user: clerkUser, isSignedIn } = useUser();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        router.push('/sign-in');
        return;
      }

      try {
        const data = await getUserInfo({ userId: id });
        if (!data) {
          notFound();
        }
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isSignedIn, router]);

  if (loading) {
    return <div className="flex-center h-full w-full">Loading...</div>;
  }

  if (!userInfo) {
    return <div className="flex-center h-full w-full">User not found</div>;
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
            priority
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>

            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {clerkUser?.id === userInfo.user.clerkId && (
            <Link href="/profile/edit">
              <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkUser?.id || ''}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkUser?.id || ''}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}