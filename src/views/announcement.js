import Stack from 'react-bootstrap/Stack';
import ApiController from '../utils/ApiController';
import { useEffect, useState } from 'react';
import AnnouncementRow from '../components/announcementRow'

function AnnouncementView() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => { fetchAnnouncements() })

    const fetchAnnouncements = async () => {
        try {
            const data = await ApiController.get('https://inventory-system-server-44k0.onrender.com/api/secure/announcement/get');
            setAnnouncements(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = () => {
        fetchAnnouncements();
    }

    return (
        <Stack gap={3} className='col-md-7 mx-auto'>
            <br />
            <h1>Announcements</h1>

            {
                announcements.map(ann => (
                    <AnnouncementRow key={ann.id} announcement={ann} onDelete={handleDelete} />
                ))
            }
            <br />
        </Stack>
    );
}

export default AnnouncementView;