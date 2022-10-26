import { useContext, useState } from 'react';
import { StoreContext } from '../Store';
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import warningIcon from '@react95/icons/png/Confcp118_32x32_4.png'

const MobileWarning = ({ isMobile, loading }) => {
	const [state, ] = useContext(StoreContext);
	const [mobileWarningAcknowledged, setMobileWarningAcknowledged] = useState(false);

	const closeModal = () => {
		setMobileWarningAcknowledged(true);
	};

	return (
		<Draggable defaultPosition={{ x: 20, y: 20 }}>
			<Window style={{
				width: '300px',
				position: 'absolute',
				display: (!loading && isMobile && !mobileWarningAcknowledged) ? 'block' : 'none',
				zIndex: state.topZIndex + 2
			}}>
				<WindowHeader className='flex-center-between'>
					<div>Mobile Warning</div>
					<Button onClick={closeModal} onTouchEnd={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent className='flex-column'>
					<div style={{display: 'inline'}}>
						<img src={warningIcon} style={{float: 'left', paddingRight: '20px'}} alt="windows warning icon" />
						<div>This website is optimized for desktop use. If you must use your phone, turn it sideways into landscape mode, but please be aware that some functions might be restricted.</div>
					</div>
					<br />
					<div className="flex-center" style={{justifyContent:'center'}}>
						<Button onClick={closeModal} onTouchEnd={closeModal} className='windows-button'>OK</Button>
					</div>
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default MobileWarning;
