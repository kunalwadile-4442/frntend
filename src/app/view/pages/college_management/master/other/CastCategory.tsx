import InputField from "../../../../components/InputField";

interface CastCategoryProps {
    cast_name:string;
    category: string;
    register: any;
    errors: any;
  }
  
  const CastCategory: React.FC<CastCategoryProps> = ({ cast_name,category, register, errors }) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <p className="mt-2 capitalize text-sm">{cast_name} Category: {category}</p>
        </div>
        <InputField
          name={`Min`}
          placeholder="Enter Bed Count"
          className="mx-2"
          type="number"
          register={register(`bed_min_${category}`, {
            required: "Min bed count is required",
          })}
          inputClassName="bg-white"
          error={errors[`bed_min_${category}`]}
          required
        />
        <InputField
          name={`Max`}
          placeholder="Enter Bed Count"
          className="mx-2"
          type="number"
          register={register(`bed_max_${category}`, {
            required: "Max bed count is required",
          })}
          inputClassName="bg-white"
          error={errors[`bed_max_${category}`]}
          required
        />
      </div>
    );
  };
  
  export default CastCategory;
  