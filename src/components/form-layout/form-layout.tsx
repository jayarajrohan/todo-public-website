import { Col, Row } from "react-bootstrap";
import formLayout from "./assets/form-layout.jpg";
import styles from "./form-layout.module.scss";

interface IProps {
  children: JSX.Element;
}

function FormLayout(props: IProps) {
  const { children } = props;

  return (
    <Row className={`align-items-center ${styles.formLayout} g-0`}>
      <Col className="px-3">{children}</Col>
      <Col className="d-none d-md-block">
        <img
          src={formLayout}
          alt="Pen and paper"
          className={styles.formLayoutImage}
        />
      </Col>
    </Row>
  );
}

export default FormLayout;
