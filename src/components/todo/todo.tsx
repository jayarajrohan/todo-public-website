import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import ITodo from "../../interfaces/todo";
import AppButton from "../../ui-elements/app-button/app-button";
import AppSwitch from "../../ui-elements/app-switch/app-switch";
import { API_URL } from "../../util/api";
import TodoCard from "../todo-card/todo-card";

function Todo() {
  const [selected, setSelected] = useState(1);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState(0);

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
        } else {
          setTodos([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setTodos([]);
      });
  }, [status]);

  const sendActiveStatus = (id: string, isCompleted: boolean) => {
    console.log(id, isCompleted);
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
              <AppButton text="Add" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="flex-column align-items-center">
        {todos.map((todo) => {
          return (
            <Col key={uuid()} xs={12} sm={10} lg={8} className="px-4 px-sm-2">
              <TodoCard
                id={todo._id}
                content={todo.content}
                date={todo.date}
                isCompleted={todo.isCompleted}
                sendActiveStatus={sendActiveStatus}
                className="mt-5"
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Todo;
