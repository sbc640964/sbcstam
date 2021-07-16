import {useContext} from "react";
import {BiShekel, BiDollar} from "react-icons/bi";
import Context from "../../context";

function CurrencySwitcher (props)
{
    const {globalState, dispatch} = useContext(Context)

    return(
        <div
            className="h-10 w-10 flex justify-center items-center text-2xl leading-none cursor-pointer transition bg-primary-200 hover:bg-blue-700 text-white rounded-full"
            onClick={() => dispatch({type: 'changeCurrency'})}
        >
              <span>
                 {globalState.currency === 'ILS'
                     ? <BiDollar/>
                     : <BiShekel/>
                 }
              </span>
        </div>
    )
}

export default CurrencySwitcher;