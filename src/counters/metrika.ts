const HIT_COUNTERS = ['main', 'cross-site', 'scale'];

const counterIds: Record<string, string> = {};

function getCounter(name: string) {
    const counterId = counterIds[name];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as unknown as Record<string, any>)['yaCounter' + counterId];
}

export function initCounters(configs: Record<string, string>[]) {
    configs.forEach((config) => {
        counterIds[config.name] = config.id;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hit(...args: any[]) {
    HIT_COUNTERS.forEach((counterName) => {
        const counter = getCounter(counterName);

        if (!counter) {
            return;
        }

        counter.hit(...args);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function params(...args: Record<string, any>[]) {
    const counter = getCounter('main');

    if (!counter) {
        return;
    }

    counter.params(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reachGoal(counterName: string, ...args: any[]) {
    const counter = getCounter(counterName);

    if (!counter) {
        return;
    }

    counter.reachGoal(...args);
}

function reachGoals(goals: string | object, counterName = 'main') {
    if (!goals) {
        return;
    }

    const goalsArray = Array.isArray(goals) ? goals : [goals];

    goalsArray.forEach((goal) => {
        if (typeof goal === 'object') {
            reachGoal(counterName, goal.name, goal.params);
        } else {
            reachGoal(counterName, goal);
        }
    });
}

// eslint-disable-next-line complexity
function getServicePrefix(id: string) {
    switch (id) {
        case 'compute':
            return 'CMPT';
        case 'iam':
            return 'IAM';
        case 'vpc':
            return 'VPC';
        case 'storage':
            return 'STRG';
        case 'speechkit':
            return 'SK';
        case 'managed-clickhouse':
            return 'CH';
        case 'managed-mongodb':
            return 'MONGO';
        case 'managed-postgresql':
            return 'POSTGR';
        case 'managed-redis':
            return 'MR';
        case 'managed-mysql':
            return 'MMSQL';
        case 'managed-kubernetes':
            return 'MK';
        case 'translate':
            return 'TRSL';
        case 'instance-groups':
            return 'INSTGR';
        case 'load-balancer':
            return 'LB';
        case 'message-queue':
            return 'MQ';
        case 'datalens':
            return 'DL';
        case 'monitoring':
            return 'MNTRG';
        case 'data-proc':
            return 'DP';
        case 'kms':
            return 'KMS';
        case 'ydb':
            return 'YDB';
        case 'interconnect':
            return 'INTRCNCT';
    }

    return undefined;
}

function getMarketPlacePrefix(id: string) {
    return `product_${id}_`;
}

function goalGoToConsole(prefix: string) {
    return prefix && `${prefix}GOTOCONSOLE`;
}

function goalGoToForm(prefix: string) {
    return prefix && `${prefix}GOTOFORM`;
}

function goalGoToDocs(prefix: string) {
    return prefix && `${prefix}GOTODOCS`;
}

function goalFormSubmit(prefix: string) {
    return prefix && `${prefix}FORMSUBMIT`;
}

function goalEventFormSubmit(id: string) {
    return `event${id || 's'}_form_submit`;
}

function goalEventVideoAction(id: string, action: string) {
    return `event${id}_video_${action}`;
}

function goalCaseFormSubmit(id: string) {
    return `case${id ? `_${id}` : 's'}_form_submit`;
}

function goalSwitchLang(place: string) {
    return `SWITCH_LANG_${place}`;
}

export default {
    hit,
    params,
    reachGoal,
    reachGoals,
    getServicePrefix,
    getMarketPlacePrefix,
    goalGoToConsole,
    goalGoToForm,
    goalGoToDocs,
    goalFormSubmit,
    goalEventFormSubmit,
    goalEventVideoAction,
    goalCaseFormSubmit,
    goalSwitchLang,
};
