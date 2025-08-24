

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/layout/FormLayout";
import { formContent } from "../../../../utils/common";
import InputField from "../../../components/InputField";
import { useParams } from "react-router-dom";
import { IUGCourseListTypes } from "../../../../redux/modules/master_management/ug";



const AddUgForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    setValue
  } = useForm<IUGCourseListTypes>();


  const param = useParams();
  const path = param?.id ? "edit" : "add";
  const [loader, setLoader] = useState(false)


  const onSubmit = (data: IUGCourseListTypes) => {
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
        path === "add" ? "Add UG Course" : "Edit UG Course",
        "",
        path === "add" ? "Add UG Course" : "Edit UG Course"
      )}
      loader_action={['collegeService:create', 'collegeService:update']}
      path={path}
      oldBtnView
    >
      <div className="grid grid-cols-1 row-margin">
        <InputField
          name="Course Name"
          placeholder="Enter Course Name"
          className="mx-2 mt-4"
          register={register("course_name", {
            required: "Course Name is required",
            maxLength: {
              value: 255,
              message: "Course Name cannot exceed 255 characters",
            },
          })}
          error={errors.course_name}
          required
          labelClassName="bg-[white]"
        />
        <InputField
          useFor="textarea"
          name="Description"
          placeholder="Enter Description"
          className="mx-2 mt-4 h-20"
          register={register("description", {
            required: "description is required",
            maxLength: {
              value: 255,
              message: "Description cannot exceed 1000 characters",
            },
          })}
          error={errors.description}
          required
          labelClassName="bg-[white]"
        />
      </div>
    </FormLayout>
  );
};

export default AddUgForm;
