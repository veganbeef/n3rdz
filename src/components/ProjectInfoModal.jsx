import {useContext, useState} from 'react';
import {StoreContext} from '../Store';
import {Button, Cutout, Fieldset, Tab, TabBody, Tabs, Window, WindowContent, WindowHeader} from 'react95';
import Draggable from 'react-draggable';
import roadToZ from '../assets/road_to_z.png';

const ProjectInfoModal = () => {
	const [state, dispatch] = useContext(StoreContext);
	const [activeTab, setActiveTab] = useState(0);

	const closeModal = () => {
		dispatch({ type: 'SET_PROJECT_INFO_MODAL', payload: false });
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Project Info'});
	};

	const changeTab = (evt, value) => {
		setActiveTab(value);
	};

	return (
		<Draggable defaultPosition={{ x: 600, y: 25 }} onStart={bringToFront}>
		<Window style={{
			width: '400px',
			position: 'absolute',
			display: state.projectInfoModal ? 'block' : 'none',
			zIndex: state.projectInfoZIndex
		}}>
			<WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<span>Project Info</span>
				<Button onClick={closeModal}>x</Button>
			</WindowHeader>
			<WindowContent>
				<Tabs value={activeTab} onChange={changeTab}>
					<Tab value={0}>General</Tab>
					<Tab value={1}>Vision</Tab>
					<Tab value={2}>Milestones</Tab>
					<Tab value={3}>Disclosure</Tab>
				</Tabs>
				<TabBody>
					{activeTab === 0 && (<>
						<div style={{marginBottom: '10px'}}>What are N3RDS?</div>
						<Cutout style={{height:'252px'}}>
							<div>N3RDS is my passion project! It’s a collection of 2001 Fanboys JPGs. Since I’ve entered the space. I’ve always dreamed about creating my own project. I love the idea of a community that forms around an NFT and shares a common set of beliefs and values such as supporting each other when it comes to WGMI! I’ve started creating LaxLlamas at a very early stage, which was a collection that I deployed on the Polygon Blockchain. I didn’t understand the mechanics back then and the collection ultimately had to fail. Probably the main reason was, that I didn’t identify with what I had built. That has changed because of one simple reason: I AM A NERD! I grew up in the developing years of the PC and the Internet. Its potential has amazed me ever since. Plus, I love everything geeky from Star Wars to The Lord of the Rings! My man cave is full of action figures, light sabers, DnD adventures and old retro video games. My NFT collection now embodies what I am, what I love - thus a passion project! I will always be a grown man-child and that is why I can make one promise: I will keep building the nerd-verse! The N3RD collection is my first step into this bigger world. I want to keep learning, I want to keep building and ultimately I want to represent the nerds of this space in this space! By buying into this collection, you are buying into my vision!</div>
						</Cutout>
					</>)}
					{activeTab === 1 && (<>
						<div>N3RDS Project will center around its community! I'm building this collection first and foremost for its members and I'm envisioning a close-knit and exclusive community of support. After all, web3.0 is about connecting people. N3RDS will form the common ground of this connection. The passion we all share and that binds us together! This vision is going to manifest itself within the project!</div>
					</>)}
					{activeTab === 2 && (<>
						<div>How do I want to make sure that N3RDS create value? Tbh, I can’t be sure of that! But what I can be sure of is that I’ll always try my best to succeed and put in my everything because I identify with what I do! Money is not the key factor of my motivation, it’s my belief in Blockchain Technology and being the biggest nerd myself! There are many thoughts I juggle around with such as MERCHANDISE, THE N3RD BASEMENT BAR, THE N3RD CAVE, THE PIXLTUBE but, imho, the first step into a wider range of possibilities will  be the reduction of the existing collection making the community even more exclusive. This thought has lead to the "Road to Z". Take a look yourself:</div>
						<img src={roadToZ} alt="road to Z" width="320" />
					</>)}
					{activeTab === 3 && (<>
						<div style={{marginBottom: '20px'}}>I believe in transparency and honesty. Two values that are rarely found within the NFT space. I’ve been scammed and rugged and I know this can mean financial ruin to people! That is why I won’t ever make any empty promises that I can’t keep. For now, this project is a hobby of mine and I treat it like that. I work on it in my free time and I do almost everything by myself! I cannot keep up with the professionalism of the blue-chips but I’m also not trying to or boasting that I can! I see them as role-models. I regard them as inspiration when it comes to N3RDS! I believe that with ambition and persistence you can come a long way. I don’t know where it will take me, but I’m ready for the journey. Will you come along?</div>
						<Fieldset label="What about the profits?">
							<div>70% of all earnings will go back into building the project! A payment splitter has been added to the contract. Transparency is key!</div>
						</Fieldset>
					</>)}
				</TabBody>
			</WindowContent>
		</Window>
		</Draggable>
	);
};

export default ProjectInfoModal;
