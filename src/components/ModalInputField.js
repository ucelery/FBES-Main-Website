import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ModalInputField({ name, value, onChange }) {
    return (
        <FloatingLabel label={name}>
            <Form.Control
                size="sm"
                type="text"
                placeholder={name}
                onChange={onChange}
                required
            />
        </FloatingLabel>
    );
}

export default ModalInputField;