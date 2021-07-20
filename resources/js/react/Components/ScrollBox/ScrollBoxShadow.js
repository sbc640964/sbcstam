import {useEffect, useRef, useState} from "react";

function ScrollBoxShadow (props)
{
    const {
        maxHeight,
        children
    } = props;

    const [shadows, setShadows] = useState({top: false, bottom:false})
    const scrollBoxElement = useRef(null);

    useEffect(() => {
        if(scrollBoxElement.current){
            checkScroll(scrollBoxElement.current)
        }
    },[children]);

    const checkScroll = e =>
    {
        const {scrollTop, clientHeight, scrollHeight} = (e.target ? e.target : e);

        let _shadows  = {top: false, bottom: false};

        if(clientHeight < scrollHeight){
            _shadows.bottom = true;
        }

        if(scrollTop === 0){
            _shadows.top = false;
            return setShadows(_shadows);
        }else if (scrollTop === scrollHeight - clientHeight){
            _shadows.bottom = false;
            _shadows.top = true;
            return setShadows(_shadows);
        }

        setShadows({top: true, bottom: true});
    }

    return(
        <div className={`relative ${shadows.bottom ? 'bottom-shadow' : ''} ${shadows.top ? 'top-shadow' : ''} h-full`}>
            <div
                className="h-full scrollbar-thumb-gray-500 scrollbar-thin overflow-auto scrollbar-track-gray-200"
                onScroll={checkScroll}
                style={{maxHeight: maxHeight}}
                ref={scrollBoxElement}
            >
                {children}
            </div>
        </div>
    )
}

export default ScrollBoxShadow;
