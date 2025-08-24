/* eslint-disable no-whitespace-before-property */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./button/Button";
import { App_url } from "../../utils/constants/static";
import { ILoginTypes } from "../../utils/types";
import { AuthReq, patchData, postData } from "../../api/rest/fetchData";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import { setAuthData, setLogin } from "../../redux/modules/common/user_data/action";
import { setToken } from "../../redux/actions/action";

const Auth = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { access_token } = usePosterReducers();
  const path = loc.pathname;
  const { state } = loc;
  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ILoginTypes>();
  const email = watch("email");
  const password = watch("password");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      postData(App_url.link.ENDPOINT_LINKS.FORGET_PASSWORD, { email: email }, access_token).then((resp) => {
        if (resp?.status === 200) {
          toast.success("OTP sent successfully");
          setIsRunning(true);
          setTimeLeft(60); // Reset timer to 60 seconds if needed
        }

      });
    } else {
      toast.error("Enter a valid Email Id")
    }
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const onSubmit = (data: ILoginTypes) => {
    setLoader(true);
    if (path === App_url.link.SIGNIN_URL || path === App_url.link.INITIAL_URL) {
      AuthReq(App_url.link.ENDPOINT_LINKS.SIGN_IN, data).then((response) => {
        setLoader(false);
        try {
          if (response?.status === 200) {
            console.log(response.data);
       
            if (response?.data?.data?.user?.role !== "admin") {
              toast.error("Do not have permission please contact administrator");
            } else {
              const payload = {
                ...response?.data?.data,
                user: {
                  ...response?.data?.data?.user
                }
              }
              const token = response?.data?.data?.accessToken;
              
              dispatch(setToken(token));
              dispatch(setLogin(true));
              dispatch(setAuthData(payload));
              navigate(App_url.link.DASHBOARD_URL);
            }
          }
        } catch (error) {
          console.log(error);

        }
      });
    } else if (path === App_url.link.FORGET_PASSWORD_URL) {

      navigate(App_url.link.RESET_PASSWORD_URL, { state: { otp: data?.otp } });
      setLoader(false);
    } else if (path === App_url.link.RESET_PASSWORD_URL && state.otp) {
      patchData(`${App_url.link.ENDPOINT_LINKS.RESET_PASSWORD}/${state.otp}`, data, access_token).then(
        (resp: any) => {
          setLoader(false);
          if (resp?.status === 200) {
            toast.success("Password reset Successfully");
          }
          navigate(App_url.link.SIGNIN_URL);
        }
      );
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${App_url.image.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[70%] h-[85%] bg-white rounded-lg border px-2 py-2 flex">
        <div className="w-1/2 p-4 flex justify-center items-center">
          <div className="w-full px-2 h-fit">
            <img src={App_url.image.applogo} alt=""  className="h-[70px] w-[70px]"/>
            {path === App_url.link.FORGET_PASSWORD_URL && (
              <div
                className="flex text-sm gap-2 pt-4 pl-2 items-center cursor-pointer hover:text-gray-600"
                onClick={() => navigate(App_url.link.SIGNIN_URL)}
              >
                <img src={App_url.image.arrowleft} className="h-3" alt="" />
                <p className="font-inter">Login Page</p>
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full w-full px-4 py-4 "
            >
              <div className="text-center">
                <p className="text-left my-4 mt-">
                  {path === App_url.link.FORGET_PASSWORD_URL
                    ? <p className="font-[600] text-[16px] text-[#202F57] font-inter">Forgot Password</p>
                    :
                    <>
                      <p className="font-[600] text-[20px] text-[#202F57] font-inter">Login with Email ID</p>
                      <p className="font-[400] text-[14px] text-[#767B86] mt-1 font-inter">Please enter your details below to log in</p>
                    </>}
                </p>
              </div>
              {(path === App_url.link.SIGNIN_URL || path === App_url.link.INITIAL_URL) && (
                <InputField
                  name={"Email id"}
                  placeholder="Please enter your email id"
                  className="my-3"
                  labelClassName="font-[600] text-[#202F57] font-inter"
                  inputClassName="h-10 rounded-lg font-inter"
                  register={register("email", {
                    required: "Email id is required",
                    maxLength: {
                      value: 255,
                      message: "Email id cannot exceed 255 characters",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid Email id",
                    },
                  })}
                  error={errors.email}
                  required
                />
              )}

              {(path === App_url.link.SIGNIN_URL ||
                path === App_url.link.INITIAL_URL ||
                path === App_url.link.RESET_PASSWORD_URL) && (
                  <InputField
                    name={"Password"}
                    placeholder="Please enter your password"
                    type="password"
                    className="mt-2 mb-4 "
                    labelClassName="font-[600] text-[#202F57] font-inter"
                    inputClassName="h-10 rounded-lg text-[#767B86] bg-[#FFFFFF] font-inter"
                    register={register("password", {
                      required: "Password is required",
                      maxLength: {
                        value: 255,
                        message: "Password cannot exceed 255 characters",
                      },
                    })}
                    error={errors.password}
                    required
                  />
                )}
              {path === App_url.link.RESET_PASSWORD_URL && (
                <InputField
                  name={"Confirm Password"}
                  placeholder="Confirm Your password"
                  type="password"
                  className="mt-2 mb-4"
                  labelClassName="font-[600] text-[#202F57] font-inter"
                  inputClassName="h-10 rounded-lg text-[#767B86] bg-[#FFFFFF] font-inter"
                  register={register("confirmNewPassword", {
                    required: "Password is required",
                    maxLength: {
                      value: 255,
                      message: "Password cannot exceed 255 characters",
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={errors.confirmNewPassword}
                  required
                />
              )}
              {(path === App_url.link.SIGNIN_URL || path === App_url.link.INITIAL_URL) && (
                <div className="text-xs flex justify-between">
                  <div className="flex gap-2 ">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="hidden peer"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)} />
                      <div className="w-4 h-4 rounded-full border-2 border-[#0EADE5] peer-checked:bg-[#0EADE5] peer-checked:border-[#0EADE5] flex items-center justify-center cursor-pointer">
                        {isChecked && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <p className="text-[#767B86] font-[400] font-inter ml-2">Keep me signed in</p>
                    </label>
                  </div>
                </div>
              )}
              {path === App_url.link.FORGET_PASSWORD_URL && (
                <>
                  <div className="flex items-center gap-3 ">
                    <InputField
                      register={register("email", {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid Email Id",
                        },
                      })}
                      name={"Email id"}
                      placeholder="Enter email id"
                      className="w-full "
                      labelClassName="font-[600] text-[#202F57] font-inter"
                      inputClassName="h-10 rounded-lg font-inter"
                      error={errors.email}
                    />
                    <div className="mt-8 ">
                      <Button
                        label={isRunning ? "Sent" : "Send code"}
                        icon={isRunning ? App_url.image.true : ""}
                        disabled={isRunning ? true : !email ? true : false}
                        className={`border text-primary hover:text-white border-primary min-w-28 text-sm h-10 rounded-lg mt-1 font-inter ${isRunning ? "bg-[#F2FBFE]" : "bg-white"
                          }`}
                        onClick={startTimer}
                      />
                      <p className="text-xs h-4 ps-1 py-1 text-[#858686] font-inter">
                        Resend in {formatTime(timeLeft)}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {path === App_url.link.FORGET_PASSWORD_URL && (
                <InputField
                  name={"Code "}
                  register={register("otp", {
                    required: "OTP is required",
                    maxLength: {
                      value: 6,
                      message: "Code must be of 6 digits",
                    },
                    minLength: {
                      value: 6,
                      message: "Code must be of 6 digits",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Code must be a number",
                    },
                  })}
                  placeholder="Enter code received via email"
                  required
                  className="my-3"
                  labelClassName="font-[600] text-[#202F57] font-inter"
                  inputClassName="h-10 rounded-lg font-inter"
                  error={errors.otp}
                />
              )}
              <Button
                type="submit"
                label={
                  path === App_url.link.INITIAL_URL || path === App_url.link.SIGNIN_URL
                    ? "Login"
                    : "Submit"
                }
                className="w-full text-white rounded-xl h-10 my-6 font-[600] font-inter"
                isLoading={loader}
                disabled={loader}
              />
              {(path === App_url.link.SIGNIN_URL || path === App_url.link.INITIAL_URL) && (
                <div className="text-xs flex justify-center">
                  <p
                    className="cursor-pointer hover:text-primary-blue text-[#202F57] font-inter font-[600] text-[13px]"
                    onClick={() => navigate(App_url.link.FORGET_PASSWORD_URL)}
                  >
                    Forgot Password ?
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="w-1/2"  >
          <img
            src={App_url.image.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
};
export default Auth;
