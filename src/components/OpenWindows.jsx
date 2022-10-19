import { useContext } from 'react';
import { StoreContext } from '../Store';
import { Button } from 'react95';
import infoBook from '@react95/icons/png/Winhlp324001_32x32_4.png';
import internetIcon from '@react95/icons/png/Inetcpl1313_32x32_4.png';
import appleDoorEmoji from '../assets/appleDoorEmoji.png';
import gearPanel from '@react95/icons/png/Shell3222_32x32_4.png';

const OpenWindows = () => {
	const [state, dispatch] = useContext(StoreContext);

	const getLabelWithIcon = (label) => {
		let imgTag;
		switch (label) {
			case 'Project Info':
				imgTag = <img src={infoBook} width='21' alt='windows info icon' />
				break;
			case 'Links':
				imgTag = <img src={internetIcon} width='21' alt='windows internet icon' />
				break;
			case 'The Nerdcave':
				imgTag = <img src={appleDoorEmoji} width='21' alt='apple door emoji' />
				break;
			case 'Wallet Connector':
				imgTag = <img src={gearPanel} width='21' alt='windows settings icon' />
				break;
			default:
				imgTag = <></>
				break;
		}
		return (<div className='flex-center'>{imgTag}<span style={{ paddingLeft: `${label === 'The Nerdcave' ? '4px' : '8px'}` }}>{label}</span></div>);
	};

	return (
		<div style={{ marginLeft: '4px', height: '36px' }}>
			{state.openWindows.map((label, i) => {
				return (<Button active={state.activeWindow === label} style={{ width: '200px' }} onClick={() => dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: label })}>
					<div style={{width: '100%', display: 'flex', justifyContent: 'flex-start'}}>{getLabelWithIcon(label)}</div>
				</Button>);
			})}
		</div>
	);
};

export default OpenWindows;
