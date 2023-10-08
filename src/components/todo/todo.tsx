import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ITodo from "../../interfaces/todo";
import LogoutModal from "../../logout/logout-modal";
import AppButton from "../../ui-elements/app-button/app-button";
import AppSwitch from "../../ui-elements/app-switch/app-switch";
import AddUpdateTodoModal from "../add-update-todo-modal/add-update-todo-modal";
import TodoCard from "../todo-card/todo-card";
import TodoDeleteModal from "../todo-delete-modal/todo-delete-modal";
import TodoStatusEditModal from "../todo-status-edit-modal/todo-status-edit-modal";

function Todo() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusEditModal, setShowStatusEditModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState<ITodo | undefined>(undefined);
  const [isTodoUpdated, setIsTodoUpdated] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/todo/all`, {
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

  return (
    <>
      <Row className="mt-4 justify-content-end px-5">
        <Col xs={5} sm={4} xl={2}>
          <AppButton
            text="Logout"
            onClick={() => {
              setShowLogoutModal(true);
            }}
          />
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
                  content={todo.content}
                  date={todo.date}
                  isCompleted={todo.isCompleted}
                  onStatusEditClick={() => {
                    setTodo(todo);
                    setShowStatusEditModal(true);
                  }}
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

      <TodoStatusEditModal
        show={showStatusEditModal}
        setShow={setShowStatusEditModal}
        todo={todo}
        setIsTodoUpdated={setIsTodoUpdated}
      />

      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
    </>
  );
}

export default Todo;
