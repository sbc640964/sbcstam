import useModal from "./useModal";

function useBaseModal (props)
{
    //const rootElement = document.querySelector('#root');
    const rootElement = document.body;

    return useModal({
        background: "rgba(0, 0, 0, 0.5)",
        closeOnOutsideClick: false,
        onOpen: () => {
            rootElement.style.overflow = 'hidden'
            rootElement.style.height = '100vh'
        },
        onClose: () => {
            rootElement.style.overflow = 'auto'
            rootElement.style.height = 'auto'
        },
    });

}

export default useBaseModal;
