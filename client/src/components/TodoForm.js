import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useState } from "react";

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
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTodo({
                variables: { task, description, isCompleted: false },
              });
              setTask("");
              setDescription("");
            }}
          >
            <input
              type="text"
              placeholder="Enter Task"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></input>
            <button
              disabled={task === "" || description === "" || loading === true}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default TodoForm;
