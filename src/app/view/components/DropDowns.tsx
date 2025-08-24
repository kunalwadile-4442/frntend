import React, { useState } from 'react'
import Icon from './Icon'
import SpinnerSm from './loader/SpinnerSm'

interface IDropDown {
    label?: string, loader?: boolean, option?: { label: string, value: string, callBack: Function, icon?: any }[]
}
const DropDowns: React.FC<IDropDown> = ({ label, option, loader }) => {
    const [Open, setOpen] = useState(false)
    function onCallBack(item) {
        item?.callBack(item)
        setOpen(false)
    }
    return (
        <div className="relative inline-block text-left"  // Close menu on blur
        >
            <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setOpen(prev => !prev)}>
                    {loader ? <SpinnerSm /> : null}
                    {label}
                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>


            {Open && <div className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white ring-1 shadow-xl ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-1" role="none">
                    {option?.map(item => (
                        <div className='flex gap-2 items-center p-2 hover:bg-gray-200 cursor-pointer' onClick={() => onCallBack(item)} onBlur={() => setOpen(false)}>
                            <Icon attrIcon={item?.icon} />
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>}
        </div>

    )
}

export default DropDowns