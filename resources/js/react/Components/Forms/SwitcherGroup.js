import {useEffect, useState} from "react";
import Switcher from "./Switcher";
import _ from 'lodash';
import axios from "axios";
import Error from "./Error";
import Description from "../typography/Description";

function SwitcherGroup (props)
{
    const {
        options:_options,
        urlOptions,
        name,
        label,
        selectorView,
        onChange,
        values:originalValues,
        errors,
        description
    } = props;

    const [options, setOptions] = useState([]);

    console.log(typeof originalValues, originalValues)

    const values = originalValues.map(v => _.omitBy(v, (v, k) => k === 'pivot'));

    const handleChange = ({type, name: item, checked}) =>
    {
        if(typeof onChange !== 'function'){
            return;
        }

        if(checked && !_.find(values, v => _.isEqual(v, item))){
            let v = _.cloneDeep(values)
            v.push(item);
            onChange({name: name, value: v});
        }else{
            let v = _.filter(values, v => !_.isEqual(item, v))
            onChange({name: name, value: v});
        }

    }

    useEffect(() => {
        if(urlOptions){
            axios.get(urlOptions)
                .then(function (res){
                    setOptions(res.data)
                })
        }else{
            setOptions(_options);
        }
    },[])

    return(
        <div>
            {options && options.map((item, index) => (
                <Switcher
                    key={index}
                    checked={_.find(values, v => _.isEqual(v, item))}
                    label={!index ? label : false}
                    disabledLabel={item[selectorView]}
                    enabledLabel={item[selectorView]}
                    onChange={handleChange}
                    name={item}
                />
            ))}
            {errors &&
            <Error errors={errors}/>
            }
            {description &&
            <Description>{description}</Description>
            }
        </div>
    )
}

export default SwitcherGroup;