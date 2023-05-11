import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { UPDATE_TASK_DETAILS } from "../graphql/mutations";
import { GET_TODOS } from "../graphql/queries";
import { useMutation } from "@apollo/client";

const TodoUpdateModal = ({ isVisible, onClose, todoItem }) => {
  console.log(todoItem, "item");
  const [task, setTask] = useState(todoItem.task);
  const [description, setDescription] = useState(todoItem.description);

  useEffect(() => {
    setTask(todoItem.task);
    setDescription(todoItem.description);
  }, [todoItem]);

  const [updateTaskDetails, { loading, data, error }] = useMutation(
    UPDATE_TASK_DETAILS,
    {
      refetchQueries: [{ query: GET_TODOS }],
    }
  );

  useEffect(() => {
    setTask("");
    setDescription("");
    onClose();
  }, [data, error]);

  return (
    <Modal show={isVisible} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            updateTaskDetails({
              variables: { task, description, taskId: todoItem.id },
            });
          }}
        >
          <Form.Label class="fs-2 mt-2 mb-2">
            <h3>Task</h3>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            value={task}
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onChange={(event) => setTask(event.target.value)}
          ></Form.Control>

          <Form.Label class="fs-2 mt-2 mb-2">
            <h3>Description</h3>
          </Form.Label>
          <Form.Control
            type="text"
            style={{ paddingTop: 10, paddingBottom: 10 }}
            placeholder="Enter Description"
            as="textarea"
            row={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></Form.Control>
          <div class="mt-5">
            <Button
              disabled={task === "" || description === "" || loading === true}
              type="submit"
              size="lg"
              variant="dark"
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TodoUpdateModal;
