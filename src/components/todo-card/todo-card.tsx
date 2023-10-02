import moment from "moment";
import { Col, Row } from "react-bootstrap";
import AppSecondaryButton from "../../ui-elements/app-secondary-button/app-secondary-button";
import styles from "./todo-card.module.scss";

interface IProps {
  id: string;
  content: string;
  date: Date;
  isCompleted: boolean;
  sendActiveStatus: (
    id: string,
    content: string,
    date: Date,
    isCompleted: boolean
  ) => void;
  className?: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

function TodoCard(props: IProps) {
  const {
    id,
    content,
    date,
    isCompleted,
    className,
    onEditClick,
    onDeleteClick,
    sendActiveStatus,
  } = props;

  return (
    <Row
      className={`${styles.todoCard} ${
        className || ""
      } py-4 flex-column justify-content-center rounded`}
    >
      <Col>
        <Row>
          <Col>
            <Row className="flex-column">
              <Col className="font-size-24 font-weight-700 text-white">
                {content}
              </Col>
              <Col className="font-size-22 font-weight-500 text-white">
                {`${moment(date).format("DD")}th ${moment(date).format(
                  "MMMM YYYY"
                )}`}
              </Col>
            </Row>
          </Col>
          <Col className={`d-flex align-items-center col-auto`}>
            <div
              className={`${styles.checkBoxDiv} ${styles.checkBoxDivSelected}`}
              onClick={() => {
                sendActiveStatus(id, content, date, !isCompleted);
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  color: isCompleted ? "#8803fc" : "#fff",
                }}
                className="material-symbols-outlined"
              >
                done
              </span>
            </div>
          </Col>
        </Row>
      </Col>
      <Col className="mt-4">
        <Row className="align-items-center justify-content-end">
          <Col xs={5} sm={4} xl={2}>
            <AppSecondaryButton text="Edit" onClick={onEditClick} />
          </Col>
          <Col xs={5} sm={4} xl={2}>
            <AppSecondaryButton text="Delete" onClick={onDeleteClick} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TodoCard;
