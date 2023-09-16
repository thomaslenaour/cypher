import { useMemo, useState } from 'react';
import { IUser } from '../interfaces';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { FollowDocument, UnfollowDocument } from '@cypher/front/shared/graphql';

export const useUserProfile = (defaultUser: IUser) => {
  // Next Auth
  const { data: sessionData, status: sessionStatus } = useSession();

  // GraphQL Mutations
  const [followMutation] = useMutation(FollowDocument);
  const [unfollowMutation] = useMutation(UnfollowDocument);

  // React State
  const [user, setUser] = useState<IUser>(defaultUser);
  const currentUserFollowUser = useMemo(
    () => Boolean(user.followedBy?.find((u) => u.id === sessionData?.user.id)),
    [user.followedBy, sessionData?.user.id]
  );
  const currentUserIsOnHisProfilePage = useMemo(
    () => sessionData?.user.id === user.id,
    [sessionData?.user.id, user.id]
  );

  // Handlers
  const handleFollowClick = async () => {
    if (sessionData?.user?.id == null) return;

    if (!currentUserFollowUser) {
      followMutation({
        variables: {
          data: {
            followed: user.id,
            following: sessionData.user.id,
          },
        },
      }).then((res) => {
        if (res.data) setUser(res.data.follow);
      });
    } else {
      unfollowMutation({
        variables: {
          data: {
            unfollowed: user.id,
            unfollowing: sessionData.user.id,
          },
        },
      }).then((res) => {
        if (res.data) setUser(res.data.unfollow);
      });
    }
  };

  return {
    handleFollowClick,
    currentUserFollowUser,
    currentUserIsOnHisProfilePage,
    user,
    sessionStatus,
  };
};
