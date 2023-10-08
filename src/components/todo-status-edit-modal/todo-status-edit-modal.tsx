import { Col, Row } from "react-bootstrap";
import ITodo from "../../interfaces/todo";
import ModalContainer from "../../ui-elements/modal-container/modal-container";
import { API_URL } from "../../util/api";
import { showErrorToast, showSuccessToast } from "../../util/toast";

interface IProps {
  todo: ITodo | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTodoUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoStatusEditModal(props: IProps) {
  const { todo, show, setShow, setIsTodoUpdated } = props;

  return (
    <ModalContainer
      show={show}
      title="Change Todo Status"
      onClose={() => {
        setShow(false);
      }}
      onConfirm={() => {
        let status: number;

        fetch(`${API_URL}/todo/update/${todo?._id}`, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({
            content: todo?.content,
            date: todo?.date,
            isCompleted: !todo?.isCompleted,
          }),
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
              showSuccessToast("Todo updated successfully");
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
          });
      }}
    >
      <Row>
        <Col className="text-danger font-size-20 font-weight-500">
          Do you want to change the status of this todo?
        </Col>
      </Row>
    </ModalContainer>
  );
}

export default TodoStatusEditModal;
