

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/layout/FormLayout";
import { formContent } from "../../../../utils/common";
import InputField from "../../../components/InputField";
import PhoneInputComp from "../../../components/PhoneInput";
import Calender from "../../../components/Calender";
import { useParams } from "react-router-dom";
import { usePosterReducers } from "../../../../redux/getdata/usePostReducer";
import { useUiReducer } from "../../../../redux/getdata/useUiReducer";
import SectionWrapper from "../../../components/SectionWrapper";
import DropdownSelect from "../../../components/DropSelect";
import { ICollegeListTypes } from "../../../../redux/modules/college_management";
import ImageUpload from "../../../components/ImageUpload";



const AddActivityLogForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    setValue
  } = useForm<ICollegeListTypes>();


  const param = useParams();
  const path = param?.id ? "edit" : "add";
  const [loader, setLoader] = useState(false)
  const ugc = watch('ug_courses')
  const pgc = watch('pg_courses')

  const onSubmit = (data: ICollegeListTypes) => {
    setLoader(true);
    if (path === "add") {
      const payload = {
        ...data,
      };
      const req = {
        type: "collegeService",
        action: "create",
        payload: payload,
        demo: { loader: true }
      };
      console.log("req::", req)
      // send(req);
    } else if (path === "edit") {
      const payload = {
        ...data,
        id: param?.id,
      };
      const req = {
        type: "collegeService",
        action: "update",
        payload: payload,
        demo: { loader: true }
      };
      console.log("req::", req)
      // send(req);
    }
  };
  const onImageUpload = (res) => {
    console.log(res);
  }
  return (
    <FormLayout
      className="mx-4"
      isBack
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      content={formContent(
        path === "add" ? "Add College" : "Edit College",
        "",
        path === "add" ? "Add College" : "Edit College"
      )}
      loader_action={['collegeService:create', 'collegeService:update']}
      path={path}
      oldBtnView
    >
      <div className="grid grid-cols-3 row-margin">
        <InputField
          name="College Name"
          placeholder="Enter College Name"
          className="mx-2 mt-4"
          register={register("college_name", {
            required: "College Name is required",
            maxLength: {
              value: 255,
              message: "College Name cannot exceed 255 characters",
            },
          })}
          error={errors.college_name}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="College Code"
          placeholder="Enter College Code"
          className="mx-2 mt-4"
          register={register("college_code", {
            required: "College Code is required",
          })}
          error={errors.college_code}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="Hospital Details"
          placeholder="Enter Hospital Details"
          className="mx-2 mt-4"
          register={register("hospital_details", {
            required: "Hospital Details is required",
          })}
          error={errors.hospital_details}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="No. of Beds"
          placeholder="Enter Bed Count"
          className="mx-2 mt-4"
          type="number"
          register={register("bed", {
            required: "Bed count is required",
          })}
          error={errors.bed}
          required
          labelClassName="bg-[white]"
        />
        <DropdownSelect
          label="UG Courses"
          defaultValue="Select UG Course"
          options={[{ label: "MBBS", value: "mbbs" }, { label: "BDS", value: "bds" }]}
          control={control}
          rules={{ required: "UG Course is required" }}
          name="ug_courses"
          errors={errors.ug_courses}
          formClassName="mx-2 mt-4"
          required
          labelClassName="bg-[white]"
          multiselect
        />
        <DropdownSelect
          label="PG Courses"
          defaultValue="Select PG Course"
          options={[{ label: "MD", value: "md" }, { label: "MS", value: "ms" }]}
          control={control}
          rules={{ required: "PG Course is required" }}
          name="pg_courses"
          errors={errors.pg_courses}
          formClassName="mx-2 mt-4"
          required
          labelClassName="bg-[white]"
          multiselect
        />
        <DropdownSelect
          label="Hostel Availability"
          defaultValue="Select Hostel"
          options={[{ label: "Yes", value: true }, { label: "No", value: false }]}
          control={control}
          rules={{ required: "Hostel selection is required" }}
          name="is_hostel"
          errors={errors.is_hostel}
          formClassName="mx-2 mt-4"
          required
          labelClassName="bg-[white]"
        />
        <Calender
          control={control}
          name="established_year"
          label="Established Date"
          rules={{ required: "Established Date is required" }}
          error={errors.established_year}
          required
          className="mx-2 mt-4"
          labelClassName="bg-[white]"
        />
        <InputField
          name="Address"
          placeholder="Enter Address"
          className="mx-2 mt-4"
          register={register("address", {
            required: "Address is required",
          })}
          error={errors.address}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="State"
          placeholder="Enter State"
          className="mx-2 mt-4"
          register={register("state", {
            required: "State is required",
          })}
          error={errors.state}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="City"
          placeholder="Enter City"
          className="mx-2 mt-4"
          register={register("city", {
            required: "City is required",
          })}
          error={errors.city}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          name="Pincode"
          placeholder="Enter Pincode"
          type="number"
          className="mx-2 mt-4"
          register={register("pincode", {
            required: "Pincode is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Pincode must be 6 digits",
            },
          })}
          error={errors.pincode}
          required
          labelClassName="bg-[white]"
        />
      </div>
    </FormLayout>
  );
};

export default AddActivityLogForm;
