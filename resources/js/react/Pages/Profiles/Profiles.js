import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Card from "../../Components/Cards/Card";
import Table from "../../Components/Table/Table";
import Heading1 from "../../Components/typography/Heading1";

import {FiPhone} from 'react-icons/fi';
import {FaRegEnvelope} from 'react-icons/fa';
import {Link} from "react-router-dom";

import ProductNames from "../../ObjectsData/Products";
import TypeWriting from "../../ObjectsData/TypeWriting";
import ProductStatuses from "../../ObjectsData/ProductStatuses";



///company name column
function ProfileName (row, col, options)
{
    return(
        <div className="">
            <p>
                <Link to={`/profiles/${row.id}`} className="font-semibold hover:text-primary-600">
                    {row.first_name} {row.last_name}
                </Link>
            </p>
            <span className="mt-1 block text-sm text-gray-400 flex space-s-3">
                {(row.phone || row.tel) &&
                    <span className="flex space-s-1.5 items-center">
                        <span><FiPhone/></span>
                        <span>{row.phone ?? row.tel}</span>
                    </span>
                }
                {row.email &&
                    <span className="flex space-s-1.5 items-center">
                        <span><FaRegEnvelope/></span>
                        <span>{row.email}</span>
                    </span>
                }
            </span>
        </div>
    )
}

function ProfileRoles (row, col, options)
{
    return(
        <div className="flex space-s-1 items-start flex-wrap text-xs">
            {row.roles && row.roles.map((role, index) => (
                <span
                    className="px-2 py-0.5 leading-none flex items-center justify-center bg-gray-200 text-gray-700 rounded-full"
                    key={index}
                >
                    {role.name}
                </span>
            ))}
        </div>
    )
}

function Products (props)
{
    return(
        <>
            <div className="flex justify-between">
                <Heading1>פרופילים</Heading1>
                <div>
                    <PrimaryButton to="/profiles/new">
                        פרופיל חדש
                    </PrimaryButton>
                </div>
            </div>
            <Card>
                <Table.Remote
                    options={{
                        selectedRows: true,
                        perPage: 25,
                    }}
                    columns={[
                        {label: 'מזהה', selector: 'id', width: '60px'},
                        {label: 'שם', type: 'cal', cal: ProfileName },
                        {label: 'תפקיד', type: 'cal', cal: ProfileRoles},
                        {label: 'מצב כספי', selector: 'cost'},
                        {label: 'פעיל', selector: 'active', type: 'active', width: '60px', options : {withText: false}}
                    ]}
                    url={window.baseApiPath + '/profiles?per_page=20'}
                />
            </Card>
        </>
    )
}

export default Products;