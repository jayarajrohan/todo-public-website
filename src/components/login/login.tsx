import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../ui-elements/app-button/app-button";
import AppInput from "../../ui-elements/app-input/app-input";
import { emailRegex, passwordRegex } from "../../util/regex";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import FormLayout from "../form-layout/form-layout";
import LoaderModal from "../loader-modal/loader-modal";

interface IFormInput {
  email: string;
  password: string;
}

const defaultFormValues: IFormInput = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { ...defaultFormValues },
  });

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    let status: number;

    fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/JSON",
      },
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        if (status === 200) {
          showSuccessToast("Login successful");
          navigate("/");
        } else if (status === 422) {
          showErrorToast("Validations failed! Please check your inputs");
        } else {
          showErrorToast("Something went wrong! Please try again later");
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast("Something went wrong! Please try again later");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppInput
            labelFor="email"
            labelText="Email"
            placeholder="Email"
            error={errors.email}
            name="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            })}
            rowClassName="mt-3"
            required
          />

          <AppInput
            labelFor="password"
            labelText="Password"
            type="password"
            placeholder="Password"
            error={errors.password}
            name="password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
              pattern: {
                value: passwordRegex,
                message:
                  "Password must have 6 characters and include at least one lowercase letter, one uppercase letter, one numeric and one special character",
              },
            })}
            rowClassName="mt-3"
            required
          />

          <AppButton text="Login" type="submit" rowClassName="mt-4" />

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              style={{ color: "#8803fc", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </FormLayout>
      <LoaderModal show={isLoading} />
    </>
  );
}

export default Login;
