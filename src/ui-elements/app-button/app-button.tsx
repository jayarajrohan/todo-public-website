import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./app-button.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  rowClassName?: string;
}

function AppButton(props: IProps) {
  const { text, rowClassName, onClick, ...rest } = props;

  return (
    <Row className={rowClassName}>
      <Col>
        <button
          className={`bg-primary font-weight-500 font-size-18 text-white px-4 py-2 rounded-pill 
          primary-hover text-center cursor-pointer w-100 ${styles.appButton}`}
          onClick={onClick}
          {...rest}
        >
          {text}
        </button>
      </Col>
    </Row>
  );
}

export default AppButton;
