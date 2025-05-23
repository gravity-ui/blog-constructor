import * as React from 'react';

import {ToggleLikeCallbackType} from '../models/common';

export interface LikesContextProps {
    toggleLike?: ToggleLikeCallbackType;
    hasLikes?: boolean;
    isSignedInUser?: boolean;
    requireSignIn?: React.MouseEventHandler;
}

export const LikesContext = React.createContext<LikesContextProps>({} as LikesContextProps);
