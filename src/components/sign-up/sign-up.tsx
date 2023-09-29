import { useForm } from "react-hook-form";
import AppButton from "../../ui-elements/app-button/app-button";
import AppInput from "../../ui-elements/app-input/app-input";
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
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { ...defaultFormValues },
  });

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
          })}
          rowClassName="mt-3"
          required
        />

        <AppInput
          labelFor="password"
          labelText="Password"
          type="password"
          placeholder="password"
          error={errors.password}
          name="password"
          register={register("password", {
            required: "Password is required",
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
            required: "Confirm Password is required",
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
