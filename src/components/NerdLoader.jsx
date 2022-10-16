import {LoadingIndicator, Panel} from 'react95';
import nerdDisk from '../assets/nerdDisk.jpg';

const NerdLoader = ({nerdLoader}) => {
	return (
		<Panel style={{
			width: '550px',
			height: '550px',
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%,-50%)',
			display: `${nerdLoader ? 'flex' : 'none'}`,
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center'
		}} variant="outside">
			<img src={nerdDisk} width="450" />
			<LoadingIndicator style={{ width: '450px' }} />
		</Panel>
	);
};

export default NerdLoader;
