import { Col, Row } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import styles from "./app-switch.module.scss";

interface IProps {
  options: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

function AppSwitch(props: IProps) {
  const { options, selected, setSelected } = props;

  return (
    <Row>
      {options.map((option, index) => (
        <Col key={uuid()}>
          <button
            className={`${styles.switch} ${
              selected === index + 1 ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => {
              setSelected(index + 1);
            }}
          >
            {option}
          </button>
        </Col>
      ))}
    </Row>
  );
}

export default AppSwitch;
