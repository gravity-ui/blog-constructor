import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Time: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16.004a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm3.357-3.736a1 1 0 0 0-.342-1.372L9 7.688V5.004a1 1 0 0 0-2 0v3.25a1 1 0 0 0 .486.857l2.5 1.5a1 1 0 0 0 1.371-.343Z"
        />
    </svg>
);
