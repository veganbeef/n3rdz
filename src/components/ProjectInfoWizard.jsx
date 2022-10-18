import { useContext, useState } from 'react';
import { StoreContext } from '../Store';
import {
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
import roadToZ from '../assets/roadToZ.png';
import hardwareWizard from '../assets/hardwareWizard.png';
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
				<WindowHeader active={state.activeWindow === 'Project Info'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<span>Project Info</span>
				</WindowHeader>
				<WindowContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Panel variant="well" style={{ height: '390px' }}>
							<img src={hardwareWizard} height="386" />
						</Panel>
						<div style={{ minHeight: '360px', width: '420px' }}>
							{currentPage === 0 && (<>
								<div className='wizard-heading'>What are N3RDS?</div>
								<Cutout style={{ height: '344px' }}>
									<div>N3RDS is my passion project! It’s a collection of 2001 Fanboys JPGs. Since I’ve entered the space. I’ve always dreamed about creating my own project. I love the idea of a community that forms around an NFT and shares a common set of beliefs and values such as supporting each other when it comes to WGMI! I’ve started creating LaxLlamas at a very early stage, which was a collection that I deployed on the Polygon Blockchain. I didn’t understand the mechanics back then and the collection ultimately had to fail. Probably the main reason was, that I didn’t identify with what I had built. That has changed because of one simple reason: I AM A NERD! I grew up in the developing years of the PC and the Internet. Its potential has amazed me ever since. Plus, I love everything geeky from Star Wars to The Lord of the Rings! My man cave is full of action figures, light sabers, DnD adventures and old retro video games. My NFT collection now embodies what I am, what I love - thus a passion project! I will always be a grown man-child and that is why I can make one promise: I will keep building the nerd-verse! The N3RD collection is my first step into this bigger world. I want to keep learning, I want to keep building and ultimately I want to represent the nerds of this space in this space! By buying into this collection, you are buying into my vision!</div>
								</Cutout>
							</>)}
							{currentPage === 1 && (<>
								<div className='wizard-heading'>Vision</div>
								<div>N3RDS Project will center around its community! I'm building this collection first and foremost for its members and I'm envisioning a close-knit and exclusive community of support. After all, web3.0 is about connecting people. N3RDS will form the common ground of this connection. The passion we all share and that binds us together! This vision is going to manifest itself within the project!</div>
							</>)}
							{currentPage === 2 && (<>
								<div className='wizard-heading'>Milestones</div>
								<div>How do I want to make sure that N3RDS create value? Tbh, I can’t be sure of that! But what I can be sure of is that I’ll always try my best to succeed and put in my everything because I identify with what I do! Money is not the key factor of my motivation, it’s my belief in Blockchain Technology and being the biggest nerd myself! There are many thoughts I juggle around with such as MERCHANDISE, THE N3RD BASEMENT BAR, THE N3RDCAVE, THE PIXLTUBE but, imho, the first step into a wider range of possibilities will  be the reduction of the existing collection making the community even more exclusive. This thought has lead to the "Road to Z".</div>
								<div style={{ marginTop: '20px' }}>
									<a href={roadToZ} target='_blank' style={{ color: 'blue', textDecoration: 'underline' }}>Take a look yourself!</a>
								</div>
							</>)}
							{currentPage === 3 && (<>
								<div className='wizard-heading'>Disclosure</div>
								<div style={{marginBottom: '20px'}}>I believe in transparency and honesty. Two values that are rarely found within the NFT space. I’ve been scammed and rugged and I know this can mean financial ruin to people! That is why I won’t ever make any empty promises that I can’t keep. For now, this project is a hobby of mine and I treat it like that. I work on it in my free time and I do almost everything by myself! I believe that with ambition and persistence you can come a long way. I don’t know where it will take me, but I’m ready for the journey. Will you come along?</div>
								<Fieldset label="What about the profits?">
									<div>70% of all earnings will go back into building the project! A payment splitter has been added to the contract. Transparency is key!</div>
								</Fieldset>
							</>)}
						</div>
					</div>
					<div>
						<Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className='windows-button'>&lt;&ensp;Back</Button>
							<Button disabled={currentPage === 3} onClick={() => setCurrentPage(currentPage + 1)} className='windows-button'>Next&ensp;&gt;</Button>
							<Button onClick={closeModal} style={{ marginLeft: '10px' }} className='windows-button'>{currentPage === 3 ? 'Done' : 'Cancel'}</Button>
						</div>
					</div>
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default ProjectInfoModal;
