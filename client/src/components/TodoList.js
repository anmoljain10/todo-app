import {
  ListGroupItem,
  ListGroup,
  Placeholder,
  Form,
  CloseButton,
} from "react-bootstrap";
import RemoveTodoModal from "./RemoveTodoModal";
import { GET_TODOS } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_TODO, UPDATE_TASK_STATUS } from "../graphql/mutations";
import { useEffect, useState } from "react";

function TodoList() {
  const placeholderSkeletons = [
    "placeholder 1",
    "placeholder 2",
    "placeholder 3",
    "placeholder 4",
  ];
  const [removeTodoModalVisible, setTodoModalVisibility] = useState(false);
  const [removeTodoId, setRemoveTodoId] = useState(null);
  const { loading, error, data } = useQuery(GET_TODOS);
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
