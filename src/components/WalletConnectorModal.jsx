import { useContext, useState } from 'react';
import { StoreContext } from '../Store';
import { Button, Fieldset, Panel, Select, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import {
	useAddress,
	useBalance,
	useCoinbaseWallet,
	useDisconnect,
	useMetamask,
	useWalletConnect
} from '@thirdweb-dev/react';

const WalletConnectorModal = () => {
	const [state, dispatch] = useContext(StoreContext);
	const [selectedWallet, setSelectedWallet] = useState('Metamask');
	const connectMetamask = useMetamask();
	const connectCoinbaseWallet = useCoinbaseWallet();
	const connectWalletConnect = useWalletConnect();
	const disconnect = useDisconnect();
	const address = useAddress();
	const balanceQuery = useBalance();
	const walletOptions = [
		{ value: 1, label: 'Metamask' },
		{ value: 2, label: 'Coinbase Wallet' },
		{ value: 3, label: 'WalletConnect' },
	];

	const closeModal = () => {
		dispatch({ type: 'SET_WALLET_CONNECTOR_MODAL', payload: false });
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Wallet Connector'});
	};

	const walletSelected = (evt, selection) => {
		setSelectedWallet(selection.label);
	};

	const connectWallet = () => {
		let connectionFunction;
		if (selectedWallet === 'Metamask') {
			connectionFunction = connectMetamask;
		} else if (selectedWallet === 'Coinbase Wallet') {
			connectionFunction = connectCoinbaseWallet;
		} else if (selectedWallet === 'WalletConnect') {
			connectionFunction = connectWalletConnect;
		}
		connectionFunction().catch(({error}) => {
			console.log(error);
		})
	};

	const disconnectWallet = () => {
		disconnect().catch(({error}) => {
			console.log(error);
		})
	};

	return (
		<Draggable defaultPosition={{ x: 250, y: 150 }} onStart={bringToFront}>
			<Window style={{
				width: '500px',
				position: 'absolute',
				display: state.walletConnectorModal ? 'block' : 'none',
				zIndex: state.walletConnectorZIndex
			}}>
				<WindowHeader active={state.activeWindow === 'Wallet Connector'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<span>Wallet Connector</span>
					<Button onClick={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					<Fieldset label="Select wallet type">
						<Select disabled={address} options={walletOptions} onChange={walletSelected} width={180} />
					</Fieldset>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '20px' }}>
						<Button disabled={address} onClick={connectWallet} style={{ marginRight: '10px' }} className='windows-button'>Connect</Button>
						<Button disabled={!address} onClick={disconnectWallet} className='windows-button'>Disconnect</Button>
					</div>
					<Fieldset label="Wallet information">
						Address
						<Panel variant="well" className='windows-panel'>{address || '...'}</Panel>
						<div style={{ marginTop: '20px' }}>Balance</div>
						<Panel variant="well" className='windows-panel'>{balanceQuery.isLoading ? '...' : `${balanceQuery.data?.displayValue} ${balanceQuery.data?.symbol}`}</Panel>
					</Fieldset>
				</WindowContent>
			</Window>
		</Draggable>
	);
};

export default WalletConnectorModal;
