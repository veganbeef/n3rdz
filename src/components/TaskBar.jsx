import {useContext, useState} from 'react';
import { Logo } from '@react95/icons';
import windowsLogo from '@react95/icons/png/Shell3240_32x32_4.png';
import infoSign from '@react95/icons/png/Winhlp324000_32x32_4.png';
import infoBook from '@react95/icons/png/Winhlp324001_32x32_4.png';
import infoPage from '@react95/icons/png/Winhlp324002_32x32_4.png';
import gearPanel from '@react95/icons/png/Shell3222_32x32_4.png';
import myComputer from '@react95/icons/png/Shell3216_32x32_4.png'
import lockIcon from '@react95/icons/png/Lock_32x32_4.png'
import programsIcon from '@react95/icons/png/Shell3237_32x32_4.png';
import computerOff from '@react95/icons/png/Shell3228_32x32_4.png';

import {
	AppBar,
	Button,
	Divider,
	List,
	ListItem, Panel,
	TextField,
	Toolbar
} from 'react95';
import Clock from './Clock';
import {StoreContext} from '../Store';
import OpenWindows from './OpenWindows';
import {useAddress, useDisconnect} from '@thirdweb-dev/react';

function TaskBar() {
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
				case 'Members Only':
					dispatch({ type: 'SET_MEMBERS_ONLY_MODAL', payload: true });
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
		<AppBar style={{position: 'inherit'}}>
			<Toolbar style={{ justifyContent: 'space-between' }}>
				<div style={{ display: 'flex' }}>
					<div style={{ position: 'relative', display: 'inline-block', height: '36px', marginRight: '4px' }}>
						<Button
							onClick={() => setOpen(!open)}
							active={open}
							style={{ fontWeight: 'bold' }}
						>
							{/*<img*/}
							{/*	src={}*/}
							{/*	alt='react95 logo'*/}
							{/*	style={{ height: '20px', marginRight: 4 }}*/}
							{/*/>*/}
							{/*<Logo height="30" width="30" variant='32x32_4' />*/}
							<img src={windowsLogo} height="28" width="28" />
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
									<img src={infoBook} width="28" />
									<span style={{paddingLeft: '1rem'}}>Project Info</span>
								</ListItem>
								<ListItem onClick={() => menuClick('Members Only')}>
									<img src={programsIcon} width="28" />
									<span style={{paddingLeft: '1rem'}}>Members Only</span>
								</ListItem>
								<ListItem onClick={() => menuClick('Wallet Connector')}>
									<img src={gearPanel} width="28" />
									<span style={{paddingLeft: '1rem'}}>Wallet Connector</span>
								</ListItem>
								<Divider />
								<ListItem disabled={!address} onClick={disconnect}>
									<img src={computerOff} width="28" />
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
