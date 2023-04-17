import React from 'react';

//TODO refactor user context
export interface UserAccount {
    uid: string;
}

export type UserContextProps = Partial<UserAccount>;

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
