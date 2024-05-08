import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function NavbarScroll(props) {
    const [currentPage, setCurrentPage] = useState('Home');

    const handleClick = (buttonName) => {
        props.onButtonSelect(buttonName);
        setCurrentPage(buttonName);
    }

    const handleAddButtonClick = () => {
        props.onAddButtonClick();
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">FBES Control Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => handleClick("Home")}> Home </Nav.Link>
                        <Nav.Link onClick={() => handleClick("Announcement")}> Announcement </Nav.Link>
                        <Nav.Link onClick={() => handleClick("Gallery")}> Gallery </Nav.Link>
                        <Nav.Link onClick={() => handleClick("Staff")}> Staff </Nav.Link>
                    </Nav>
                    <Nav>
                        <Navbar.Text style={{ marginRight: '25px' }}>selected: {currentPage.toLowerCase()}</Navbar.Text>
                        {
                            currentPage.toLowerCase() !== "home" ? <Button variant="outline-success" onClick={() => handleAddButtonClick()}>Add</Button> : null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarScroll;