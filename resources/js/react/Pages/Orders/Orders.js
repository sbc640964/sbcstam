import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";
import Table from "../../Components/Table/Table";
import Heading1 from "../../Components/typography/Heading1";
import {Link} from "react-router-dom";
import _ from 'lodash';
import ProductStatuses from "../../ObjectsData/ProductStatuses";

function Orders (props)
{
    return(
        <>
            <div className="flex justify-between">
                <Heading1>מכירות</Heading1>
                <div>
                    <PrimaryButton to="/orders/new">
                        מכירה חדשה
                    </PrimaryButton>
                </div>
            </div>
            <Card>
                <Table.Remote
                    options={{
                        selectedRows: false,
                        perPage: 25,
                    }}
                    columns={[
                        {label: 'מזהה', selector: 'id', width: '60px'},
                        {label: 'קונה', selector: 'full_name' },
                        {label: 'סכום', selector: 'cost'},
                        {label: 'סטטוס', type: 'cal', cal: (row, col, options) => _.find(ProductStatuses, v => v.value == row.status)?.label },
                    ]}
                    url={window.baseApiPath + '/orders'}
                />
            </Card>
        </>
    )
}

export default Orders;