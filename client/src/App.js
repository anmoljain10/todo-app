import "./App.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TodoForm from "./components/TodoForm";

const GET_TODOS = gql`
  {
    todoList {
      task
      description
      isCompleted
      id
    }
  }
`;

function App() {
  return (
    <div>
      <TodoForm />
      <Query query={GET_TODOS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <ul>
              {data.todoList.map(({ id, task, description, isCompleted }) => (
                <li key={id}>
                  {task}: {description} (
                  {isCompleted ? "completed" : "not completed"})
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
