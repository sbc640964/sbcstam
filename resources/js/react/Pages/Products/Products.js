import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";
import Table from "../../Components/Table/Table";
import Heading1 from "../../Components/typography/Heading1";

import {FiLink} from 'react-icons/fi';
import {Link} from "react-router-dom";

import _ from 'lodash';

import ProductNames from "../../ObjectsData/Products";
import TypeWriting from "../../ObjectsData/TypeWriting";
import ProductStatuses from "../../ObjectsData/ProductStatuses";


///company name column
function ProductName (row, col, options)
{
    return(
        <div className="">
            <p>
                <Link to={`/products/${row.id}`} className="font-semibold hover:text-primary-600">
                    {row.name.label}
                </Link>
                <span className="text-sm text-gray-400 ms-2 font-semibold">
                    {row.size}
                </span>
            </p>
            <span className="mt-1 block text-sm text-gray-400 flex space-s-3">

                <span>
                    {row.type_writing.label}
                </span>
                <span>
                    <span className="font-semibold">רמה: </span>
                    {row.level}
                </span>
            </span>
        </div>
    )
}

function SellerName(row, col, options)
{
    return(
        <div>
            {row.seller.first_name} {row.seller.last_name}
        </div>
    )
}

function Products (props)
{
    return(
        <>
            <div className="flex justify-between">
                <Heading1>מוצרים</Heading1>
                <div>
                    <PrimaryButton to="/products/new">
                        מוצר חדש
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
                        {label: 'שם המוצר', sortable: true, type: 'cal', cal: ProductName },
                        {label: 'מוכר', type: 'cal', cal: SellerName},
                        {label: 'עלות', selector: ''},
                        {label: 'סטטוס', type: 'cal', cal: (row, col, options) => _.find(ProductStatuses, v => v.value == row.status)?.label },
                        {label: 'נמכר', selector: 'active', type: 'active', sortable: true, options : {withText: false}}
                    ]}
                    url={window.baseApiPath + '/products'}
                />
            </Card>
        </>
    )
}

export default Products;
