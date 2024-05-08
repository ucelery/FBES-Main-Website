import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel, Stack } from 'react-bootstrap';
import ModalInputField from './ModalInputField';

function AddModal({ object, handleShow, handleClose, handleSubmit }) {
    const [formData, setFormData] = useState(object);

    const handleChange = (key, value) => {
        setFormData((prevFormData) => (
            {
                ...prevFormData,
                [key]: value
            }
        ));
    }

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Stack gap={3}>
                            {
                                Object.entries(formData).map(([key, value]) => (
                                    <ModalInputField key={key} name={key} value={value} onChange={(event) => handleChange(key, event.target.value)} />
                                ))
                            }
                        </Stack>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleSubmit(formData);
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default AddModal;