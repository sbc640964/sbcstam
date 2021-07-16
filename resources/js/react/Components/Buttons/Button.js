import _ from 'lodash';
import {useHistory} from 'react-router-dom'

function Button (props)
{
    const {
        _class,
        className,
        size,
        to,
        onClick,
        disabled:d,
        tag,
    } = props;

    const history = useHistory();

    const disabled = d === true;


    const sizeClasses = {
        xs: 'p-1.5 px-3.5 text-xs',
        sm: 'p-1.5 px-3.5 text-sm',
        base: 'p-2 px-4 text-sm',
        lg: 'p-3 px-5 text-sm',
    }[size ?? 'base'];

    const handleClick = () => {
        if(to !== undefined && _.isString(to)){
            return history.push(to)
        }else{
            if(typeof onClick == "function") onClick();
        }
    }

    const defaultClassName = 'rounded-lg font-semibold cursor-pointer';

    const disabledClasses = 'cursor-not-allowed opacity-60';

    const TagName = tag ?? 'button';

    return (
        <TagName
            className={(_class ?? '') + ' ' + className + ' ' + defaultClassName + ' ' + sizeClasses + (disabled ? ' ' + disabledClasses : '')}
            onClick={handleClick}
            disabled={disabled}
        >
            {props.children}
        </TagName>
    )
}

export default Button;
