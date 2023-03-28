import { Query } from "react-apollo";
import { ListGroupItem, ListGroup, Placeholder, Form } from "react-bootstrap";
import { GET_TODOS } from "../graphql/queries";

function TodoList() {
  const placeholderSkeletons = [
    "placeholder 1",
    "placeholder 2",
    "placeholder 3",
    "placeholder 4",
  ];
  return (
    <Query query={GET_TODOS}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <>
              {placeholderSkeletons.map(() => {
                return (
                  <Placeholder xs={7} animation="glow">
                    <Placeholder
                      className="mt-2"
                      xs="7"
                      style={{ height: 50 }}
                    />
                  </Placeholder>
                );
              })}
            </>
          );
        if (error) return <p>Error :(</p>;

        return (
          <ListGroup>
            {data.todoList.map(({ id, task, description, isCompleted }) => (
              <ListGroupItem key={id}>
                <h3>{task}</h3> {description}
                <Form.Check type={"checkbox"} size="lg" checked={isCompleted} />
              </ListGroupItem>
            ))}
          </ListGroup>
        );
      }}
    </Query>
  );
}

export default TodoList;
