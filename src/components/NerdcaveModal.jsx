import { useContext, useEffect } from 'react';
import { StoreContext } from '../Store';
import { Button, Fieldset, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import appleDoorEmoji from '../assets/appleDoorEmoji.png';

const NerdcaveModal = ({ loading, toggleStarField }) => {
	const [state, dispatch] = useContext(StoreContext);
	const address = useAddress();
	const { contract: n3rdsContract } = useContract('0xA29F6F5C7bE206425a28F8188784233E9D75dEee');
	const { data: ownedN3rds, isLoading, error } = useOwnedNFTs(n3rdsContract, address);

	const closeModal = () => {
		dispatch({ type: 'SET_NERDCAVE_MODAL', payload: false });
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'The Nerdcave'});
	};

	const openWalletConnector = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Wallet Connector' });
		dispatch({ type: 'SET_WALLET_CONNECTOR_MODAL', payload: true });
	};

	useEffect(() => {
		if ((!loading) && (ownedN3rds && ownedN3rds.length > 0)) {
			toggleStarField(true);
			dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'The Nerdcave' });
			dispatch({ type: 'SET_NERDCAVE_MODAL', payload: true });
		} else {
			toggleStarField(false);
		}
	}, [loading, ownedN3rds, dispatch, toggleStarField]);

	return (
		<Draggable defaultPosition={{ x: 100, y: 50 }} onStart={bringToFront}>
			<Window style={{
				width: '400px',
				position: 'absolute',
				display: state.nerdcaveModal ? 'block' : 'none',
				zIndex: state.nerdcaveZIndex
			}}>
				<WindowHeader active={state.activeWindow === 'The Nerdcave'} className='flex-center-between'>
					<div className='flex-center'>
						<img src={appleDoorEmoji} width='21' alt='apple door emoji' />
						<span style={{ paddingLeft: '4px' }}>The Nerdcave</span>
					</div>
					<Button onClick={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					{!address ? (
						<div><span onClick={openWalletConnector} className='blue-link'>Connect a wallet</span> containing N3RDS to see members-only content!</div>
					) : (<>
						{(ownedN3rds && ownedN3rds.length > 0) ? (<>
							<div>Welcome back ser! All systems of the nerdcave are working at full capacity!</div>
							<Fieldset style={{ marginTop: '20px' }} label={`You own ${ownedN3rds.length} N3RDS!`}>
								{ownedN3rds.map(n3rd => {
									return (<div>{n3rd.metadata.name}</div>);
								})}
							</Fieldset>
						</>) : (isLoading ? (
								<div>Loading your N3RDS...</div>
							) : (error ? (
									<div>Encountered an unexpected error while loading your N3RDS.</div>
								) : (
									<div>No N3RDS found in this wallet.</div>
								)
							)
						)}
					</>)}
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default NerdcaveModal;
