import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Store';
import { Button, Fieldset, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import { useAddress, useContract, useClaimNFT, useOwnedNFTs } from '@thirdweb-dev/react';
import appleDoorEmoji from '../assets/appleDoorEmoji.png';

const NerdcaveModal = ({ loading, toggleStarField }) => {
	const [state, dispatch] = useContext(StoreContext);
	const [hasMinted, setHasMinted] = useState(false);
	const address = useAddress();

	// n3rds
	const { contract: n3rdsContract } = useContract('0xA29F6F5C7bE206425a28F8188784233E9D75dEee');
	const { data: ownedN3rds, isLoading, error } = useOwnedNFTs(n3rdsContract, address);

	//n3rdifier
	const { contract: n3rdifierContract } = useContract('0x5Eaf5d74e8C3bDF12c75D4874b980c9AD9705E17');
	const { mutate: claimNFT, isClaimLoading } = useClaimNFT(n3rdifierContract);
	const mintTime = new Date('2022-10-27T18:00:00.000Z');
	const now = new Date();


	const mint = async () => {
		console.log('minting');
		claimNFT({to: address, quantity: 1});
		setHasMinted(true);
	}

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
					<Button onClick={closeModal} onTouchEnd={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					{!address ? (<>
						<div><span onClick={openWalletConnector} onTouchEnd={openWalletConnector} className='blue-link'>Connect a wallet</span> to mint a n3rdifier!</div>
					</>) : (<>
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
						<br />
						{!process.env.STOP_MINT && (<>
							{(now < mintTime) ? (
								<div>Mint is at {mintTime.toLocaleTimeString([], { timeZoneName:'short' })}</div>
							) : (<>
								{(process.env.PUBLIC_MINT || (ownedN3rds && ownedN3rds.length > 0)) ? (<>
									<Fieldset label={'N3rdifier mint zone'}>
										<div>You're eligible to mint a n3rdifier!</div>
										<br />
										<Button onClick={mint} disabled={isClaimLoading || hasMinted} style={{width: '100%'}}>Mint a N3rdifier</Button>
									</Fieldset>
								</>) : (<></>)}
							</>)}
						</>)}

					</>)}
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default NerdcaveModal;
