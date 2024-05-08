import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarScroll from '../components/navbar';
import HomeView from './home'
import { useState } from 'react'
import AnnouncementView from './announcement';
import GalleryView from './gallery';
import StaffView from './staff';
import config from '../utils/config';
import ApiController from '../utils/ApiController';
import AddModal from '../components/AddModal';

function Dashboard() {
    const [currentPage, setCurrentPage] = useState(<HomeView />);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedPage, setSelectedPage] = useState("Home");

    const addModalOpen = () => {
        setIsAdding(true);
    }

    const addModalClose = () => {
        setIsAdding(false);
    }

    const onAddSubmit = async (object) => {
        object.school_id = config.school_id;
        addModalClose();
        const hostUrl = "https://inventory-system-server-44k0.onrender.com";
        let apiRoute = "";

        switch (selectedPage) {
            case 'Announcement':
                apiRoute = "/api/secure/announcement/add";
                break;
            case 'Gallery':
                apiRoute = "/api/secure/event/add";
                break;
            case 'Staff':
                apiRoute = "/api/secure/staff/add";
                break;
        }

        try {
            const res = await ApiController.post(hostUrl + apiRoute, object);
        } catch (err) {
            console.log(err);
        }
    }

    const getFormObject = () => {
        switch (selectedPage) {
            case 'Announcement':
                return {
                    title: "",
                    description: "",
                    image_url: "",
                }
            case 'Gallery':
                return {
                    title: "",
                    date_created: "",
                    description: "",
                    type: "",
                    status: "",
                    image_url: "",
                };
            case 'Staff':
                return {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    email: "",
                    mobileNo: "",
                    position: ""
                }
        }
    }

    const handleButtonSelect = (selectedButton) => {
        switch (selectedButton) {
            case 'Home':
                setCurrentPage(<HomeView />);
                break;
            case 'Announcement':
                setCurrentPage(<AnnouncementView />);
                break;
            case 'Gallery':
                setCurrentPage(<GalleryView />);
                break;
            case 'Staff':
                setCurrentPage(<StaffView />);
                break;
        }
        setSelectedPage(selectedButton);
    }

    return (
        <div className="Dashboard">
            {
                isAdding ? <AddModal object={getFormObject()} handleShow={addModalOpen} handleClose={addModalClose} handleSubmit={onAddSubmit} /> : null
            }
            <NavbarScroll onAddButtonClick={addModalOpen} onButtonSelect={handleButtonSelect} />
            {currentPage}
        </div>
    );
}

export default Dashboard;
