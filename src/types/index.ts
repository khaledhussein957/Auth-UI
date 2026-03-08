export interface IUser {
  _id: string;
  name: string;
  email: string;

  isVerified: boolean;
  lastLogin: Date;

  createdAt: Date;
  updatedAt: Date;
}
