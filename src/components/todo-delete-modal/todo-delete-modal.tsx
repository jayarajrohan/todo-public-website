import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ModalContainer from "../../ui-elements/modal-container/modal-container";
import { showErrorToast, showSuccessToast } from "../../util/toast";

interface IProps {
  id: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTodoUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoDeleteModal(props: IProps) {
  const { id, show, setShow, setIsTodoUpdated } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ModalContainer
      show={show}
      title="Delete Todo"
      onClose={() => {
        setShow(false);
      }}
      isLoading={isLoading}
      onConfirm={() => {
        setIsLoading(true);
        let status: number;

        fetch(`${process.env.REACT_APP_API_URL}/todo/delete/${id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/JSON",
          },
        })
          .then((res) => {
            status = res.status;
            return res.json();
          })
          .then((data) => {
            if (status === 200) {
              showSuccessToast("Todo deleted successfully");
              setShow(false);
              setIsTodoUpdated((ps) => !ps);
            } else if (status === 422) {
              showErrorToast("Validations failed! Please check your inputs");
            } else {
              showErrorToast("Something went wrong! Please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
            showErrorToast("Something went wrong! Please try again later");
          })
          .finally(() => {
            setIsLoading(false);
          });
        setIsTodoUpdated((ps) => !ps);
      }}
    >
      <Row>
        <Col className="text-danger font-size-20 font-weight-500">
          Do you want to delete this todo?
        </Col>
      </Row>
    </ModalContainer>
  );
}

export default TodoDeleteModal;
