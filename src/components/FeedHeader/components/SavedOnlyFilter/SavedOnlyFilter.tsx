import * as React from 'react';

import {Bookmark} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

import {Keyset, i18n} from '../../../../i18n';
import {block} from '../../../../utils/cn';

import './SavedOnlyFilter.scss';

const b = block('saved-only-filter');

const ICON_SIZE = 16;

export type SavedOnlyFilterProps = {
    initialValue: boolean;
    onChange: (value: boolean) => void;
    className?: string;
};

export const SavedOnlyFilter = ({initialValue, onChange, className}: SavedOnlyFilterProps) => {
    const [savedOnly, setSavedOnly] = React.useState<boolean>(initialValue);

    const handleChange = () => {
        const next = !savedOnly;
        setSavedOnly(next);
        onChange(next);
    };

    return (
        <div className={className}>
            <Button
                view={'outlined'}
                className={b('button', {savedOnly})}
                size="xl"
                onClick={handleChange}
                selected={savedOnly}
            >
                <Icon data={Bookmark} size={ICON_SIZE} className={b('icon', {savedOnly})} />
                {i18n(Keyset.ActionSavedOnly)}
            </Button>
        </div>
    );
};
