import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Password Reset Verification
      </h1>

      {!isValidToken ? (
        <>
          <p className="text-2xl font-light text-white mt-5">
            Enter your
            <span className=" text-fuchsia-500 font-bold">
              {" "}
              confirmation code.
            </span>
          </p>
          <NewPasswordToken
            token={token}
            setToken={setToken}
            setIsValidToken={setIsValidToken}
          />
        </>
      ) : (
        <>
          <p className="text-2xl font-light text-white mt-5">
            Enter and confirm your
            <span className=" text-fuchsia-500 font-bold"> new password.</span>
          </p>
          <NewPasswordForm
            token={token}
            setToken={setToken}
            setIsValidToken={setIsValidToken}
          />
        </>
      )}
    </>
  );
}
