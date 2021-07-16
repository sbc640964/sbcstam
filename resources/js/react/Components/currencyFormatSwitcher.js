import {useContext} from "react";
import Context from "../context";
import _ from 'lodash';

function CurrencyFormatSwitcher (props)
{
    const {globalState} = useContext(Context);

    const {currency} = globalState;

    if(!_.isObject(props.children ?? props.amount)){
        return props.children ?? props.amount;
    }

    const amount = props.children[currency] ?? props.amount[currency];

    const format = Intl.NumberFormat().format(parseFloat(amount).toFixed(2)) + ' ' + (globalState.currency === 'ILS' ? '₪' : '$');

    return(
        format
    )
}

export default CurrencyFormatSwitcher;