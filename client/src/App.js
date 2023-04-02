import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div>
      <Container fluid>
        <Row
          style={{
            height: "100vh",
          }}
        >
          <Col lg={6} className="animated-background">
            <TodoForm />
          </Col>
          <Col className="px-5 py-4">
            <h1 class="mb-3">Todos ⚡</h1>
            <TodoList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
