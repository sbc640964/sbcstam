import Card from "../Cards/Card";

function Cards ()
{
    return(
        <div className="flex flex-col space-y-6">
            <Card className="h-60 animate-pulse">
            </Card>
            <Card className="h-60 animate-pulse">
            </Card>
            <Card className="h-60 animate-pulse">
            </Card>
        </div>
    )
}

export default Cards;