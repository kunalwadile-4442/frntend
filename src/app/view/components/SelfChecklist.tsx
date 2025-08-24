/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChecklist } from '../../redux/modules/backOffice/checklist';
import FileUpload from './FileUpload';
import RadioButton from './RadioButton';
import { App_url } from '../../utils/constants/static';
import Icon from './Icon';

interface IForm {
    multiUpload?: boolean;
}

const SelfChecklist: React.FC<IForm> = (props) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<IChecklist>();

    const onSubmit = (data: IChecklist) => {
    };
    const data = [
        { drawingNo: 'KAS_001' },
        { drawingNo: 'KAS_001' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-6xl h-full'>
            <p className='font-semibold text-[#0eade5]'>General Information:</p>
            <hr />
            <div className='p-2'>
                <ol className="list-decimal pl-4 space-y-2">
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Project name and number match original drawing.
                            <input type="checkbox" className='ml-10' />
                        </span>
                    </li>
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Drawing title and revision reflect changes (revision number incremented).
                            <input type="checkbox" className='ml-2' />
                        </span>
                    </li>
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Date and scale are current and consistent.
                            <input type="checkbox" className='ml-2' />
                        </span>
                    </li>
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Author/Detailer identified.
                            <input type="checkbox" className='ml-2' />
                        </span>
                    </li>
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Checker/Approver designated.
                        </span>
                    </li>
                </ol>
            </div>
            <p className='font-semibold text-[#0eade5]'>Review & Approval:</p>
            <hr />
            <div className='p-2'>
                <ol className="list-decimal pl-4 space-y-2">
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Self-Review conducted for inconsistencies or errors.
                            <input type="checkbox" className='ml-2' />
                        </span>
                    </li>
                    <li className="py-1">
                        <span className="font-semibold flex justify-between items-center">
                            Drawing submitted for Checker/Approver sign-off.
                            <input type="checkbox" className='ml-2' />
                        </span>
                    </li>
                </ol>
            </div>
            <div className='mt-8'>
                <p className='font-semibold'>Upload Document</p>

                {props.multiUpload ? (
                    <div className="my-2  border">
                        <table className="min-w-full bg-white rounded-lg border border-gray-200">
                            <thead >
                                <tr className="bg-[#EAF4F8]">

                                    <th className="py-2 px-4 border-b">Drawing No</th>
                                    <th className="py-2 px-4 border-b">File Upload</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, index) => (
                                    <tr key={index} className="bg-white border-t border-[#E1E1E1] ">
                                        <td className="px-4 py-2 text-sm  border-r border-[#E1E1E1] text-center">{item.drawingNo}</td>
                                        <td className="px-4 py-2 text-sm  text-center flex items-center justify-center">
                                            <Icon
                                                image
                                                attrIcon={App_url.image.Upload}
                                                button
                                                size="md"
                                            /> <p>Upload</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <FileUpload
                        allowedExtensions={['jpg', 'png', 'webp', 'pdf', 'jpeg']}
                        onFilesUploaded={console.log}
                        multiple={false}
                        control={control}
                        name="upload"
                        rules={{ required: 'File is required' }}
                    />
                )}
                
            </div>
            <div className="flex gap-4 mb-4 font-semibold mt-4">
                <RadioButton
                    control={control}
                    controlName="assign_type"
                    value="dealer"
                    label="Send to Detailer"
                />
                <RadioButton
                    control={control}
                    controlName="assign_type"
                    value="qa"
                    label="Send to QA"
                />
            </div>
        </form>
    );
}

export default SelfChecklist;
