import Button from "./Button";

function PrimaryButton(props)
{
    return(
        <Button
            className="bg-primary-600 text-white hover:bg-primary-500"
            {...props}
        >
            {props.children}
        </Button>
    )
}

export default PrimaryButton;