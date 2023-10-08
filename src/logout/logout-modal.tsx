import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../ui-elements/modal-container/modal-container";
import { showErrorToast, showSuccessToast } from "../util/toast";

interface IProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogoutModal(props: IProps) {
  const navigate = useNavigate();
  const { show, setShow } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ModalContainer
      show={show}
      title="Change Todo Status"
      onClose={() => {
        setShow(false);
      }}
      isLoading={isLoading}
      onConfirm={() => {
        setIsLoading(false);
        let status: number;

        fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => {
            status = res.status;
            return res.json();
          })
          .then(() => {
            if (status === 200) {
              showSuccessToast("Logged out successfully");
            } else {
              showErrorToast("Something went wrong");
            }

            navigate("/login");

            setShow(false);
          })
          .catch((error) => {
            if (status === 401) {
              navigate("/login");
              setShow(false);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      <Row>
        <Col className="text-danger font-size-20 font-weight-500">
          Do you want to logout?
        </Col>
      </Row>
    </ModalContainer>
  );
}

export default LogoutModal;
