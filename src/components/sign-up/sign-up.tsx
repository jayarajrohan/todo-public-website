import { useRef } from "react";
import { useForm } from "react-hook-form";
import AppButton from "../../ui-elements/app-button/app-button";
import AppInput from "../../ui-elements/app-input/app-input";
import {
  emailRegex,
  noSpecialCharsNoWhiteSpacesAtTheStartAndAtTheEndRegex,
  passwordRegex,
} from "../../util/regex";
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

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
            maxLength: {
              value: 20,
              message: "Password must contain less than 20 characters",
            },
            pattern: {
              value: passwordRegex,
              message:
                "Password must have 6-20 characters and include at least one lowercase letter, one uppercase letter, one numeric and one special character",
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
