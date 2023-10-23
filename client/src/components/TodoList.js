import {
  ListGroupItem,
  ListGroup,
  Placeholder,
  Form,
  CloseButton,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveTodoModal from "./RemoveTodoModal";
import { GET_TODOS } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_TODO, UPDATE_TASK_STATUS } from "../graphql/mutations";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoList(props) {
  const placeholderSkeletons = [
    "placeholder 1",
    "placeholder 2",
    "placeholder 3",
    "placeholder 4",
  ];
  const [removeTodoModalVisible, setTodoModalVisibility] = useState(false);
  const [removeTodoId, setRemoveTodoId] = useState(null);
  const { loading, error, data } = useQuery(GET_TODOS);
  const completedTodos = data?.todoList.reduce((acc, value) => {
    return value.isCompleted === true ? acc + 1 : acc
  }, 0);


  const [removeTodo, removeResponse] = useMutation(REMOVE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTaskStatus, updateResponse] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  function onSelectionChange(taskId) {
    console.log(taskId, "task id");
    updateTaskStatus({ variables: { taskId: taskId } });
  }

  useEffect(() => {
    setRemoveTodoId(null);
    if (removeResponse.data) {
      setTodoModalVisibility(false);
    }
  }, [removeResponse.error, removeResponse.data]);

  useEffect(() => {
    console.log("error updating task!", updateResponse);
  }, [updateResponse.error]);

  function onRemoveConfirm() {
    if (removeTodoId) {
      removeTodo({ variables: { taskId: removeTodoId } });
    }
  }
  function onModalClose() {
    setTodoModalVisibility(false);
  }

  return (
    <>
      <div className="mb-3">Completed Tasks: {completedTodos}</div>
      {loading &&
        placeholderSkeletons.map(() => {
          return (
            <Placeholder xs={7} animation="glow">
              <Placeholder className="mt-2" xs="7" style={{ height: 50 }} />
            </Placeholder>
          );
        })}
      {error && <p>Error loading Todos :(</p>}
      {data && data?.todoList.length ? (
        <ListGroup>
          {data.todoList.map(
            ({ id, task, description, isCompleted, priority }) => (
              <ListGroupItem
                key={id}
                variant={
                  isCompleted
                    ? "success"
                    : priority <= 2
                      ? "info"
                      : priority <= 4
                        ? "warning"
                        : "danger"
                }
              >
                <CloseButton
                  variant="danger"
                  style={{ position: "absolute", top: 10, right: 10 }}
                  onClick={() => {
                    setRemoveTodoId(id);
                    setTodoModalVisibility(true);
                  }}
                ></CloseButton>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <FontAwesomeIcon
                  icon={faEdit}

                  onClick={() => {
                    if (isCompleted) {
                      toast("Task is already complete")
                      return
                    }
                    props.onTodoUpdateClick({ id, task, description })
                  }
                  }
                  style={{
                    position: "absolute",
                    top: 15,
                    right: 50,
                    cursor: "pointer",
                  }}
                />

                <div class="d-flex align-items-start">
                  <div>
                    <Form.Check
                      type={"checkbox"}
                      size="lg"
                      variant="success"
                      className="mt-1"
                      checked={isCompleted}
                      onChange={() => onSelectionChange(id)}
                    />
                  </div>
                  <div class="mx-3">
                    <h3 class="pt-0 mt-0">{task}</h3> {description}
                  </div>
                </div>
              </ListGroupItem>
            )
          )}
        </ListGroup>
      ) : (
        <p>No Todos available, add Todo. 😴</p>
      )}

      <RemoveTodoModal
        isVisible={removeTodoModalVisible}
        onRemove={onRemoveConfirm}
        closeModal={onModalClose}
      />
    </>
  );
}

export default TodoList;
