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
type Category = {
  name: string;
  discount: number;
};
const CustomOptionsWithInput = <FormValues,>({
  items,
  fieldName,
  formik,
  fieldNameTranslate,
}: Props<FormValues>) => {
  const selectedCategories = formik.values[fieldName] as Category[];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (selectedCategories.some((category) => category.name === value)) {
      return toast.error(`La ${fieldNameTranslate} ya ha sido asignada.`);
    }

    formik.setFieldValue(fieldName as string, [
      ...selectedCategories,
      { name: value, discount: 1 }, // Default discount to 1
    ]);
  };

  const handleQuantityChange = (categoryName: string, discount: number) => {
    const updatedCategories = selectedCategories.map((category) =>
      category.name === categoryName ? { ...category, discount } : category
    );

    formik.setFieldValue(fieldName as string, updatedCategories);
  };

  const handleDelete = (categoryName: string) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.name !== categoryName
    );

    formik.setFieldValue(fieldName as string, updatedCategories);
  };

  return (
    <>
      <div className="mb-4">
        <label className="capitalize block text-gray-600">
          {fieldNameTranslate}:
        </label>
        <select
          defaultValue=""
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
      {selectedCategories.length !== 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {selectedCategories.map((category, index) => (
            <div
              className="relative rounded-md border border-gray-700 overflow-hidden"
              key={index}
            >
              <span className="bg-white p-1 pr-9 flex items-center justify-center">
                {category.name}
              </span>
              <div className="p-4">
                <label className="capitalize block text-gray-600">
                  Descuento:
                </label>
                <input
                  className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80`}
                  type="number"
                  value={category.discount}
                  onChange={(e) =>
                    handleQuantityChange(
                      category.name,
                      parseInt(e.target.value, 10)
                    )
                  }
                  onBlur={() => {
                    const newValue = category.discount;
                    if (isNaN(newValue) || newValue < 1 || newValue > 100) {
                      toast.error("El descuento debe estar entre 1% y 100%");
                    }
                  }}
                  required
                />
              </div>
              <button
                className="absolute top-0 right-0"
                type="button"
                onClick={() => handleDelete(category.name)}
              >
                <AiFillCloseCircle className="text-3xl fill-red-500" />
              </button>
            </div>
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

export default CustomOptionsWithInput;
