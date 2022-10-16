import { useContext, useState } from 'react';
import windowsLogo from '@react95/icons/png/Shell3240_32x32_4.png';
import infoBook from '@react95/icons/png/Winhlp324001_32x32_4.png';
import gearPanel from '@react95/icons/png/Shell3222_32x32_4.png';
import appleDoorEmoji from '../assets/appleDoorEmoji.png';
import computerOff from '@react95/icons/png/Shell3228_32x32_4.png';

import {
	AppBar,
	Button,
	Divider,
	List,
	ListItem,
	Toolbar
} from 'react95';
import Clock from './Clock';
import { StoreContext } from '../Store';
import OpenWindows from './OpenWindows';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';

function TaskBar({hidden}) {
	const [open, setOpen] = useState(false); // TODO: move this to StoreContext
	const [state, dispatch] = useContext(StoreContext);
	const address = useAddress();
	const disconnect = useDisconnect();

	function menuClick(label) {
		if (open) {
			dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: label });
			switch (label) {
				case 'Project Info':
					dispatch({ type: 'SET_PROJECT_INFO_MODAL', payload: true });
					break;
				case 'The Nerdcave':
					dispatch({ type: 'SET_NERDCAVE_MODAL', payload: true });
					break;
				case 'Wallet Connector':
					dispatch({ type: 'SET_WALLET_CONNECTOR_MODAL', payload: true });
					break;
				default:
					console.log('idk');
					break;
			}
		}
	}

	return (
		<AppBar style={{position: 'inherit', display: `${hidden ? 'none' : 'flex'}`}}>
			<Toolbar style={{ justifyContent: 'space-between' }}>
				<div style={{ display: 'flex' }}>
					<div style={{ position: 'relative', display: 'inline-block', height: '36px', marginRight: '4px' }}>
						<Button
							onClick={() => setOpen(!open)}
							active={open}
							style={{ fontWeight: 'bold' }}
						>
							<img src={windowsLogo} height='28' width='28' alt='windows logo icon' />
							<p style={{ marginLeft: '0.25rem' }}>Start</p>
						</Button>
						{open && (
							<List
								style={{
									position: 'absolute',
									left: '0',
									top: '100%',
									zIndex: state.topZIndex + 1
								}}
								onClick={() => setOpen(false)}
							>
								<ListItem onClick={() => menuClick('Project Info')}>
									<img src={infoBook} width='28' alt='windows info icon' />
									<span style={{paddingLeft: '1rem'}}>Project Info</span>
								</ListItem>
								<ListItem onClick={() => menuClick('The Nerdcave')}>
									<img src={appleDoorEmoji} width='28' alt='apple door emoji' />
									<span style={{paddingLeft: '1rem'}}>The Nerdcave</span>
								</ListItem>
								<ListItem onClick={() => menuClick('Wallet Connector')}>
									<img src={gearPanel} width='28' alt='windows settings icon' />
									<span style={{paddingLeft: '1rem'}}>Wallet Connector</span>
								</ListItem>
								<Divider />
								<ListItem disabled={!address} onClick={disconnect}>
									<img src={computerOff} width='28' alt='windows computer off icon' />
					                <span style={{paddingLeft: '1rem'}}>Disconnect</span>
								</ListItem>
							</List>
						)}
					</div>
					<Divider size='36px' orientation='vertical' />
					<OpenWindows />
				</div>
				<Clock />
			</Toolbar>
		</AppBar>
	);
}

export default TaskBar;
