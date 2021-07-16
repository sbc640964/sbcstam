import Button from "./Button";

function SecondaryButton (props)
{
    return(
        <Button
            className=" bg-gray-400 text-white hover:bg-gray-300"
            {...props}
        >
            {props.children}
        </Button>
    )
}

export default SecondaryButton;