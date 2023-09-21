import { FormikProps } from "formik";
import toast from "react-hot-toast";

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  fieldNameTranslate: string;
};

const CustomInput = <FormValues,>({
  formik,
  fieldName,
  fieldNameTranslate,
}: Props<FormValues>) => {
  return (
    <div className="mb-4">
      <label className="capitalize block text-gray-600">
        {fieldNameTranslate}:
      </label>
      <input
        className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
          formik.touched[fieldName] && formik.errors[fieldName]
            ? "border-red-500 placeholder:text-red-500"
            : "border-gray-700"
        }`}
        type="text"
        {...formik.getFieldProps(fieldName as string)}
        onBlur={(e) => {
          formik.handleBlur(e);
          if (formik.touched[fieldName] && formik.errors[fieldName])
            return toast.error(formik.errors[fieldName] as string);
        }}
        required
      />
    </div>
  );
};

export default CustomInput;
