import {AnalyticsEvent, PredefinedEventTypes} from '@gravity-ui/page-constructor';

export const createExtendedEvent = (name: string): AnalyticsEvent => ({
    name,
    type: PredefinedEventTypes.Extended,
});
