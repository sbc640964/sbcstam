import React, {useReducer} from 'react';

import {FiBox, FiGitPullRequest, FiPieChart, FiSettings, FiUsers, FiShoppingCart} from 'react-icons/fi';
import {BrowserRouter as Router,} from 'react-router-dom';
import Switch from "./Router";
import NavItem from "./Components/Nav/NavItem";
import {ToastProvider} from 'react-toast-notifications';
import Notifications from "./Components/Notifications/Notifications";
import {AnimatePresence, motion} from "framer-motion"
import globalReducer, {initialState} from "./redusers";

import Context from "./context";
import CurrencySwitcher from "./Pages/layout/CurrencySwitcher";
import axios from "axios";

function App() {

    const [globalState, dispatch] = useReducer(globalReducer, initialState);

    axios.get(window.baseApiPath + '/exchange-rates/USD').then(r => window.exchangeRatesUSD = r.data);

    const MyToast = (props) => {
        //console.log(props)
        return(
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Notifications {...props}/>
                </motion.div>
            </AnimatePresence>
        )
    }

  return (
  <Context.Provider value={{globalState: globalState, dispatch: dispatch}}>
      <ToastProvider
          components={{Toast: MyToast}}
      >
          <Router>
              <div className="flex min-h-screen">
                  <header className="flex bg-white w-full h-16 fixed justify-between items-center shadow z-50">
                      {/*Logo*/}
                      <div className="flex items-center justify-center text-primary-900 w-64 font-bold text-2xl">
                          SBC STAM
                      </div>
                      <div className="pe-4">
                          <CurrencySwitcher/>
                      </div>
                  </header>
                  <aside className="bg-gray-900 border-e min-h-full w-64 fixed mt-16">
                      {/*Nav Links*/}
                      <ul>
                          <NavItem label="סקירה כללית" icon={FiPieChart} to='/' strict/>
                          <NavItem label="מוצרים" icon={FiBox} to='/products'/>
                          <NavItem label="פרופילים" icon={FiUsers} to='/profiles'/>
                          <NavItem label="תזרים כספים" icon={FiGitPullRequest} to='/cash-flow'/>
                          <NavItem label="מכירות" icon={FiShoppingCart} to='/sales'/>
                          <NavItem label="הגדרות" icon={FiSettings} to='/settings'/>
                      </ul>
                  </aside>
                  <section className="min-h-full w-full px-20 pb-16 pt-28 ms-64">
                      <div className="m-auto max-w-8xl">
                          <Switch/>
                      </div>
                  </section>
              </div>
          </Router>
      </ToastProvider>
  </Context.Provider>

  );
}

export default App;
