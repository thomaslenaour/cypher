import { useEffect, useState } from 'react';
import { IUser } from '../interfaces';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { FollowDocument, UnfollowDocument } from '@cypher/front/shared/graphql';

export const useUserProfile = (defaultUser: IUser) => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const { data: sessionData } = useSession();
  const [currentUserFollowUser, setCurrentUserFollowUser] =
    useState<boolean>(false);
  const [followMutation] = useMutation(FollowDocument);
  const [unfollowMutation] = useMutation(UnfollowDocument);

  useEffect(() => {
    setCurrentUserFollowUser(() =>
      Boolean(user.followedBy?.find((u) => u.id === sessionData?.user.id))
    );
  }, [user.followedBy, sessionData?.user.id]);

  const handleFollowClick = async () => {
    if (sessionData?.user?.id == null) return;

    if (!currentUserFollowUser) {
      await followMutation({
        variables: {
          data: {
            followed: user.id,
            following: sessionData?.user?.id,
          },
        },
      }).then((u) => {
        if (u.data) {
          setUser(u.data?.follow);
        }

        setCurrentUserFollowUser(true);
      });
    } else {
      await unfollowMutation({
        variables: {
          data: {
            unfollowed: user.id,
            unfollowing: sessionData?.user?.id,
          },
        },
      }).then((u) => {
        if (u.data) {
          setUser(u.data?.unfollow);
        }

        setCurrentUserFollowUser(false);
      });
    }
  };

  return { handleFollowClick, currentUserFollowUser, user };
};
