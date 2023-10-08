import { Col, Container, Row } from "react-bootstrap";
import AppButton from "../app-button/app-button";
import AppModal from "../app-modal/app-modal";

export interface ModelContainerProps {
  show: boolean;
  title?: string;
  size?: "modal-sm" | "modal-lg" | "modal-md";
  onClose?: () => void;
  onConfirm?: () => void;
  confirmButtonText?: string;
  children?: JSX.Element;
  isLoading?: boolean;
  className?: string;
}

const ModalContainer = (props: ModelContainerProps) => {
  const {
    show,
    title,
    size,
    onClose,
    onConfirm,
    confirmButtonText,
    children,
    className,
  } = props;

  return (
    <AppModal show={show} size={size}>
      <Container fluid className="p-0">
        <Row className="justify-content-between">
          <Col xs="10">
            <div
              className="font-size-22"
              style={{
                fontWeight: 500,
                fontSize: "24px",
                color: "#505662",
              }}
            >
              {title}
            </div>
          </Col>
          <Col xs="2" sm="auto" className="d-flex align-items-center fw-bold">
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={onClose}
            >
              close
            </span>
          </Col>
        </Row>
        <Row className={`${className ? className : `mt-4`}`}>
          <Col xs={12}>{children}</Col>
        </Row>
        <Row className="mt-5">
          <Col xs="auto">
            <AppButton
              text={confirmButtonText || "Confirm"}
              onClick={onConfirm}
            />
          </Col>
        </Row>
      </Container>
    </AppModal>
  );
};

export default ModalContainer;
