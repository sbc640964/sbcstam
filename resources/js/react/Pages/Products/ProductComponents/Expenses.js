import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import Card from "../../../Components/Cards/Card";
import CurrencyFormatSwitcher from "../../../Components/currencyFormatSwitcher";
import _ from 'lodash';
import TableLocal from "../../../Components/Table/TableLocal";
import 'moment/locale/he';
import moment from "moment";
import {FaRegSmileWink} from "react-icons/all";

function Expenses (props)
{
    const {
        status,
        expense,
        children,
    } = props.product;

    let expenses = expense;

    children.map( v => {
        expenses.push(...v.expense);
    return v
});

    expenses = _.sortBy(_.uniqBy(expenses, 'id'), 'created_at');

    return(
        <Card className="col-span-12">
            <div className="grid grid-cols-3 gap-6 py-4 px-5">
                <div className="col-span-12">
                    <Heading3>הוצאות</Heading3>
                    <Description>פרטים אודות המוצר</Description>
                </div>
                <div className="col-span-12 flex flex-col divide-y text-gray-800">
                    <TableLocal
                        options={{
                            selectedRows: false,
                            perPage: 10,
                        }}
                        callback={<NoFindExpanses/>}
                        rows={expenses}
                        columns={[
                            {label: 'תאריך רישום', type: 'cal', cal: row => moment(row.created_at).locale('he').format('Do/MM/Y')},
                            {label: 'סכום',  type: 'cal', cal: (row, col, options) =>
                                    <div className="font-bold">
                                        <CurrencyFormatSwitcher>{row.amount}</CurrencyFormatSwitcher>
                                    </div>
                            },
                            {label: 'עבור', type: 'cal', cal: row =>
                                    <div>
                                        <div className="font-semibold">{row.type.label}</div>
                                        <div className="text-xs">{row.note}</div>
                                    </div>

                            },
                            {label: 'ל', type: 'cal', cal: row => row.to.full_name},
                            {label: 'מוצר משנה', type: 'cal', cal: row =>
                                    <div>
                                        {row.product_id === props.product.id ? '' : row.product.description}
                                    </div>
                            }
                        ]}
                    />
                </div>
            </div>
        </Card>
    )
}

export default Expenses;


function NoFindExpanses (props)
{
    return(
        <div className="text-9xl text-gray-300 flex flex-col items-center space-y-4 justify-center">
            <FaRegSmileWink/>
            <div className="text-lg text-gray-400">
                הלוואי שלא תשלם אף פעם הוצאות...
            </div>
        </div>
    )
}