import { FormikProps } from "formik";
type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  items: string[];
  fieldNameTranslate: string;
  value?: number | string;
};

const CustomOptionsWithOnlyValue = <FormValues,>({
  items,
  fieldName,
  formik,
  fieldNameTranslate,
  value,
}: Props<FormValues>) => {
  console.log(formik.values[fieldName])
  return (
    <div className="mb-4">
      <label className="capitalize block text-gray-600">
        {fieldNameTranslate}:
      </label>
      <select
        className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
          formik.touched[fieldName] && formik.errors[fieldName]
            ? "border-red-500 placeholder:text-red-500"
            : "border-gray-700"
        }`}
        {...formik.getFieldProps(formik.values[fieldName] as string)}
        value={value}
        name={fieldName as string}
      >
        <option value="" disabled>
          {fieldNameTranslate}
        </option>
        {items.map((item, index) => (
          <option key={index + 1} value={index + 1}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomOptionsWithOnlyValue;
