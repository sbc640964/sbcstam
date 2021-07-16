import {Route, Switch} from "react-router-dom";
import Permissions from "./Permissions";

function CompanyRouter (props)
{
    const {
        companyUrl,
        company,
    } = props;

    console.log(companyUrl)

    return(
        <Switch>
            <Route path={`${companyUrl}/permissions`}>
                <Permissions company={company}/>
            </Route>
        </Switch>
    )
}

export default CompanyRouter;