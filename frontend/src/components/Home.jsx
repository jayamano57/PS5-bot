import React, {useState, useEffect} from "react";
import VendorBox from "./VendorBox";
import VendorForm from "./VendorForm"
import styled from "styled-components";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import { toast, ToastContainer } from 'react-toastify';
import { device } from '../deviceBP';
import walmartLogo from "../assets/walmart-logo-png-transparent.png"
import bestbuyLogo from "../assets/best-buy-logo-png-transparent.png"

const HomeContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`
const Header = styled.h1`
	margin-top: 9rem;
	font-size: 6rem;
	color: #404040;
	font-weight: 400;
	@media ${device.tablet} {
		font-size: 4rem;
	}
`
const VendorContainer = styled.div`
	margin-top: 12rem;
	display: flex;
    flex-wrap: wrap;
`
const MuiModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`
const MuiButton = styled(Button)`
	margin-top: 2rem !important;
`
const MuiFade = styled(Fade)`
	width: 81rem;
	&:focus {
		outline: none;
	}
`
export default function Home() {
    const [open, setOpen] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false)
	const [vendor, setVendor] = useState('');

	useEffect(() => {
		(async function getTasks() {
			const tasks = await fetch('http://localhost:3000/api/tasks');
			const {jobs} = await tasks.json();
			setTasks(jobs);
		})();
	}, [])
	

	const handleOpen = (vendor) => {
		setOpen(true);
		setVendor(vendor)
	}
	
	const handleClose = () => {
		setOpen(false);
		setVendor('')
	}

	const stopTasks = async () => {
		setLoading(true);
		const response = await fetch('http://localhost:3000/api/stop');
        await response.json();
        setLoading(false);
		setTasks([]);
        toast.success("All tasks have been stopped", {
            position: toast.POSITION.BOTTOM_LEFT
        });
	}

    return (
        <HomeContainer>
            <Header>Jay's PS5 Bot 🤖</Header>
			{tasks.length > 0 && (
            	<MuiButton
            	  	disabled={loading}
					variant="contained"
            		onClick={stopTasks}
					color="primary" 
            		size="large"
            	>
				  Stop {tasks.length ? `all ${tasks.length} tasks` : `1 task`}
            	</MuiButton>
			)}
            <VendorContainer>
                <VendorBox handleOpen={() => handleOpen('walmart')} logo={walmartLogo} vendor="walmart" />
                <VendorBox handleOpen={() => handleOpen('bestbuy')} logo={bestbuyLogo} vendor="bestbuy" />
            </VendorContainer>
            <MuiModal
        		aria-labelledby="transition-modal-title"
        		aria-describedby="transition-modal-description"
        		open={open}
        		onClose={handleClose}
        		closeAfterTransition
        		BackdropComponent={Backdrop}
        		BackdropProps={{
        		  timeout: 500,
        		}}
      		>
        		<MuiFade in={open}>
					<div>
						<VendorForm handleClose={handleClose} vendor={vendor}/>
					</div>
        		</MuiFade>
      		</MuiModal>
			  <ToastContainer />
        </HomeContainer>
    )
}