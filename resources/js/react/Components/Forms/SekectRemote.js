import Description from "../typography/Description";
import Error from "./Error";
import _ from 'lodash';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useToasts} from "react-toast-notifications";

function SelectRemote(props)
{
    const {
        label,
        description,
        errors,
        className,
        urlOptions,
        selectorView,
        value,
        search:isSearch,
        placeholder,
        searchKey = 'label'
    } = props;

    const {addToast} = useToasts();

    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [originalOptions, setOriginalOptions] = useState([]);

    useEffect(() => {

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        if(isSearch){
            if(search.length >= 3){

                const param = (urlOptions.indexOf('?') >= 0 ? `&` : `?`) + `s=${search}`;

                setOriginalOptions(null);

                getData(urlOptions + param, source);

            }else{
                setOptions([]);
            }

            return () => source.cancel();
        }
        else{
            if(_.isEmpty(originalOptions)){

                getData(urlOptions);

            }else{
                getSearch();
            }

            return getSearch();
        }

    },[search]);

    const getData = (url, source= null) =>
    {
        axios.get(url, {
            cancelToken: source?.token,
        })
            .then(function (res){
                setOptions(res.data);
                setOriginalOptions(res.data);
            })
            .catch(function (err){
                addToast(err.message, {
                    type: 'error',
                    autoDismiss: true,
                });
            });
    }

    const getSearch = () =>
    {
        if(search.length){
            setOptions(_.filter(originalOptions, v => _.startsWith(v[searchKey], search)))
        }else{
            setOptions(originalOptions)
        }
    }

    const newProps = _.pickBy(props, (v, k) => !_.startsWith(k, "on") && k !== 'value' && k !== 'placeholder');

    const optionsElement = useRef(null);

    const handleClick = (item) =>
    {
        setShowOptions(false);
        props.onChange(item, 'select', props.name);
    }

    const _selectorView = (item) =>
    {
        if(typeof selectorView === 'function'){
            return selectorView(item);
        }else if(typeof selectorView === 'string'){
            if(_.isArray(item)) {
                return item[selectorView] ?? '';
            }
        }
    }

    const navigate = e =>
    {
        switch (e.key){
            case 'ArrowUp' :
                if(cursor) setCursor(c => c-1);
                e.preventDefault();
                break;
            case 'ArrowDown' :
                if(cursor < (options.length - 1) ) setCursor(c => c+1);
                e.preventDefault();
                break;
            case 'Enter' :
                if(options.length > 0) handleClick(options[cursor]);
                e.target.blur();
                e.preventDefault();
                break;
            default :

        }
    }

    const blurInput = (e) => {
        setSearch('');
        setShowOptions(false);
        setCursor(0);
    }

    const getBgValue = () =>
    {
        if(search){
            if(_.startsWith(options[cursor]?.label, search)){
                return options[cursor]?.label;
            }
        }else{
            return _selectorView(value) ?? '';
        }
        return '';
    }

    const textPlaceHolder = () =>
    {
        if (isSearch && search.length < 3) {
            return 'הקלד מינימום 3 תווים';
        }

        if (isSearch && search.length >=3 && _.isNull(originalOptions)) {
            return 'רק שניה...';
        }

        if ((isSearch && search.length >=3 && !_.isNull(originalOptions)) || (!isSearch && !options.length)) {
            return 'לא מצאנו שום דבר מתאים...';
        }

    }

    const classes = `${className ?? ''} relative rounded-lg bg-transparent focus:bg-white focus:bg-opacity-50 shadow-sm border-gray-300 block w-full placeholder-gray-400 transition duration-150 ease-in-out text-sm focus:ring-primary-200 focus:ring-2 focus:border-0 focus:border-primary-300`

    return(
        <>
            <div className="relative">
                <label className="font-medium text-gray-700 text-sm">
                    {label}
                    <div className="relative mt-1">
                        <input
                            value={getBgValue()}
                            type="text"
                            autoComplete="off"
                            className="text-sm absolute rounded-lg border-transparent top-0 left-0 h-full w-full"
                        />
                        <input
                            {...newProps}
                            placeholder={value ? '' : placeholder}
                            value={search}
                            type="text"
                            autoComplete="off"
                            className={classes}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setShowOptions(true)}
                            onKeyDown={navigate}
                            onBlur={(e) => setTimeout(() => blurInput(e), 200)}
                        />
                    </div>
                </label>
                {showOptions &&
                <div tabIndex={1} ref={optionsElement} className="max-h-60 absolute bg-white rounded-lg mt-1 shadow-lg block w-full top-full left-0 z-50 overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
                    {options.length
                        ? options.map((item, index) => (
                            <div tabIndex={index + 1} key={index} className={`${index === cursor ? 'bg-primary-200' : ''} p-2 hover:bg-primary-50 cursor-pointer`} onClick={() => handleClick(item)}>{_selectorView(item)}</div>
                        ))
                        : <div className="text-center p-4">
                            {textPlaceHolder()}
                          </div>


                    }
                </div>
                }
            </div>
            {errors &&
            <Error errors={errors}/>
            }
            {description &&
            <Description>{description}</Description>
            }
        </>
    )
}

export default React.memo(SelectRemote);