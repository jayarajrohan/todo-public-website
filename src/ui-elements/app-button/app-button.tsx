import { Col, Row } from "react-bootstrap";

interface IProps {
  onClick: () => void;
  text: string;
}

function AppButton(props: IProps) {
  const { onClick, text } = props;

  return (
    <Row>
      <Col
        className={`bg-primary text-white px-4 py-2 
        rounded-pill primary-hover text-center cursor-pointer`}
        onClick={onClick}
      >
        {text}
      </Col>
    </Row>
  );
}

export default AppButton;
