import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import ApiController from '../utils/ApiController';
import config from '../utils/config';

function HomeView() {
    const [schoolData, setSchoolData] = useState(null);

    const [name, set_name] = useState(schoolData?.name);
    const [mission, set_mission] = useState(schoolData?.mission);
    const [vision, set_vision] = useState(schoolData?.vision);
    const [about, set_about] = useState(schoolData?.about);
    const [history, set_history] = useState(schoolData?.history);

    const [address, set_address] = useState(schoolData?.address);
    const [email, set_email] = useState(schoolData?.email);
    const [mobileNo, set_mobileNo] = useState(schoolData?.mobileNo);
    const [telNo, set_telNo] = useState(schoolData?.telNo);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { fetchSchool() }, [])

    const saveEdits = async () => {
        console.log("fetching");
        setIsLoading(true);
        const res = await ApiController.post("https://inventory-system-server-44k0.onrender.com/api/secure/school/update", {
            school_id: schoolData._id,
            name: name,
            mission: mission,
            vision: vision,
            about: about,
            history: history,
            address: address,
            email: email,
            mobileNo: mobileNo,
            telNo: telNo,
        });

        setIsLoading(false);
        setSchoolData(res.school);
        console.log("done");
    }

    const fetchSchool = async () => {
        try {
            console.log("fetching");
            const data = await ApiController.get('https://inventory-system-server-44k0.onrender.com/api/secure/school/get');

            for (const school of data) {
                // Temporary Hash
                if (school._id === config.school_id) {
                    setSchoolData(school);
                    setIsLoading(false);
                    console.log("done!");
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Stack gap={3} className='col-md-6 mx-auto'>
                <br></br>
                <h1>
                    School data
                </h1>
                <FloatingLabel controlId="schoolName" label="School Name">
                    <Form.Control size="sm" type="text" placeholder="School Name" defaultValue={schoolData?.name} onChange={(event) => { set_name(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <Row>
                    <Col>
                        <FloatingLabel controlId="vision" label="Vision">
                            <Form.Control size="sm" type="text" placeholder="Vision" defaultValue={schoolData?.vision} onChange={(event) => { set_vision(event.target.value) }} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="mission" label="Mission">
                            <Form.Control size="sm" type="text" placeholder="Mission" defaultValue={schoolData?.mission} onChange={(event) => { set_mission(event.target.value) }} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel controlId="history" label="Brief History">
                    <Form.Control size="sm" as="textarea" placeholder="Brief History" defaultValue={schoolData?.history} onChange={(event) => { set_history(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel controlId="address" label="Address">
                    <Form.Control size="sm" type="text" placeholder="Address" defaultValue={schoolData?.address} onChange={(event) => { set_address(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Email">
                    <Form.Control size="sm" type="text" placeholder="Email" defaultValue={schoolData?.email} onChange={(event) => { set_email(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel controlId="telNo" label="Mobile No.">
                    <Form.Control size="sm" type="text" placeholder="Mobile No." defaultValue={schoolData?.mobileNo} onChange={(event) => { set_mobileNo(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel controlId="telNo" label="Telephone No.">
                    <Form.Control size="sm" type="text" placeholder="Telephone No." defaultValue={schoolData?.telNo} onChange={(event) => { set_telNo(event.target.value) }} disabled={isLoading} />
                </FloatingLabel>
                <Button variant="primary" type="submit" onClick={() => {
                    setIsLoading(true);
                    saveEdits()
                }}>
                    Submit
                </Button>
            </Stack>
        </>
    );
}

export default HomeView;