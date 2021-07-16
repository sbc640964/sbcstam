import _ from 'lodash';

function Error(props)
{
    if(!props.errors) return '';

    const errors = _.isArray(props.errors) ? props.errors : [props.errors];

    return(
        <div>
            {errors.map((v, k) => (
                <p className="text-error-400 text-sm mt-1" key={k}>{v}</p>
            ))}
        </div>
    )
}

export default Error;