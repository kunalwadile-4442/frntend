/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useUiReducer } from '../../redux/getdata/useUiReducer'
import { useDispatch } from 'react-redux'
import { setFullScreen } from '../../redux/actions/action'
import { App_url } from '../../utils/constants/static'
import SpinnerSm from './loader/SpinnerSm'
interface IFullScreen {
    children: React.ReactNode
}
const FullScreen: React.FC<IFullScreen> = ({ children }) => {
    const { FullScreen } = useUiReducer()
    const dispatch = useDispatch()
    const screenRef = useRef(null);



    // useEffect(() => {
    //     const handleBackNavigation = (event: PopStateEvent) => {
    //         dispatch(setFullScreen({ show: 'HIDE' }));
    //     };

    //     window.addEventListener("popstate", handleBackNavigation);

    //     return () => {
    //         window.removeEventListener("popstate", handleBackNavigation);
    //     };
    // }, [])

    useEffect(() => {
        const elem = screenRef.current;

        if (FullScreen?.show === "OPEN" && elem) {
            if (!document.fullscreenElement) {
                elem.requestFullscreen({ navigationUI: "hide" })
                    .catch((err) => console.error("Fullscreen error:", err));
            }
        }

        // Handle Fullscreen Exit
        const handleFullscreenExit = () => {
            if (!document.fullscreenElement) {
                dispatch(setFullScreen({ show: 'HIDE' })); // Dispatch on exit
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenExit);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenExit);
        };
    }, [FullScreen, dispatch]);





    if (FullScreen?.show === 'OPEN')
        return ReactDOM.createPortal(
            <div className='absolute w-screen h-screen ' ref={screenRef}>
                {FullScreen?.loader && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 z-50">
                        <SpinnerSm className='w-24 h-24 !border-[6px] border-t-transparent border-white' />
                    </div>
                )}
                {children}
                <div
                    onClick={() => dispatch(setFullScreen({ show: 'HIDE' }))}
                    className="absolute top-2 right-4 px-2 py-2 cursor-pointer hover:bg-primary_300 transition rounded-md"
                >
                    <img src={App_url.image.fullscreenexit} className='h-8 w-8' />
                </div>
            </div>, document.body
        )
    return null;
}

export default FullScreen