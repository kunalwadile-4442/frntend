

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ICollegeListTypes } from "../../../../../redux/modules/college_management";
import { formContent } from "../../../../../utils/common";
import Calender from "../../../../components/Calender";
import DropdownSelect from "../../../../components/DropSelect";
import ImageUpload from "../../../../components/ImageUpload";
import InputField from "../../../../components/InputField";
import FormLayout from "../../../../components/layout/FormLayout";
import SectionWrapper from "../../../../components/SectionWrapper";
import CastCategory from "./other/CastCategory";



const AddcollegeMasterForm = () => {
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
          options={[{ label: "MBBS", value: "mbbs" }, { label: "BDS", value: "bds" },{ label: "MBBt", value: "mbbt" },{ label: "MBBf", value: "mbbf" },{ label: "MBBn", value: "mbbn" },{ label: "MBBa", value: "mbba" }]}
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
      <SectionWrapper>
        Offered Courses
      </SectionWrapper>
      <div className="grid grid-cols-3 row-margin">
        <DropdownSelect
          label="Course Name"
          defaultValue="Select Course"
          options={[{ label: "Yes", value: true }, { label: "No", value: false }]}
          control={control}
          rules={{ required: "Hostel selection is required" }}
          name="hostels"
          errors={errors.college_name}
          formClassName="mx-2 mt-4"
          required
        />
        <DropdownSelect
          label="College Code"
          defaultValue="Select College"
          options={[{ label: "Yes", value: true }, { label: "No", value: false }]}
          control={control}
          rules={{ required: "Hostel selection is required" }}
          name="hostels"
          errors={errors.college_code}
          formClassName="mx-2 mt-4"
          required
        />
      </div>
  
      {Array.isArray(ugc) && ugc.length > 0 && ugc.map((course, index) => (
        <div key={index}>
          <div className="grid grid-cols-3 row-margin">
            <InputField
              name={`ug_course_${index}_name`}
              label="UG Course Name"
              value={course}
              register={register(`ug_course_${index}_name` as any)}
              disabled
              className="mx-2 mt-4"
              labelClassName="bg-[white]"
            />
          </div>
          <p className="mt-4 mb-4 text-sm">Cast Categories Cutoff for {course}</p>
          <div className="bg-[#F6F7FB] rounded-lg px-4 py-2">
            <div className="grid grid-cols-2 row-margin">
              {["SC", "ST", "VJ", "NT1", "NT2", "NT3", "OBC", "EWS", "OPEN"].map((category) => (
                <CastCategory
                  key={category}
                  category={category}
                  register={register}
                  errors={errors}
                  cast_name={`Cast`}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#F6F7FB] rounded-lg px-4 py-2 mt-2">
            <div className="grid grid-cols-2 row-margin">
              {["D1", "D2", "D3", "PH", "MKB", "NRI"].map((category) => (
                <CastCategory
                  key={category}
                  category={category}
                  register={register}
                  errors={errors}
                  cast_name={`sub cast`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      {Array.isArray(pgc) && pgc.length > 0 && pgc?.map((course, index) => (
        <div key={index}>
          <div className="grid grid-cols-3 row-margin">
            <InputField
              name={`pg_course_${index}_name`}
              label="PG Course Name"
              value={course}
              register={register(`pg_course_${index}_name` as any)}
              disabled
              className="mx-2 mt-4"
              labelClassName="bg-[white]"
            />
          </div>

          <p className="mt-4 mb-4 text-sm capitalize">Cast Categories Cutoff for {course}</p>
          <div className="bg-[#F6F7FB] rounded-lg px-4 py-2">
            <div className="grid grid-cols-2 row-margin">
              {["SC", "ST", "VJ", "NT1", "NT2", "NT3", "OBC", "EWS", "OPEN"].map((category) => (
                <CastCategory
                  key={category}
                  category={category}
                  register={register}
                  errors={errors}
                  cast_name={`Cast`}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#F6F7FB] rounded-lg px-4 py-2 mt-2">
            <div className="grid grid-cols-2 row-margin">
              {["D1", "D2", "D3", "PH", "MKB", "NRI"].map((category) => (
                <CastCategory
                  key={category}
                  category={category}
                  register={register}
                  errors={errors}
                  cast_name={`sub cast`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      <SectionWrapper>
        Images
      </SectionWrapper>
      <div className="grid grid-cols-2 row-margin">
        <div>
          <ImageUpload allowedExtensions={["jpg", "png"]} onFilesUploaded={(files) => onImageUpload(files)} label="Hostel Photo" control={control} name="company_logo" required className="flex mt-2 gap-4" labelClassName="mt-4" isUpload errors={errors?.documents?.message} />
        </div>
        <div>
          <ImageUpload allowedExtensions={["jpg", "png"]} onFilesUploaded={(files) => onImageUpload(files)} label="College Photo" control={control} name="company_logo" required className="flex mt-2 gap-4" labelClassName="mt-4" isUpload errors={errors?.documents?.message} />
        </div>
      </div>
    </FormLayout>
  );
};

export default AddcollegeMasterForm;
