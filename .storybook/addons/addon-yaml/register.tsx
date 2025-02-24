import * as React from 'react';

import {ClipboardButton, ThemeProvider} from '@gravity-ui/uikit';
import {addons, types, useArgs} from '@storybook/manager-api';
import {AddonPanel} from '@storybook/components';
import {useGlobals} from '@storybook/manager-api';
import yaml from 'js-yaml';

import './AddonYaml.css';

const ADDON_ID = 'yamladdon';
const PANEL_ID = `${ADDON_ID}/panel`;

const YamlPanel = () => {
    const [params] = useArgs();
    const [globals] = useGlobals();

    const content = React.useMemo(
        () =>
            yaml.dump([params], {
                flowLevel: -1,
                lineWidth: -1,
                forceQuotes: true,
                skipInvalid: true,
            }),
        [params],
    );

    return (
        <ThemeProvider theme={globals.theme}>
            <div className="addon-yaml">
                <ClipboardButton text={content} />
                <pre>{content}</pre>
            </div>
        </ThemeProvider>
    );
};

addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'YAML',
        render: ({active, key}) => (
            <AddonPanel active={Boolean(active)} key={key}>
                <YamlPanel />
            </AddonPanel>
        ),
    });
});
