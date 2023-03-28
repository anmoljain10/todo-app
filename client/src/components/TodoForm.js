import { Mutation } from "react-apollo";
import { useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { CREATE_TODO } from "../graphql/mutations";

function TodoForm() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Mutation mutation={CREATE_TODO}>
      {(createTodo, { loading, error, data }) => (
        <div class="mx-5">
          <h1 style={{ marginTop: "25%", fontWeight: "bold", color: "white" }}>
            Add Todo
          </h1>
          <Card
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              padding: 40,
              width: "100%",
            }}
          >
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                createTodo({
                  variables: { task, description, isCompleted: false },
                });
                setTask("");
                setDescription("");
              }}
            >
              <Form.Label class="text-white fs-2 mt-5 mb-2">
                <h3> Enter Task</h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                value={task}
                style={{ paddingTop: 10, paddingBottom: 10 }}
                onChange={(event) => setTask(event.target.value)}
              ></Form.Control>

              <Form.Label class="text-white fs-2 mt-5 mb-2">
                <h3>Enter Description</h3>
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
                  disabled={
                    task === "" || description === "" || loading === true
                  }
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
          </Card>
        </div>
      )}
    </Mutation>
  );
}

export default TodoForm;
