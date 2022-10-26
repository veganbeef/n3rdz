import { useContext, useState } from 'react';
import { StoreContext } from '../Store';
import {
	Avatar,
	Button,
	Cutout,
	Divider,
	Fieldset,
	Panel,
	Window,
	WindowContent,
	WindowHeader
} from 'react95';
import Draggable from 'react-draggable';
import hardwareWizard from '../assets/hardwareWizard.png';
import infoBook from '@react95/icons/png/Winhlp324001_32x32_4.png';
import n3rdfather from '../assets/n3rdfather.jpg';
import veganbeef from '../assets/veganbeef.jpg';
import '../styles/ProjectInfoWizard.css';

const ProjectInfoModal = () => {
	const [state, dispatch] = useContext(StoreContext);
	const [currentPage, setCurrentPage] = useState(0);

	const closeModal = () => {
		dispatch({ type: 'SET_PROJECT_INFO_MODAL', payload: false });
		setCurrentPage(0);
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Project Info'});
	};

	return (
		<Draggable defaultPosition={{ x: 400, y: 25 }} onStart={bringToFront}>
			<Window style={{
				width: '700px',
				position: 'absolute',
				display: state.projectInfoWizard ? 'block' : 'none',
				zIndex: state.projectInfoZIndex
			}}>
				<WindowHeader active={state.activeWindow === 'Project Info'} className='flex-center-between'>
					<div className='flex-center'>
						<img src={infoBook} width='21' alt='windows info icon' />
						<span style={{ paddingLeft: '8px' }}>Project Info</span>
					</div>
				</WindowHeader>
				<WindowContent className='flex-column' style={{ justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Panel variant="well" style={{ height: '390px' }}>
							<img src={hardwareWizard} alt='windows hardware wizard stock art' height="386" />
						</Panel>
						<div style={{ minHeight: '360px', width: '420px' }}>
							{currentPage === 0 && (<>
								<div className='wizard-heading'>About N3RDS</div>
								<Cutout style={{ height: '344px' }}>
									<div>N3RDS is a passion project! It’s a collection of 2001 Fanboys JPGs. As Founders we love the idea of a community that forms around an NFT and shares a common set of beliefs and values such as supporting each other when it comes to WGMI! At the foundation of this project lies a simple truth: WE ARE NERDS!</div>
									<br />
									<div>Our NFT collection now embodies what we are, what we love - thus a passion project! We will always be  grown man-children and that is why we can make one promise: We will keep building the nerd-verse! The N3RD collection is our first step into this bigger world. We want to keep learning, We want to keep building and ultimately we want to represent the nerds of this space in this space! By buying into this collection, you are buying into our vision!</div>
								</Cutout>
							</>)}
							{currentPage === 1 && (<>
								<div className='wizard-heading'>Team Bios</div>
								<Cutout style={{ height: '344px' }}>

									<div className='flex-center-start'>
										<Avatar size={50} src={n3rdfather} />
										<a href='https://twitter.com/n3rdfather' className='black-link'>@n3rdfather</a>
									</div>
									<div>I grew up in the developing years of the PC and the Internet. Its potential has amazed me ever since. Plus, I love everything geeky from Star Wars to The Lord of the Rings! My man cave is full of action figures, light sabers, DnD adventures and old retro video games.</div>
									<br />
									<div className='flex-center-start'>
										<Avatar size={50} src={veganbeef} />
										<a href='https://twitter.com/_veganbeef' className='black-link'>@_veganbeef</a>
									</div>
									<div>I've been a n3rd ever since reading Tolkien and Asimov as a kid! Fantasy, sci-fi, classical music, computer science -- my nerdiness runs deep! I'm a professional nerd as well, diving deep on new technologies like machine learning and blockchain engineering just for the sake of exploration.</div>
								</Cutout>
							</>)}
							{currentPage === 2 && (<>
								<div className='wizard-heading'>Disclosure</div>
								<div style={{marginBottom: '20px'}}>We believe in transparency and honesty. Two values that are rarely found within the NFT space. We won’t ever make any empty promises that we can’t keep. We believe that with ambition and persistence you can come a long way. Will you join us?</div>
								<Fieldset label="What about the profits?">
									<div>70% of all earnings will go back into building the project!</div>
								</Fieldset>
							</>)}
						</div>
					</div>
					<div>
						<Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} onTouchEnd={() => setCurrentPage(currentPage - 1)} className='windows-button'>&lt;&ensp;Back</Button>
							<Button disabled={currentPage === 2} onClick={() => setCurrentPage(currentPage + 1)} onTouchEnd={() => setCurrentPage(currentPage + 1)} className='windows-button'>Next&ensp;&gt;</Button>
							<Button onClick={closeModal} onTouchEnd={closeModal} style={{ marginLeft: '10px' }} className='windows-button'>{currentPage === 2 ? 'Done' : 'Cancel'}</Button>
						</div>
					</div>
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default ProjectInfoModal;
