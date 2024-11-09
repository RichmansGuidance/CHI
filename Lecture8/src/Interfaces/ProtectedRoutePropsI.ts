import { UserStatus } from '../utils/UserStatus';

export interface ProtectedRoutePropsI {
    children: React.ReactNode;
    isAllowed: UserStatus;
  }