import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Textbox } from "../components";
import { useSelector } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSUbmitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
  };
  useEffect(() => {
    user && navigate("/dashboard");
    // console.log(user);
  }, [user]);
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row ">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center  ">
          <form
            onSubmit={handleSubmit(onSUbmitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 px-10 p-10 core"
          >
            <div className="flex flex-col gap-y-5 p-5">
              <p className="text-3xl font-bold text-center">Welcome Back</p>
              <Textbox
                placeholder="email address"
                name="email"
                type="email"
                label="Email Address"
                className="w-full rounded-sm"
                register={register("email")}
                required
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="password"
                name="password"
                type="password"
                label="Password"
                className="w-full rounded-sm"
                register={register("password")}
                required
                error={errors.password ? errors.password.message : ""}
              />{" "}
              <span className="text-sm primary-text hover:underline cursor-pointer">
                Forgot password?
              </span>
              <Button
                type={"submit"}
                label={"Login"}
                className={"w-full h-10 bg-white"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
