import { useContext } from 'react';
import { StoreContext } from '../Store';
import { Button } from 'react95';

const OpenWindows = () => {
	const [state, dispatch] = useContext(StoreContext);

	return (
		<div style={{ marginLeft: '4px', height: '36px' }}>
			{state.openWindows.map((label, i) => {
				return (<Button active={state.activeWindow === label} style={{ width: '200px' }} onClick={() => dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: label })}>
					<div style={{width: '100%', display: 'flex', justifyContent: 'flex-start'}}>{label}</div>
				</Button>);
			})}
		</div>
	);
};

export default OpenWindows;
