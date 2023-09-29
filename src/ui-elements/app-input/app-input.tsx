import React from "react";
import { Col, Row } from "react-bootstrap";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./app-input.module.scss";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelFor?: string;
  error?: FieldError | undefined;
  register?: UseFormRegisterReturn;
  rowClassName?: string;
}

function AppInput(props: IProps) {
  const {
    rowClassName,
    className,
    labelText,
    labelFor,
    error,
    type,
    register,
    required,
    ...rest
  } = props;
  return (
    <Row className={`flex-column ${rowClassName || ""}`}>
      {labelText && (
        <Col className="font-weight-500">
          <label htmlFor={labelFor}>
            {labelText}
            {required && <span className="text-danger font-size-18">*</span>}
          </label>
        </Col>
      )}
      <Col>
        <input
          id={labelFor}
          className={`${className} ${styles.appInput} ${
            error ? styles.error : styles.normal
          } rounded w-100`}
          {...rest}
          type={type || "text"}
          {...register}
        />
      </Col>

      {error && <Col className="text-danger">{error.message}</Col>}
    </Row>
  );
}

export default AppInput;
