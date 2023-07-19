import React from 'react';

/*
 * Source code copied from https://github.com/uidotdev/usehooks | MIT License
 * @see https://usehooks.com/usehover
 */
export function useHover<T extends HTMLElement = HTMLElement>(): [
    ref: React.RefObject<T>,
    hovering: boolean,
] {
    const [hovering, setHovering] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const node = ref.current as unknown as HTMLElement;

        if (!node) return;

        const handleMouseEnter = () => {
            setHovering(true);
        };

        const handleMouseLeave = () => {
            setHovering(false);
        };

        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        // eslint-disable-next-line consistent-return
        return () => {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return [ref, hovering];
}
