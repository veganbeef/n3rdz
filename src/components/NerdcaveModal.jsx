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
	const { contract: froodsContract } = useContract('0xE5B5a679F6766B705DDBa89d3b80b0cEeEce7c40');
	const { data: ownedN3rds, isLoading: isN3rdsLoading, error: n3rdsError } = useOwnedNFTs(n3rdsContract, address);
	const { data: ownedFroods, isLoading: isFroodsLoading, error: froodsError } = useOwnedNFTs(froodsContract, address);

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
		if ((!loading) && ((ownedN3rds && ownedN3rds.length > 0) || (ownedFroods && ownedFroods.length > 0))) {
			toggleStarField(true);
			dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'The Nerdcave' });
			dispatch({ type: 'SET_NERDCAVE_MODAL', payload: true });
		} else {
			toggleStarField(false);
		}
	}, [loading, ownedN3rds, ownedFroods, dispatch, toggleStarField]);

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
						{((!isN3rdsLoading && ownedN3rds && ownedN3rds.length > 0) || (!isFroodsLoading && ownedFroods && ownedFroods.length > 0)) ? (
							<div>Welcome back ser! All systems of the nerdcave are working at full capacity!</div>
						) : (<div>Connect a wallet containing N3RDS to see members-only content!</div>)}
						<br />
						<Fieldset label='N3RDS'>
							{isN3rdsLoading ? (
								<div>Loading your N3RDS...</div>
							) : (<>
								{n3rdsError ? (
									<div>Encountered an unexpected error while loading your N3RDS.</div>
								) : (<>
									{ownedN3rds.length ? (<>
										<div style={{ fontWeight: 'bold' }}>{`You own ${ownedN3rds.length} N3RDS!`}</div>
										<ul>
											{ownedN3rds.map(n3rd => {
												return (<li>{n3rd.metadata.name}</li>);
											})}
										</ul>
									</>) : (
										<div>No N3RDS found in this wallet.</div>
									)}
								</>)}
							</>)}
						</Fieldset>
						<br />
						<Fieldset label='FROODS'>
							{isFroodsLoading ? (
								<div>Loading your FROODS...</div>
							) : (<>
								{froodsError ? (
									<div>Encountered an unexpected error while loading your FROODS.</div>
								) : (<>
									{ownedFroods.length ? (<>
										<div style={{ fontWeight: 'bold' }}>{`You own ${ownedFroods.length} FROODS!`}</div>
										<ul>
											{ownedFroods.map(frood => {
												return (<li>{frood.metadata.name}</li>);
											})}
										</ul>
									</>) : (
										<div>No FROODS found in this wallet.</div>
									)}
								</>)}
							</>)}
						</Fieldset>
					</>)}
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default NerdcaveModal;
