import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./app-secondary-button.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  rowClassName?: string;
}

function AppSecondaryButton(props: IProps) {
  const { text, rowClassName, onClick, ...rest } = props;

  return (
    <Row className={rowClassName}>
      <Col>
        <button
          className={`bg-white font-weight-500 font-size-18 text-primary px-4 py-2 rounded-pill 
          secondary-hover text-center cursor-pointer w-100 ${styles.appSecondaryButton}`}
          onClick={onClick}
          {...rest}
        >
          {text}
        </button>
      </Col>
    </Row>
  );
}

export default AppSecondaryButton;
