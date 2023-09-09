import { IPublicClientApplication } from '@azure/msal-browser';
import React from 'react';

import { User } from '../common/types';


export interface AuthContext {
  readonly user: User | null;
  readonly msal: IPublicClientApplication;
}

export default React.createContext<AuthContext>({
  user: null,
  msal: {} as unknown as IPublicClientApplication,
});
