import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ResetPasswordForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { resetPasswordForm } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ResetPasswordView() {
  const initialValues: ResetPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordForm,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ResetPasswordForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter your registration email {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          to reset your password.
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your registration email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Registration Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email",
              },
            })}
            disabled={isPending}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value={
            isPending ? "Sending Email..." : "Send Email with Instructions"
          }
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          disabled={isPending}
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? Log in.
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-gray-300 font-normal"
        >
          Don't have an account? Create one.
        </Link>
      </nav>
    </>
  );
}
