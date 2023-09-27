import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./app-input.module.scss";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelFor?: string;
}

function AppInput(props: IProps) {
  const { className, labelText, labelFor, ...rest } = props;
  return (
    <Row className="flex-column">
      {labelText && (
        <Col className="font-weight-500">
          <label htmlFor={labelFor}>{labelText}</label>
        </Col>
      )}
      <Col>
        <input
          id={labelFor}
          className={`${className} ${styles.appInput} rounded w-100`}
          {...rest}
        />
      </Col>
    </Row>
  );
}

export default AppInput;
