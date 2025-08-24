// --- src/pages/master_management/district/form.ts ---

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/layout/FormLayout";
import { formContent } from "../../../../utils/common";
import InputField from "../../../components/InputField";
import { useParams } from "react-router-dom";

interface IDistrict {
  id?: number;
  district_name: string;
  description: string;
  createdAt?: string;
  active?: boolean;
}

const AddDistrictForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDistrict>();

  const param = useParams();
  const path = param?.id ? "edit" : "add";
  const [loader, setLoader] = useState(false);

  const onSubmit = (data: IDistrict) => {
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
        path === "add" ? "Add District" : "Edit District",
        "",
        path === "add" ? "Add District" : "Edit District"
      )}
      loader_action={['districtService:create', 'districtService:update']}
      path={path}
      oldBtnView
    >
      <div className="grid grid-cols-1 row-margin">
        <InputField
          name="District Name"
          placeholder="Enter District Name"
          className="mx-2 mt-4"
          register={register("district_name", {
            required: "District Name is required",
            maxLength: { value: 255, message: "Max 255 characters" },
          })}
          error={errors.district_name}
          required
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

export default AddDistrictForm;

