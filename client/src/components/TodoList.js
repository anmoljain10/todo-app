import { ListGroupItem, ListGroup, Placeholder, Form } from "react-bootstrap";
import { GET_TODOS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function TodoList() {
  const placeholderSkeletons = [
    "placeholder 1",
    "placeholder 2",
    "placeholder 3",
    "placeholder 4",
  ];
  const { loading, error, data } = useQuery(GET_TODOS);
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
      {error && <p>Error :(</p>}
      {data && (
        <ListGroup>
          {data.todoList.map(({ id, task, description, isCompleted }) => (
            <ListGroupItem key={id}>
              <h3>{task}</h3> {description}
              <Form.Check type={"checkbox"} size="lg" checked={isCompleted} />
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default TodoList;
