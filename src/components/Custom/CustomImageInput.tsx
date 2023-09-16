import Image from "next/image";
import { FormikProps } from "formik";
import toast from "react-hot-toast";
import { ChangeEvent } from "react";

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  fieldNameTranslate: string;
};

const CustomImageInput = <FormValues,>({
  formik,
  fieldName,
  fieldNameTranslate,
}: Props<FormValues>) => {
  const initialPhoto =
    "https://view.publitas.com/40824/1026433/pages/11096d18-d5a1-4920-be41-d5d0d5b031d2-at1000.jpg";
  const imagePreview = formik.values[fieldName]
    ? URL.createObjectURL(formik.values[fieldName] as File)
    : initialPhoto;
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    formik.setFieldValue("image", file);
  };
  return (
    <>
      <label className="capitalize block text-gray-600">
        {fieldNameTranslate}:
      </label>
      <div className="mb-4 bg-white rounded-lg border border-gray-700 flex justify-center items-center">
        <label htmlFor="image">
          <div className="hover:cursor-pointer">
            {imagePreview && (
              <img
                src={imagePreview as string}
                alt="Vista Previa"
                className="max-w-[750px] max-h-[500px]"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>
    </>
  );
};

export default CustomImageInput;
