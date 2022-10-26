import { useContext, useState } from 'react';
import { StoreContext } from '../Store';
import { Button, Fieldset, Panel, Radio, Select, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import {
	useAddress,
	useBalance,
	useCoinbaseWallet,
	useDisconnect,
	useMetamask,
	useWalletConnect
} from '@thirdweb-dev/react';
import gearPanel from '@react95/icons/png/Shell3222_32x32_4.png';

const WalletConnectorModal = () => {
	const [state, dispatch] = useContext(StoreContext);
	const [selectedWallet, setSelectedWallet] = useState('Metamask');
	const connectMetamask = useMetamask();
	const connectCoinbaseWallet = useCoinbaseWallet();
	const connectWalletConnect = useWalletConnect();
	const disconnect = useDisconnect();
	const address = useAddress();
	const balanceQuery = useBalance();

	const closeModal = () => {
		dispatch({ type: 'SET_WALLET_CONNECTOR_MODAL', payload: false });
	};

	const bringToFront = () => {
		dispatch({ type: 'BRING_MODAL_TO_FRONT', payload: 'Wallet Connector'});
	};

	const walletSelectedRadio = (evt) => {
		setSelectedWallet(evt.target.value);
	}

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
				<WindowHeader active={state.activeWindow === 'Wallet Connector'} className='flex-center-between'>
					<div className='flex-center'>
						<img src={gearPanel} width='21' alt='windows settings icon' />
						<span style={{ paddingLeft: '8px' }}>Wallet Connector</span>
					</div>
					<Button onClick={closeModal} onTouchEnd={closeModal}>x</Button>
				</WindowHeader>
				<WindowContent>
					<Fieldset label='Select wallet type'>
						<div className='flex-column'>
							<Radio disabled={address} checked={selectedWallet === 'Metamask'} onChange={walletSelectedRadio} value={'Metamask'} label={'Metamask'} name={'wallets'} />
							<Radio disabled={address} checked={selectedWallet === 'Coinbase Wallet'} onChange={walletSelectedRadio} value={'Coinbase Wallet'} label={'Coinbase Wallet'} name={'wallets'} />
							<Radio disabled={address} checked={selectedWallet === 'WalletConnect'} onChange={walletSelectedRadio} value={'WalletConnect'} label={'WalletConnect'} name={'wallets'} />
						</div>
					</Fieldset>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '20px' }}>
						<Button disabled={address} onClick={connectWallet} onTouchEnd={connectWallet} style={{ marginRight: '10px' }} className='windows-button'>Connect</Button>
						<Button disabled={!address} onClick={disconnectWallet} onTouchEnd={disconnectWallet} className='windows-button'>Disconnect</Button>
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
