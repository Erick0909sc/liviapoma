import Image from "next/image";
import { FormikProps } from "formik";
import toast from "react-hot-toast";
import { ChangeEvent } from "react";

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  fieldNameTranslate: string;
  initialPhoto: string;
};

const CustomImageInput = <FormValues,>({
  formik,
  fieldName,
  fieldNameTranslate,
  initialPhoto,
}: Props<FormValues>) => {
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
          <div className="hover:cursor-pointer relative group">
            <img
              src={imagePreview as string}
              alt="Vista Previa"
              className="max-w-[750px] max-h-[500px]"
            />
            <span className="hidden absolute inset-0 group-hover:flex justify-center items-center backdrop-blur-sm bg-black/30 text-white transition-all text-xl font-bold hover:text-3xl">
              <span
                className={`border-2 p-2 rounded-xl ${
                  formik.values[fieldName]
                    ? "border-green-500 bg-black/70"
                    : "border-blue-500 bg-black/70"
                }`}
              >
                {formik.values[fieldName] ? "📸 Cambiar foto" : "📁 Subir foto"}
              </span>
            </span>
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

{
  /* <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white backdrop-blur-sm bg-green-700/80 hover:bg-green-700/60 text-xl font-bold ring-4 ring-inset hover:ring-green-300 transition-all ring-green-500 rounded-lg px-6 py-4 my-auto z-10">
              Subir foto
            </span> */
}
