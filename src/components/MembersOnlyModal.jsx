import {useContext} from 'react';
import {StoreContext} from '../Store';
import {Button, Fieldset, Window, WindowContent, WindowHeader} from 'react95';
import Draggable from 'react-draggable';
import {useAddress, useContract, useOwnedNFTs} from '@thirdweb-dev/react';

const MembersOnlyModal = () => {
	const [state, dispatch] = useContext(StoreContext);
	const address = useAddress();
	const { contract: n3rdsContract } = useContract('0xA29F6F5C7bE206425a28F8188784233E9D75dEee');
	const { data: ownedN3rds, isLoading, error } = useOwnedNFTs(n3rdsContract, address);

	const closeModal = () => {
		dispatch({ type: 'SET_MEMBERS_ONLY_MODAL', payload: false });
		console.log('isLoading?: ', isLoading);
		console.log('error?: ', error);
		console.log('ownedN3rds?: ', ownedN3rds);
		console.log('contract: ', n3rdsContract);
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Members Only'});
	};

	return (
		<Draggable defaultPosition={{ x: 100, y: 50 }} onStart={bringToFront}>
			<Window style={{
				width: '30%',
				position: 'absolute',
				display: state.membersOnlyModal ? 'block' : 'none',
				zIndex: state.membersOnlyZIndex
			}}>
				<WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<span>Members Only</span>
					<Button onClick={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					{!address && (
						<div>Connect a wallet containing N3RDs to see members-only content!</div>
					)}
					{address && isLoading && (
						<div>Loading your N3RDs...</div>
					)}
					{address && !isLoading && error && (
						<div>Encountered an unexpected error while loading your N3RDs.</div>
					)}
					{address && !isLoading && !error && (
						<Fieldset label={`You own ${ownedN3rds.length} N3RDs!`}>
							{ownedN3rds.map(n3rd => {
								return (<div>{n3rd.metadata.name}</div>);
							})}
						</Fieldset>
					)}
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default MembersOnlyModal;
