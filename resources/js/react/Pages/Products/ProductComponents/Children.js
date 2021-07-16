import Card from "../../../Components/Cards/Card";
import Heading3 from "../../../Components/typography/Heading3";
import Description from "../../../Components/typography/Description";
import Child from "./Child";
import {useEffect, useState} from "react";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

function ChildrenProduct (props)
{
    const {
        product,
        setProduct
    } = props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(product.status.value === 1 || product.status.value === 2){
            setOpen(true)
        }
    },[product])

    return (
        <Card className="col-span-12">
            <div className="grid grid-cols-3 gap-6 py-4 px-5" id="children">
                <div className="col-span-12 flex justify-between items-center">
                    <div>
                        <Heading3>{product.type === 'package' ? product.name.children.labels[0] : 'מוצרים בחבילה'}</Heading3>
                        <Description>מוצרים משוייכים למוצר זה</Description>
                    </div>
                    <div className="pe-2">
                        <span onClick={() => setOpen(v => !v)} className="cursor-pointer hover:opacity-80 text-lg">
                            {open
                                ? <FiChevronUp/>
                                : <FiChevronDown/>
                            }
                        </span>
                    </div>
                </div>
                {open &&
                    <div
                        className="col-span-12 grid grid-cols-4 gap-4 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-gray-100 pe-5"
                        style={{maxHeight: '780px'}}>
                        {product.children.length && product.children.map((child, index) => (
                            <Child product={product} child={child} setProduct={setProduct} key={index}/>
                        ))}
                    </div>
                }
            </div>
        </Card>
    )
}

export default ChildrenProduct;