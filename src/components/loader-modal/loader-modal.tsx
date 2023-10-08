import Spinner from "react-spinkit";
import styles from "./loader-modal.module.scss";

interface IProps {
  show: boolean;
}

const LoaderModal = (props: IProps) => {
  const { show } = props;

  return (
    <>
      {show && (
        <div
          className={[
            styles.spinnerContainer,
            "w-100 h-100 d-flex align-items-center justify-content-center",
          ].join(" ")}
        >
          <Spinner name="ball-scale-multiple" color="#8803fc" />
        </div>
      )}
    </>
  );
};
export default LoaderModal;
