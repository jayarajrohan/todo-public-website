import { Col, Row } from "react-bootstrap";
import {
  Control,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import { v4 as uuid } from "uuid";
import IOption from "../../interfaces/option";
import styles from "./app-select.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: IOption[];
  rowClassName?: string;
  labelText?: string;
  labelFor?: string;
  error?: FieldError | undefined;
  register?: UseFormRegisterReturn;
  control?: Control<any, any>;
}

function AppSelect(props: IProps) {
  const {
    options,
    labelText,
    labelFor,
    required,
    rowClassName,
    className,
    error,
    control,
    ...rest
  } = props;

  return (
    <Row className={`flex-column ${rowClassName}`}>
      {labelText && (
        <Col className="font-size-18 font-weight-500">
          <label htmlFor={labelFor}>
            {labelText}
            {required && <span className="text-danger font-size-18">*</span>}
          </label>
        </Col>
      )}
      <Col>
        <Controller
          name={rest.name as string}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className={`${styles.appSelect} ${className || ""} ${
                error ? styles.error : styles.normal
              }`}
              id={labelFor}
              {...rest}
            >
              <option value="">Select</option>
              {options.map((option) => {
                return (
                  <option key={uuid()} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          )}
        />
      </Col>

      {error && <Col className="text-danger">{error.message}</Col>}
    </Row>
  );
}

export default AppSelect;
