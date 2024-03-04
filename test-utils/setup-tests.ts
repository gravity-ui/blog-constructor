import {Lang, configure as uiKitConfigure} from '@gravity-ui/uikit';
import {configure} from '@testing-library/dom';
import {Lang, configure as uiKitConfigure} from '@gravity-ui/uikit';

uiKitConfigure({
    lang: Lang.En,
});

configure({testIdAttribute: 'data-qa'});
