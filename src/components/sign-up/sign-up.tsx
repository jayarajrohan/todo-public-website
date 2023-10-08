import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppButton from "../../ui-elements/app-button/app-button";
import AppInput from "../../ui-elements/app-input/app-input";
import { API_URL } from "../../util/api";
import {
  emailRegex,
  noSpecialCharsNoWhiteSpacesAtTheStartAndAtTheEndRegex,
  passwordRegex,
} from "../../util/regex";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import FormLayout from "../form-layout/form-layout";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormValues: IFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { ...defaultFormValues },
  });

  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: IFormInput) => {
    let status: number;

    fetch(`${API_URL}/user/signUp`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
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
      .then(() => {
        if (status === 201) {
          showSuccessToast("Account created successfully");
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
      });
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppInput
          labelFor="firstName"
          labelText="First Name"
          placeholder="First Name"
          error={errors.firstName}
          name="firstName"
          register={register("firstName", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name must contain at least 3 characters",
            },
            pattern: {
              value: noSpecialCharsNoWhiteSpacesAtTheStartAndAtTheEndRegex,
              message:
                "Entered value can't start/end or contain only white spaces and can't contain any special characters",
            },
          })}
          required
        />

        <AppInput
          labelFor="lastName"
          labelText="Last Name"
          placeholder="Last Name"
          error={errors.lastName}
          name="lastName"
          register={register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name must contain at least 3 characters",
            },
            pattern: {
              value: noSpecialCharsNoWhiteSpacesAtTheStartAndAtTheEndRegex,
              message:
                "Entered value can't start/end or contain only white spaces and can't contain any special characters",
            },
          })}
          rowClassName="mt-3"
          required
        />

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

        <AppInput
          labelFor="confirmPassword"
          labelText="Confirm Password"
          placeholder="Confirm Password"
          error={errors.confirmPassword}
          name="confirmPassword"
          register={register("confirmPassword", {
            required: "Password is required",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          type="password"
          rowClassName="mt-3"
          required
        />

        <AppButton text="Sign Up" type="submit" rowClassName="mt-4" />
      </form>
    </FormLayout>
  );
}

export default SignUp;
