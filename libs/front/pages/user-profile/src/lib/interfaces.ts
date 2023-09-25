export type IUserProfile = {
  id: string;
  createdAt: Date;
  bannerUrl?: string | null;
  profileUrl?: string | null;
  pseudo: string;
  punchline?: string | null;
  name?: string | null;
  userId: string;
};

export type IUser = {
  id: string;
  followedBy?: IUser[] | null;
  following?: IUser[] | null;
};
