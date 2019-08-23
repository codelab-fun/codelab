import { User } from './user.interface';

export interface GithubAuth {
  additionalUserInfo: {
    profile: User;
  };
  credential: {
    accessToken: string;
  };
}
