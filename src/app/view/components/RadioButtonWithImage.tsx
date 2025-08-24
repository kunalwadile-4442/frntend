/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

type RadioButtonProps = {
    label?: string;
    value?: string;
    name?: string;
    email?: string;
    isChecked?: boolean;
    error?: any;
    control?: any;
    controlName?: string;
    register?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    className?: string;
    imgSrc?: any;
    imgAlt?: any;
};

const RadioButtonWithImage: React.FC<RadioButtonProps> = ({
    label,
    value,
    name,
    email,
    isChecked,
    error,
    control,
    controlName,
    register,
    onChange,
    onClick,
    className,
    imgSrc,
    imgAlt
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleClick = () => {
        if (onChange) {
            onChange({ target: { value, name } } as React.ChangeEvent<HTMLInputElement>);
        }
    };


    const renderRadioButton = (field) => (
        <div
            className={`flex items-center justify-between gap-4 px-2 p-1 border-b rounded-md cursor-pointer hover:bg-gray-100 ${className} ${error ? 'text-red-600' : isFocused ? 'text-primary' : ''}`}
            onClick={handleClick}
            onBlur={handleBlur}

        >
            <div className='flex items-center '>
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <label className="flex-1 text-sm font-medium">{label}</label>
                <p className='text-sm text-[#6F7070] px-4'>{email}</p>
            </div>
            {/* <input
                type="radio"
                {...field}
                checked={isChecked}
                onChange={onChange}
                onClick={onClick}
                value={value}
                name={name}
                className="form-radio text-blue-600 w-4 h-4 border-3 rounded-full cursor-pointer mr-4"
            /> */}
            <input type="radio"
                {...field}
                className="hidden peer"
                checked={isChecked}
                onChange={onChange}
                onClick={onClick}
                value={value}
                name={name} />
            <div className="w-4 h-4 rounded-full border-2 border-[#0EADE5] peer-checked:bg-[#0EADE5] peer-checked:border-[#0EADE5] flex items-center justify-center cursor-pointer">
                {isChecked && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
            </div>
        </div>
    );

    const ErrorInfo = ({ error }) => {
        if (!error) return null;
        return (
            <div className="min-h-4 py-1 text-red-600 text-xs">
                {error?.message || error}
            </div>
        );
    };

    return (
        <div>
            {control && controlName ? (
                <Controller
                    name={controlName}
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            {renderRadioButton(field)}
                            <ErrorInfo error={fieldState?.error} />
                        </>
                    )}
                />
            ) : (
                <>
                    {renderRadioButton(register)}
                    <ErrorInfo error={error} />
                </>
            )}
        </div>
    );
};

export default RadioButtonWithImage;
