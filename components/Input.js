import { Field, ErrorMessage, useField } from "formik";

const Input = (props) => {
  const { label, placeholder, icon, onClickIcon, as, custom = true } = props;
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-control relative font-body">
        <p className="py-2 text-xs capitalize text-black">{label}</p>
        <div
          className={`flex items-center justify-between relative ${
            !custom &&
            "border border-primary-100/50 active:border-primary-100 hover:border-primary-100 focus:border-primary-100 duration-300"
          }`}
        >
          <Field
            type="text"
            as={as}
            {...field}
            {...props}
            autoComplete="off"
            className="input input-bordered w-full"
            placeholder={placeholder}
          />
          {icon && (
            <button
              type="button"
              className="absolute right-5 text-primary-200 dark:text-primary hover:text-primary-100 font-medium text-sm md:text-lg"
              onClick={onClickIcon}
            >
              {icon}
            </button>
          )}
        </div>

        <ErrorMessage
          component="div"
          name={field.name}
          className={`text-red-500 font-body list-none mt-2 ${
            custom ? "text-sm" : "text-xs"
          } `}
        />
      </label>
    </>
  );
};

export { Input };
