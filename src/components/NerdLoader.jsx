import { LoadingIndicator, Panel } from 'react95';
import nerdDisk from '../assets/nerdDisk.jpg';

const NerdLoader = ({nerdLoader}) => {
	return (
		<Panel style={{
			width: '550px',
			height: '550px',
			display: `${nerdLoader ? 'flex' : 'none'}`,
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center',
			zIndex: 1000
		}} variant="outside" className='fixed-center'>
			<img src={nerdDisk} width="450" alt='n3rds large floppy disk logo' />
			<LoadingIndicator style={{ width: '450px' }} />
		</Panel>
	);
};

export default NerdLoader;
