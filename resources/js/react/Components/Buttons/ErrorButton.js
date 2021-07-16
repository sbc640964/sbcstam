import Button from "./Button";

function ErrorButton(props)
{
    return(
        <Button
            className="bg-error-600 text-white hover:bg-error-500"
            {...props}
        >
            {props.children}
        </Button>
    )
}

export default ErrorButton;