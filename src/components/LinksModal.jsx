import { useContext } from 'react';
import { StoreContext } from '../Store';
import Draggable from 'react-draggable';
import { Button, Fieldset, Window, WindowContent, WindowHeader } from 'react95';
import internetIcon from '@react95/icons/png/Inetcpl1313_32x32_4.png';

const LinksModal = () => {
	const [state, dispatch] = useContext(StoreContext);

	const closeModal = () => {
		dispatch({ type: 'SET_LINKS_MODAL', payload: false });
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Links' });
	};

	return (
		<Draggable defaultPosition={{ x: 50, y: 200 }} onStart={bringToFront}>
			<Window style={{
				width: '250px',
				position: 'absolute',
				display: state.linksModal ? 'block' : 'none',
				zIndex: state.linksZIndex
			}}>
				<WindowHeader active={state.activeWindow === 'Links'} className='flex-center-between'>
					<div className='flex-center'>
						<img src={internetIcon} width='21' alt='windows internet icon' />
						<span style={{ paddingLeft: '8px' }}>Links</span>
					</div>
					<Button onClick={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					<Fieldset label='Twitter'>
						<ul>
							<li><a className='blue-link' href='https://twitter.com/n3rds2001' target='_blank' rel='noreferrer'>N3RDS2001</a></li>
							<li><a className='blue-link' href='https://twitter.com/n3rdfather' target='_blank' rel='noreferrer'>N3RDfather</a></li>
							<li><a className='blue-link' href='https://twitter.com/_veganbeef' target='_blank' rel='noreferrer'>veganbeef</a></li>
						</ul>
					</Fieldset>
					<br />
					<Fieldset label='OpenSea'>
						<ul>
							<li><a className='blue-link' href='https://opensea.io/collection/n3rds2001' target='_blank' rel='noreferrer'>N3RDS2001</a></li>
							<li><a className='blue-link' href='https://opensea.io/collection/froods' target='_blank' rel='noreferrer'>FROODS</a></li>
							<li><a className='blue-link' href='https://opensea.io/collection/doodles-fanarts' target='_blank' rel='noreferrer'>Doodles Fan Art</a></li>
						</ul>
					</Fieldset>
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default LinksModal;
