import { Modal, Button } from "react-bootstrap";

const RemoveTodoModal = (props) => {
  return (
    <Modal show={props.isVisible} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove the task?</p>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button className="mx-3" variant="danger" onClick={props.onRemove}>
          Remove
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveTodoModal;
