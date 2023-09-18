import { useMemo, useState } from 'react';
import { IUser, IUserProfile } from '../interfaces';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import {
  FollowDocument,
  UnfollowDocument,
  UpdateUserProfileDocument,
} from '@cypher/front/shared/graphql';
import { UpdateProfileInput } from '../components/UpdateProfile/Form';

export const useUserProfile = (
  defaultUser: IUser,
  defaultUserProfile: IUserProfile
) => {
  // Next Auth
  const { data: sessionData, status: sessionStatus } = useSession();

  // GraphQL Mutations
  const [followMutation] = useMutation(FollowDocument);
  const [unfollowMutation] = useMutation(UnfollowDocument);
  const [updateUserProfileMutation] = useMutation(UpdateUserProfileDocument);

  // React State
  const [user, setUser] = useState<IUser>(defaultUser);
  const [userProfile, setUserProfile] =
    useState<IUserProfile>(defaultUserProfile);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
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
    if (!sessionData?.user?.id) return;

    try {
      let resultData = null;

      if (!currentUserFollowUser) {
        const res = await followMutation({
          variables: {
            followed: user.id,
          },
        });

        if (res.data) resultData = res.data.follow;
      } else {
        const res = await unfollowMutation({
          variables: {
            unfollowed: user.id,
          },
        });

        if (res.data) resultData = res.data.unfollow;
      }

      if (resultData) setUser(resultData);
      else console.error('Failed to process follow/unfollow.');
    } catch (error: any) {
      // Handle any errors from the API call
      console.error('An error occurred:', error.message);
    }
  };

  const handleUpdateProfileSubmit = async (
    data: UpdateProfileInput
  ): Promise<boolean> => {
    try {
      const res = await updateUserProfileMutation({
        variables: {
          data,
        },
      });

      if (res.data?.updateUserProfile)
        setUserProfile({
          ...userProfile,
          ...res.data.updateUserProfile,
        });

      return true;
    } catch (error: any) {
      console.error('An error occured:', error.message);
      return false;
    }
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  return {
    user,
    userProfile,
    openUpdateModal,
    currentUserFollowUser,
    currentUserIsOnHisProfilePage,
    sessionStatus,
    handleFollowClick,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    handleUpdateProfileSubmit,
  };
};
