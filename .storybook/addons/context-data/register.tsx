import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import {PureArgsTable} from '@storybook/blocks';
import {AddonPanel, Badge, Spaced} from '@storybook/components';
import {addons, types, useArgs, useArgTypes, useGlobals} from '@storybook/manager-api';

const ADDON_ID = 'context-data';
const PANEL_ID = `${ADDON_ID}/panel`;
const PARAM_KEY = 'contextData';
const CONTROLS_PANEL_ID = 'addon-controls';

type ContextData = Record<string, unknown>;

const BlockPropsTitle = () => {
    const rows = useArgTypes() || {};
    const controlsCount = Object.values(rows).filter(
        (argType) => argType?.control && !argType?.table?.disable,
    ).length;

    return (
        <div>
            <Spaced col={1}>
                <span style={{display: 'inline-block', verticalAlign: 'middle'}}>Block Props</span>
                {controlsCount > 0 && <Badge status="neutral">{controlsCount}</Badge>}
            </Spaced>
        </div>
    );
};

const ContextDataPanel = () => {
    const [args, updateArgs, resetArgs] = useArgs();
    const [globals] = useGlobals();
    const contextData = React.useMemo(
        () => (args?.contextData || {}) as ContextData,
        [args?.contextData],
    );
    const rows = React.useMemo(
        () =>
            Object.keys(contextData).reduce<Record<string, object>>((result, key) => {
                result[key] = {
                    name: key,
                    type: {name: 'object'},
                    control: {type: 'object'},
                };
                return result;
            }, {}),
        [contextData],
    );
    const updateContextData = React.useCallback(
        (updates: ContextData) => updateArgs({contextData: {...contextData, ...updates}}),
        [contextData, updateArgs],
    );
    const resetContextData = React.useCallback(() => resetArgs(['contextData']), [resetArgs]);

    return (
        <ThemeProvider theme={globals.theme}>
            <PureArgsTable
                rows={rows}
                args={contextData}
                updateArgs={updateContextData}
                resetArgs={resetContextData}
                inAddonPanel
            />
        </ThemeProvider>
    );
};

addons.register(ADDON_ID, () => {
    const controlsPanel = addons.getElements(types.PANEL)[CONTROLS_PANEL_ID];

    if (controlsPanel) {
        addons.add(CONTROLS_PANEL_ID, {...controlsPanel, title: BlockPropsTitle});
    }

    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Context Data',
        paramKey: PARAM_KEY,
        render: ({active, key}) => (
            <AddonPanel active={Boolean(active)} key={key}>
                <ContextDataPanel />
            </AddonPanel>
        ),
    });
});
