/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useWebSocket } from "../../../../api/websocket/WebSocketContext";
import { usePosterReducers } from "../../../../redux/getdata/usePostReducer";
import { useUiReducer } from "../../../../redux/getdata/useUiReducer";
import { IChangePasswordTypes } from "../../../../redux/modules/common/user_data/types";
import { formContent } from "../../../../utils/common";
import InputField from "../../../components/InputField";
import FormLayout from "../../../components/layout/FormLayout";

interface IChangePassword {
    Title?: string;
}
const ChangePassword = (props?: IChangePassword) => {
    const {
        register,
        control,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        reset,
        getValues
    } = useForm<IChangePasswordTypes>();
    const { Title = "Change Password" } = props;
    const dispatch = useDispatch();
    const param = useParams();
    const { products, tax, supplierList, customerDetails, customersList, productUnitService } = usePosterReducers();
    const { clearForm } = useUiReducer();
    const { send, isConnect } = useWebSocket();

    const onSubmit = (data: IChangePasswordTypes) => {
        const param = {
            "type": "userService",
            "action": "changePassword",
            "payload": data,
        }
        send(param);
    };

    return (
        <FormLayout
            className="mx-4"
            isBack
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            content={formContent("Back", "", Title)}
            route={"/dashboard"}
        >
            <div className="grid grid-cols-1">
                <InputField
                    name="Old Password"
                    placeholder="Enter Old Password"
                    className="mx-2 mt-3"
                    inputClassName="h-10 rounded-md"
                    register={register("old_password", {
                        required: "Old Password is required",
                        maxLength: {
                            value: 255,
                            message: "Old Password cannot exceed 255 characters",
                        },
                    })}
                    error={errors.old_password}
                    required
                    type="password"
                />
                <div className="border-b pb-2 pt-3"></div>
                <InputField
                    name="New Password"
                    placeholder="Enter New Password"
                    className="mx-2 mt-3"
                    inputClassName="h-10 rounded-md"
                    register={register("new_password", {
                        required: "New Password is required",
                        minLength: {
                            value: 8,
                            message: "New Password must be at least 8 characters long",
                        },
                        maxLength: {
                            value: 255,
                            message: "New Password cannot exceed 255 characters",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "New Password must include at least one letter, one number, and one special character",
                        },
                    })}
                    error={errors.new_password}
                    type="password"
                    required
                />

                <InputField
                    name="Confirm Password"
                    placeholder="Confirm New Password"
                    className="mx-2 mt-3"
                    inputClassName="h-10 rounded-md"
                    register={register("confirm_new_password", {
                        required: "Confirm Password is required",
                        validate: value =>
                            value === watch("new_password") || "Passwords do not match",
                    })}
                    error={errors.confirm_new_password}
                    type="password"
                    required
                />

            </div>
        </FormLayout>
    );
};

export default ChangePassword;
