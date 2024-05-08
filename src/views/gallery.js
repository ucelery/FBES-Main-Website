import Stack from 'react-bootstrap/Stack';
import ApiController from '../utils/ApiController';
import { useEffect, useState } from 'react';
import GalleryRow from '../components/galleryRow'

function GalleryView() {
    const [gallery, setGallery] = useState([]);

    useEffect(() => { fetchGallery() })

    const fetchGallery = async () => {
        try {
            const data = await ApiController.get('https://inventory-system-server-44k0.onrender.com/api/secure/event/get');
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
            <h1>Gallery</h1>

            {
                gallery.map(ann => (
                    <GalleryRow key={ann.id} gallery={ann} onDelete={handleDelete} />
                ))
            }
            <br />
        </Stack>
    );
}

export default GalleryView;