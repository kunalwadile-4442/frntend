/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { App_url } from "../../utils/constants/static";
import Icon from "./Icon";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { ProjectListTypes } from "../../redux/modules/backOffice/projectManagement";

const CommentBox = ({ onCommentsChange }: { onCommentsChange: (comments: string[]) => void }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProjectListTypes>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [commentData, setCommentData] = useState<string[]>([]);

    const onSubmit = (data: ProjectListTypes) => {
        // Add the new comment to the commentData array
        const updatedComments = [...commentData, data.comment];
        setCommentData(updatedComments);

        // Send the updated comment data to parent or wherever needed
        if (onCommentsChange) {
            onCommentsChange(updatedComments);
        }

        if (fileInputRef.current?.files?.length) {
        } else {
            console.log("No files attached.");
        }

        // Reset the form after sending
        reset();
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col border rounded-lg p-2 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <InputField
                    useFor="textarea"
                    placeholder="Write your comments..."
                    inputClassName="h-20 flex-grow border-none focus:outline-none"
                    register={register("comment", {
                        required: "Comment is required",
                        maxLength: {
                            value: 256,
                            message: "Comment cannot exceed 256 characters",
                        },
                    })}
                    error={errors.comment}
                />

                <div className="flex items-center gap-2 justify-end">
                    <Icon attrIcon={App_url.image.PlusIcon} className="font-bold" size="md" onClick={handleAttachmentClick} />
                    <Icon attrIcon={App_url.image.attahments} className="font-bold" size="md" onClick={handleAttachmentClick} />

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            if (e && e.target && e.target.files) {
                                console.log("Files selected:", e.target.files);
                            }
                        }}
                    />

                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentBox;
