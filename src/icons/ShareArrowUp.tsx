import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const ShareArrowUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.798 3.16a.5.5 0 0 0 .363.842H7V9a1 1 0 0 0 2 0V4.002h1.839a.5.5 0 0 0 .363-.844L8.363.156a.5.5 0 0 0-.726 0l-2.84 3.002.001.001ZM13 7a1 1 0 0 1 2 0v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5V7a1 1 0 0 1 2 0v6h10V7Z"
        />
    </svg>
);
