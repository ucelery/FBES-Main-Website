import Stack from 'react-bootstrap/Stack';
import ApiController from '../utils/ApiController';
import { useEffect, useState } from 'react';
import StaffRow from '../components/staffRow'
import './table.css'

function StaffView() {
    const [staff, setGallery] = useState([]);

    useEffect(() => { fetchGallery() })

    const fetchGallery = async () => {
        try {
            const data = await ApiController.get('https://inventory-system-server-44k0.onrender.com/api/secure/staff/get');
            setGallery(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = () => {
        fetchGallery();
    }

    return (
        <Stack gap={3} className='col-md-7 mx-auto'>
            <br />
            <h1>Staff</h1>
            {
                staff.map(ann => (
                    <StaffRow key={ann.id} staff={ann} onDelete={handleDelete} />
                ))
            }
            <br />
        </Stack>
    );
}

export default StaffView;