import React, { useEffect } from "react";
import usePortal from "react-useportal";

export const useDropdown = ({ width, height, onOpen, ...config } = {}) => {
    const { isOpen, togglePortal, Portal, ref: targetRef, portalRef } = usePortal(
        {
            onOpen(args) {
                const { portal, targetEl } = args;
                const clickedEl = targetEl.current;
                console.log("clickedEl", clickedEl);
                const { top, bottom, left, right } = clickedEl.getBoundingClientRect();
                let l = left;
                let t = top + clickedEl.clientHeight;
                const outRight = window.innerWidth < left + clickedEl.offsetWidth;
                const outBottom =
                    window.innerHeight < top + portal.current.clientHeight;
                const outTop = false;
                const outLeft = false;
                if (outRight) {
                    l = window.innerWidth - (right - left + clickedEl.offsetWidth);
                } else if (outLeft) {
                    /* very uncommon, implement later */
                }
                if (outBottom) {
                    t = window.innerHeight - (bottom - top + height);
                } else if (outTop) {
                    /* very uncommon, implement later */
                }
                portal.current.style.cssText = `
        width: ${clickedEl.offsetWidth}px;
        position: fixed;
        top: ${t}px;
        left: ${l}px;
        background: #ffff;
        z-index: 1000
			`;
                if (onOpen) onOpen(args);
            },
            onScroll({ portal }) {
                console.log("SCROLLING");
                // TODO: add logic so when scrolling, the portal doesn't get displaced
            },
            onResize() {
                // TODO: need to implement for when it's outside of viewport
            },
            ...config
        }
    );

    // const onResize = ({ target: screen }) => {
    //   const { left, right } = targetRef.current.getBoundingClientRect()
    //   const l = screen.innerWidth - (right - left + width)
    //   portalRef.current.style.left = `${l}px`
    // }

    // useEffect(() => {
    //   window.addEventListener('resize', onResize)
    //   return () => {
    //     window.removeEventListener('resize', onResize)
    //   }
    // })

    return {
        Dropdown: props => (
            <Portal>
                <div style={{zIndex: 1000}} {...props} />
            </Portal>
        ),
        toggleDropdown: togglePortal,
        isOpen
    };
};
