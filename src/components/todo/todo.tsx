import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AppButton from "../../ui-elements/app-button/app-button";
import AppSwitch from "../../ui-elements/app-switch/app-switch";
import TodoCard from "../todo-card/todo-card";

function Todo() {
  const [selected, setSelected] = useState(1);

  const sendActiveStatus = (id: string, isCompleted: boolean) => {
    console.log(id, isCompleted);
  };

  return (
    <>
      <Row className={`align-items-center justify-content-center mt-4`}>
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
      <Row className="justify-content-center">
        <Col xs={12} sm={10} lg={8} className="px-4 px-sm-2">
          <TodoCard
            id="123"
            content="Have to go to Airport tomorrow"
            date={new Date()}
            isCompleted={false}
            sendActiveStatus={sendActiveStatus}
            className="mt-5"
          />
        </Col>
      </Row>
    </>
  );
}

export default Todo;
