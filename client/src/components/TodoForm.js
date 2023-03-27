import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";

const CREATE_TODO = gql`
  mutation createTodo(
    $task: String!
    $description: String!
    $isCompleted: Boolean!
  ) {
    createTodo(
      task: $task
      description: $description
      isCompleted: $isCompleted
    ) {
      task
      description
      isCompleted
      id
    }
  }
`;

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
                <h2> Enter Task</h2>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                value={task}
                onChange={(event) => setTask(event.target.value)}
              ></Form.Control>

              <Form.Label class="text-white fs-2 mt-5 mb-2">
                <h2>Enter Description</h2>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
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
