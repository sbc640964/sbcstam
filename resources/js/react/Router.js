import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import _ from 'lodash';

import Products from "./Pages/Products/Products";
import NewProduct from "./Pages/Products/NewProduct";
import {useToasts} from "react-toast-notifications";
import React, {useEffect, useState} from "react";
import Profile from "./Pages/Profiles/Profile";
import Profiles from "./Pages/Profiles/Profiles";
import NewProfile from "./Pages/Profiles/NewProfile";
import Product from "./Pages/Products/Product";
import Orders from "./Pages/Orders/Orders";
import Settings from "./Pages/Settings/Settings";


// function _Route(props)
// {
//     const newProps = _.filter(props, (v,k) => k !== 'children');
//     console.log(props)
//     return (
//         <OriginalRoute
//             render={ (_props) => <Middleware {..._props} {...props}/> }
//             {...newProps}
//         />
//     )
//
// }
//
// const  Middleware = React.memo(function (props)
// {
//     const {
//         middleware, children
//     } = props;
//
//     // const {addToast} = useToasts();
//     //
//     // const [showNotifications, setShowNotifications] = useState(true)
//     //
//     // useEffect(() => {
//     //     if(middleware && showNotifications){
//     //
//     //         setShowNotifications(false);
//     //
//     //         addToast('error', {
//     //             type: 'error',
//     //             autoDismiss: true,
//     //         });
//     //
//     //     }
//     // },[])
//     //
//     // return showNotifications ?  children : <Redirect to="/companies" />;
//
//     return children;
//
// });

function Router()
{
    return(
        <Switch>
            <Route path="/products/new" middleware={true}>
                <NewProduct/>
            </Route>
            <Route path="/products/:productId" middleware={true}>
                <Product/>
            </Route>
            <Route path="/products">
                <Products/>
            </Route>

            <Route path="/profiles/new" middleware={true}>
                <NewProfile/>
            </Route>
            <Route path="/profiles/:profileId" middleware={true}>
                <Profile/>
            </Route>
            <Route path="/profiles">
                <Profiles/>
            </Route>

            <Route path="/sales/new" middleware={true}>
                <NewProfile/>
            </Route>
            <Route path="/sales/:orderId" middleware={true}>
                <Profile/>
            </Route>
            <Route path="/sales">
                <Orders/>
            </Route>

            <Route path="/settings/new" middleware={true}>
                <NewProfile/>
            </Route>
            <Route path="/settings">
                <Settings/>
            </Route>
        </Switch>
    )
}

export default Router;