import ActiveColumn from "./ActiveColumn";

function Column(props)
{
    const {
        row,
        col,
        globalOptions
    } = props;

    const type = col.type ?? 'regular';

    const getContentColumn = function () {

        let _return;

        switch(col.type){

            case 'cal' :
                _return = col.cal(row, col, globalOptions);
                break;

            case 'active' :
                _return = <ActiveColumn {...props}/>;
                break;

            default :
                _return = <div>{row[col.selector] ?? ''}</div>;
                break;
        }

        return _return;
    }

    const styles = {wordBreak: 'break-word'};

    if(col.width){
        styles.width = col.width
        styles.flex =  `0 0 ${col.width}`
    }else{
        styles.flex =  '1 0 0px'
    }

    return(
        <div className="flex w-full" style={styles}>
            {getContentColumn()}
        </div>
    )
}

export default Column