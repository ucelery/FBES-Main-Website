import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import ApiController from '../utils/ApiController';

function AnnouncementItemRow(props) {
    let announcement = props.announcement;
    let isHeader = props.isHeader == "true";

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(announcement.title);
    const [description, setDescription] = useState(announcement.description);
    const [image_url, setImage] = useState(announcement.image_url);

    const deleteRow = async (id) => {
        const res = await ApiController.post("https://inventory-system-server-44k0.onrender.com/api/secure/announcement/delete", {
            announcement_id: id
        });

        setIsEditing(false);
        props.onDelete();
    }

    const saveEdits = async (id) => {
        const res = await ApiController.post("https://inventory-system-server-44k0.onrender.com/api/secure/announcement/update", {
            announcement_id: id,
            title: title,
            description: description,
            image_url: image_url,
        });

        setIsEditing(false);

        announcement.title = res.announcement.title;
        announcement.description = res.announcement.description;
        announcement.image_url = res.announcement.image_url;
    }

    return (
        <Row onOut style={{ display: "flex", alignItems: "center" }}>
            <Col style={{ paddingLeft: "3px", paddingLeft: "3px", fontFamily: "consolas" }}>
                {
                    isEditing && !isHeader ? (
                        <FloatingLabel controlId="title" label="Title">
                            <Form.Control size="sm" type="text" placeholder="Title" defaultValue={announcement._id} disabled
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </FloatingLabel>
                    ) : (
                        announcement._id
                    )
                }
            </Col >
            <Col onClick={() => setIsEditing(true)} style={{ paddingLeft: "3px", paddingLeft: "3px", cursor: "pointer" }}>
                {
                    isEditing && !isHeader ? (
                        <FloatingLabel controlId="title" label="Title">
                            <Form.Control size="sm" type="text" placeholder="Title" defaultValue={announcement.title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </FloatingLabel>
                    ) : (
                        announcement.title
                    )
                }
            </Col>
            <Col onClick={() => setIsEditing(true)} style={{ paddingLeft: "3px", paddingLeft: "3px", cursor: "pointer" }}>
                {
                    isEditing && !isHeader ? (
                        <FloatingLabel controlId="description" label="Description">
                            <Form.Control size="sm" type="text" placeholder="Description" defaultValue={announcement.description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </FloatingLabel>
                    ) : (
                        announcement.description
                    )
                }
            </Col>
            <Col onClick={() => setIsEditing(true)} style={{ paddingLeft: "3px", paddingLeft: "3px", cursor: "pointer" }}>
                {
                    isEditing && !isHeader ? (
                        <FloatingLabel controlId="image_url" label="Image">
                            <Form.Control size="sm" type="text" placeholder="Image" defaultValue={announcement.image_url}
                                onChange={(event) => setImage(event.target.value)}
                            />
                        </FloatingLabel>
                    ) : (
                        announcement.image_url
                    )
                }
            </Col>
            {
                isEditing && !isHeader ? (
                    <Col style={{ paddingLeft: "3px", paddingLeft: "3px" }}>
                        <Row>
                            <Col>
                                <Button variant="outline-success" onClick={() => saveEdits(announcement._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                                    </svg>
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-danger" onClick={() => setIsEditing(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-warning" onClick={() => deleteRow(announcement._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                ) : null
            }
        </Row>
    );
}

export default AnnouncementItemRow;