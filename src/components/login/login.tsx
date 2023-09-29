import { useForm } from "react-hook-form";
import AppButton from "../../ui-elements/app-button/app-button";
import AppInput from "../../ui-elements/app-input/app-input";
import FormLayout from "../form-layout/form-layout";

interface IFormInput {
  email: string;
  password: string;
}

const defaultFormValues: IFormInput = {
  email: "",
  password: "",
};

function Login() {
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
          placeholder="Password"
          error={errors.password}
          name="password"
          register={register("password", {
            required: "Password is required",
          })}
          rowClassName="mt-3"
          required
        />

        <AppButton text="Login" type="submit" rowClassName="mt-4" />
      </form>
    </FormLayout>
  );
}

export default Login;
