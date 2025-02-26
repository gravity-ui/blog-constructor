import * as React from 'react';

type Labels = string | number | boolean | undefined;
type Description = string | number | boolean | undefined;
interface UseAriaAttributesProps {
    labelIds?: Labels[];
    descriptionIds: Description[];
}

/**
 * Returns aria-attributes
 * @param labelIds - labels ids. Falsy values will be ignored
 * @param descriptionIds - descriptions ids. Falsy values will be ignored
 * @returns aria attributes for the element to be labelled
 */
export const useAriaAttributes = ({labelIds = [], descriptionIds = []}: UseAriaAttributesProps) => {
    const labelledBy = React.useMemo(() => labelIds.filter(Boolean).join(' '), [labelIds]);
    const describedBy = React.useMemo(
        () => descriptionIds.filter(Boolean).join(' '),
        [descriptionIds],
    );

    return {
        'aria-labelledby': labelledBy,
        'aria-describedby': describedBy,
    };
};
