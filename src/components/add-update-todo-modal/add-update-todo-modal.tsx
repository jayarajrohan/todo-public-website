import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ITodo from "../../interfaces/todo";
import AppInput from "../../ui-elements/app-input/app-input";
import AppSelect from "../../ui-elements/app-select/app-select";
import ModalContainer from "../../ui-elements/modal-container/modal-container";
import { showErrorToast, showSuccessToast } from "../../util/toast";

interface IFormInput {
  content: string;
  date: string;
  isCompleted: string;
}

const defaultFormValues: IFormInput = {
  content: "",
  date: "",
  isCompleted: "",
};

interface IProps {
  todo: ITodo | undefined;
  isEdit: boolean;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose: () => void;
  setIsTodoUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddUpdateTodoModal(props: IProps) {
  const { todo, isEdit, show, setShow, onModalClose, setIsTodoUpdated } = props;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: { ...defaultFormValues },
  });

  useEffect(() => {
    if (isEdit && todo) {
      setValue("content", todo.content);
      setValue("date", moment(todo.date).format("yyyy-MM-DD"));
      setValue("isCompleted", todo.isCompleted ? "Completed" : "Not Completed");
    }
  }, [isEdit, todo, setValue]);

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    if (!isEdit) {
      let status: number;

      fetch(`${process.env.REACT_APP_API_URL}/todo/add`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          content: data.content,
          date: new Date(data.date),
          isCompleted: data.isCompleted === "Completed",
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
          if (status === 201) {
            showSuccessToast("Todo added successfully");
            setShow(false);
            setIsTodoUpdated((ps) => !ps);
            reset();
          } else if (status === 422) {
            showErrorToast("Validations failed! Please check your inputs");
          } else {
            showErrorToast("Something went wrong! Please try again later");
          }
        })
        .catch((error) => {
          console.log(error);
          showErrorToast("Something went wrong! Please try again later");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      let status: number;

      fetch(`${process.env.REACT_APP_API_URL}/todo/update/${todo?._id}`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          content: data.content,
          date: new Date(data.date),
          isCompleted: data.isCompleted === "Completed",
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
            reset();
          } else if (status === 422) {
            showErrorToast("Validations failed! Please check your inputs");
          } else {
            showErrorToast("Something went wrong! Please try again later");
          }
        })
        .catch((error) => {
          console.log(error);
          showErrorToast("Something went wrong! Please try again later");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <ModalContainer
      show={show}
      title="Add Todo"
      onClose={() => {
        reset();
        onModalClose();
        setShow(false);
      }}
      onConfirm={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Row className="flex-column">
        <Col>
          <AppInput
            labelFor="content"
            labelText="Content"
            placeholder="Content"
            error={errors.content}
            name="content"
            register={register("content", {
              required: "Content is required",
            })}
            required
          />
          <AppInput
            labelFor="date"
            labelText="Date"
            placeholder="Date"
            error={errors.date}
            name="date"
            type="date"
            register={register("date", {
              required: "date is required",
            })}
            rowClassName="mt-3"
            required
          />
          <AppSelect
            labelFor="todo-status"
            labelText="Todo Status"
            name="isCompleted"
            error={errors.isCompleted}
            options={[
              { label: "Completed", value: "Completed" },
              { label: "Not Completed", value: "Not Completed" },
            ]}
            register={register("isCompleted", {
              required: "Todo Status is required",
            })}
            rowClassName="mt-3"
            required
            control={control}
          />
        </Col>
      </Row>
    </ModalContainer>
  );
}

export default AddUpdateTodoModal;
