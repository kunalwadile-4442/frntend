// --- src/pages/master_management/district/form.ts ---

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/layout/FormLayout";
import { formContent } from "../../../../utils/common";
import InputField from "../../../components/InputField";
import { useParams } from "react-router-dom";
import { IBoardExamTypes } from "../../../../redux/modules/master_management/board_exam";
import { IPassingYearTypes } from "../../../../redux/modules/master_management/passing_year";
import Calender from "../../../components/Calender";



const AddPassingYear = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IPassingYearTypes>();

  const param = useParams();
  const path = param?.id ? "edit" : "add";
  const [loader, setLoader] = useState(false);

  const onSubmit = (data: IPassingYearTypes) => {
    setLoader(true);
    const payload = path === "edit" ? { ...data, id: param?.id } : data;
    const req = {
      type: "districtService",
      action: path === "edit" ? "update" : "create",
      payload,
      demo: { loader: true },
    };
    console.log("req::", req);
  };

  return (
    <FormLayout
      className="mx-4"
      isBack
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      content={formContent(
        path === "add" ? "Add Passing Year" : "Edit Passing Year",
        "",
        path === "add" ? "Add Passing Year" : "Edit Passing Year"
      )}
      loader_action={['districtService:create', 'districtService:update']}
      path={path}
      oldBtnView
    >
      <div className="grid grid-cols-1 row-margin">
        <Calender
          control={control}
          name="passing_year_date"
          label="Passing Year Date"
          rules={{ required: "Passing Year Date is required" }}
          error={errors.passing_year_date}
          required
          className="mx-2 mt-4"
          labelClassName="bg-[white]"
        />
        <InputField
          useFor="textarea"
          name="Description"
          placeholder="Enter Description"
          className="mx-2 mt-4 h-20"
          register={register("description", {
            required: "Description is required",
            maxLength: { value: 1000, message: "Max 1000 characters" },
          })}
          error={errors.description}
          required
          labelClassName="bg-[white]"
        />
      </div>
    </FormLayout>
  );
};

export default AddPassingYear;

