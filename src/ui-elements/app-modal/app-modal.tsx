import styles from "./app-modal.module.scss";

interface IProps {
  show: boolean;
  children: JSX.Element;
  size?: "modal-sm" | "modal-lg" | "modal-md";
}

const AppModal = (props: IProps) => {
  return (
    <div
      className={`${
        props.show ? `${styles.showingModal}` : `${styles.notShowingModal}`
      } ${styles.appModalBackdrop} px-3`}
    >
      <div
        className={`${props.size || styles.modalLg} ${
          styles.appModalContainer
        }`}
      >
        <div className={`${props.show ? "d-block" : "d-none"}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AppModal;
