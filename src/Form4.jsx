// import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export default function Form4() {
  const fieldStyle = "flex flex-col mb-2";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  //   const navigate = useNavigate();
  function onSubmit(contact) {
    console.log("Submitted details:", contact);
    // navigate(`/thank-you/${contact.name}`);
  }
  function getEditorStyle(fieldError) {
    return fieldError ? "border-red-500" : "";
  }

  return (
    <div className="flex flex-col py-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold underline mb-3">Contact Us</h2>
      <p className="mb-3">you enter your details</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "You must enter your name",
            })}
            className={getEditorStyle(errors.name)}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "You must enter your email address",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            className={getEditorStyle(errors.email)}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <div className={fieldStyle}>
          <label htmlFor="color">Color that you would like</label>
          <select
            id="color"
            {...register("color", {
              required: "You must enter color",
            })}
            className={getEditorStyle(errors.color)}
          >
            <option value=""></option>
            <option value="Support">Red</option>
            <option value="Feedback">Green</option>
            <option value="Other">Black</option>
          </select>
          {errors.color && (
            <span className="error-message">{errors.color.message}</span>
          )}
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea id="notes" {...register("notes")} />
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 h-10 px-6 font-semibold bg-black text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
