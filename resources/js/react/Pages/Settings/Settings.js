import Heading1 from "../../Components/typography/Heading1";
import Card from "../../Components/Cards/Card";
import Form from '../../Components/Forms'
import NewTemplateForm from "./NewTeamplateForm";

function Settings(props)
{
    return(
        <div>
            <div>
                <Heading1>הגדרות</Heading1>

                <ul className="flex justify-between space-s-6 mb-6">
                    {[
                        'תבניות מוצר',
                        'סטטוס מוצר',
                        'סטטוס מכירה',
                        'סוגי כתב',
                        'תפקידים',
                    ].map((v,k) => (
                        <li className="bg-gray-50 p-2 rounded-lg flex-grow">
                            {v}
                        </li>
                    ))}
                </ul>

                <Card>
                    <div className="flex justify-between space-s-8">
                        <div className="w-1/3 p-8">
                            <NewTemplateForm/>
                        </div>
                        <div className="flex-grow">
                            <div>

                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Settings;