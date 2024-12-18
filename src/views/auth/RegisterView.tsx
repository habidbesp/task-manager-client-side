import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      reset();
      toast.success(data);
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate({ formData });
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill out the form {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          to create your account.
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
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
            placeholder="Registration Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
            disabled={isPending}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Name</label>
          <input
            type="name"
            placeholder="Registration Name"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "Username is required",
            })}
            disabled={isPending}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Registration Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
            })}
            disabled={isPending}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Confirm Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password Registration"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
            disabled={isPending}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value={!isPending ? "Register" : "Loading..."}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          disabled={isPending}
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? Log in here.
        </Link>
        <Link
          to={"/auth/reset-password"}
          className="text-center text-gray-300 font-normal"
        >
          Forgot your password? Reset it.
        </Link>
      </nav>
    </>
  );
}
