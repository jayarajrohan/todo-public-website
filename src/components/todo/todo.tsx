import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ITodo from "../../interfaces/todo";
import AppButton from "../../ui-elements/app-button/app-button";
import AppSwitch from "../../ui-elements/app-switch/app-switch";
import { API_URL } from "../../util/api";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import AddUpdateTodoModal from "../add-update-todo-modal/add-update-todo-modal";
import TodoCard from "../todo-card/todo-card";
import TodoDeleteModal from "../todo-delete-modal/todo-delete-modal";

function Todo() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState<ITodo | undefined>(undefined);
  const [isTodoUpdated, setIsTodoUpdated] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/todo/all`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((data) => {
        if (status === 200) {
          setTodos(data.todos);
        } else if (status === 401) {
          navigate("/login");
        } else {
          setTodos([]);
        }
      })
      .catch((error) => {
        if (status === 401) {
          navigate("/login");
        }
        setTodos([]);
      });
  }, [status, isTodoUpdated, navigate]);

  const sendActiveStatus = (
    id: string,
    content: string,
    date: Date,
    isCompleted: boolean
  ) => {
    let status: number;

    fetch(`${API_URL}/todo/update/${id}`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({
        content: content,
        date: date,
        isCompleted: isCompleted,
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
  };

  return (
    <>
      <Row className="mt-4 justify-content-end px-5">
        <Col xs={5} sm={4} xl={2}>
          <AppButton text="Logout" />
        </Col>
      </Row>
      <Row className={`mt-5 align-items-center justify-content-center mt-4`}>
        <Col xs={12} sm={10} lg={8}>
          <Row className="align-items-center">
            <Col className="px-sm-0">
              <Row>
                <Col xs={10} md={6} xl={4}>
                  <AppSwitch
                    selected={selected}
                    setSelected={setSelected}
                    options={["Todo", "Completed"]}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={4} md={3} xl={2} className="px-sm-0">
              <AppButton
                text="Add"
                onClick={() => {
                  setIsEdit(false);
                  setShow(true);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="flex-column align-items-center">
        {todos
          .filter((todo) =>
            selected === 1 ? !todo.isCompleted : todo.isCompleted
          )
          .map((todo) => {
            return (
              <Col key={uuid()} xs={12} sm={10} lg={8} className="px-4 px-sm-2">
                <TodoCard
                  id={todo._id}
                  content={todo.content}
                  date={todo.date}
                  isCompleted={todo.isCompleted}
                  sendActiveStatus={sendActiveStatus}
                  className="mt-5"
                  onEditClick={() => {
                    setTodo(todo);
                    setIsEdit(true);
                    setShow(true);
                  }}
                  onDeleteClick={() => {
                    setTodo(todo);
                    setShowDeleteModal(true);
                  }}
                />
              </Col>
            );
          })}
      </Row>

      <AddUpdateTodoModal
        show={show}
        setShow={setShow}
        isEdit={isEdit}
        todo={todo}
        onModalClose={() => {
          setIsEdit((ps) => !ps);
        }}
        setIsTodoUpdated={setIsTodoUpdated}
      />

      <TodoDeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        setIsTodoUpdated={setIsTodoUpdated}
        id={todo?._id || ""}
      />
    </>
  );
}

export default Todo;
