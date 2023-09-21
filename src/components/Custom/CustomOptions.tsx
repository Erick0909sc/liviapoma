import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  items: string[];
  fieldNameTranslate: string;
};

const CustomOptions = <FormValues,>({
  items,
  fieldName,
  formik,
  fieldNameTranslate,
}: Props<FormValues>) => {
  const prevValues = formik.values[fieldName] as string[];
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (prevValues.includes(value)) {
      return toast.error(`La ${fieldNameTranslate} ya ha sido asignada.`);
    }
    formik.setFieldValue(fieldName as string, [...prevValues, value]);
  };
  const handleDelete = (value: string) => {
    const filter = prevValues.filter((item) => item !== value);
    formik.setFieldValue(fieldName as string, filter);
  };
  return (
    <>
      <div className="mb-4">
        <label className="capitalize block text-gray-600">
          {fieldNameTranslate}:
        </label>
        <select
          name={fieldName as string}
          onChange={handleChange}
          className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
            formik.touched[fieldName] && formik.errors[fieldName]
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-700"
          }`}
        >
          <option value="" disabled>
            {fieldNameTranslate}
          </option>
          {items.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      {prevValues.length !== 0 && (
        <div className="flex flex-wrap gap-1">
          {prevValues.map((e, index) => (
            <span className="relative bg-white border border-gray-700 rounded-md p-1 pr-9" key={index}>
              {e}
              <button
                className="absolute top-0 right-0"
                type="button"
                onClick={() => handleDelete(e)}
              >
                <AiFillCloseCircle className="text-3xl fill-red-500" />
              </button>
            </span>
          ))}
        </div>
      )}
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <div className="text-red-500">
          * {formik.errors[fieldName] as string}
        </div>
      )}
    </>
  );
};

export default CustomOptions;
