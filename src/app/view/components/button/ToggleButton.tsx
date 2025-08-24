import React from 'react';
import { useForm, Controller } from 'react-hook-form';
interface IToggleForm{
    control?: boolean;
}
function ToggleForm(prop) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      toggle: false,
    },
  });

  const toggleValue = watch('toggle'); // Get the current value of the toggle

  const onSubmit = (data) => {
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="toggle"
        control={control}
        render={({ field }) => (
          <button
            type="button"
            onClick={() => setValue('toggle', !toggleValue)}
            className={`p-2 border rounded ${
              toggleValue ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {toggleValue ? 'ON' : 'OFF'}
          </button>
        )}
      />
      <button type="submit" className="mt-4 p-2 border rounded bg-green-500 text-white">
        Submit
      </button>
    </form>
  );
}

export default ToggleForm;
