import TableRemote from "./TableRemote";
import TableLocal from "./TableLocal";

function Table(props)
{
    if(props.remote){
        return <TableRemote {...props} />
    }

    return <TableLocal {...props} />
}

Table.Remote = TableRemote;
Table.Local = TableLocal;

export default Table;