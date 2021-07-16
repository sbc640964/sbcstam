import _ from 'lodash';

export const initialState = {
    currency: 'ILS',
};

const currencies = [
    'ILS',
    'USD'
];
export default function globalReducer(state, action)
{
    switch (action.type) {
        case 'changeCurrency':
            let newState = _.cloneDeep(state);
            const index = _.findIndex(currencies, v => v === newState.currency);
            newState.currency = currencies[index === 0 ? 1 : 0];
            return newState;
        default:
            throw new Error();
    }

}