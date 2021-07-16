import {FiMapPin, WiStars} from "react-icons/all";
import {FiEdit3} from "react-icons/fi";
import _ from "lodash";
import CurrencyFormatSwitcher from "../../../Components/currencyFormatSwitcher";
import {useEffect, useState} from "react";

function WidgetsFlow (props)
{
    const {product} = props;

    const [statuses, setStatuses] = useState({
        allExpenses: 0,
        allExpectExpenses: 0,
    })
    
    useEffect(() => {
        setStatuses({
            allExpenses: allExpenses(),
            allExpectExpenses: allExpectExpenses(),
        })
    },[product])
    
    const allExpenses = () => {

        let expenses = product.expense;

        product.children.map( v => {
            expenses.push(...v.expense);
            return v
        });

        expenses = _.uniqBy(expenses, 'id');

        return {
            USD: _.sumBy(expenses, `amount.USD`),
            ILS: _.sumBy(expenses, `amount.ILS`),
        }
    }

    const allExpectExpenses = () =>
    {
        let calcProducts = product.children.length ? product.children : [product];

        let scribe = _.groupBy(calcProducts, 'currency');
        let global = _.groupBy(product.name.expect_expenses, 'currency')

        let total = {
            USD: 0,
            ILS: 0,
        };

        _.forEach(scribe, (v, k) => {
            total[k] += _.sumBy(v, a => a.payment_units * a.cost_unit)
        });

        _.forEach(global, (v, k) => {
            total[k] += _.sumBy(v, 'cost')
        });
        let t = _.clone(total);
        total.USD += t.ILS / window.exchangeRatesUSD;
        total.ILS +=  t.USD * window.exchangeRatesUSD;
       return total
    }

    return(
        <div className="col-span-12">
            <div className="flex space-s-4 justify-between">
                <div className="bg-gray-50 rounded-lg flex items-center w-full shadow overflow-hidden">
                    <div className="p-6 w-full">
                        <div className="font-bold text-lg">תזרים הוצאות</div>
                        <div className="flex justify-between w-full mt-4">
                            <div className="flex flex-col">
                                <span className="text-sm">הוצאות בפועל:</span>
                                <span className="text-xl font-bold"><CurrencyFormatSwitcher>{product.expenses_data.total_expenses}</CurrencyFormatSwitcher></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm">צפי:</span>
                                <span className="text-xl font-bold"><CurrencyFormatSwitcher>{product.expenses_data.total_expect_expenses}</CurrencyFormatSwitcher></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm">רווח מכירה:</span>
                                <span className="text-xl font-bold"><CurrencyFormatSwitcher>{statuses.allExpenses}</CurrencyFormatSwitcher></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WidgetsFlow;