import './Burner.css';
import { useEffect, useState } from 'react';
import { useAddress, useContract, useDisconnect, useMetamask, useOwnedNFTs } from '@thirdweb-dev/react';

const Burner = () => {
	const dummyNerds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const connectMetamask = useMetamask();
	const address = useAddress();
	const disconnect = useDisconnect();
	const [connectionError, setConnectionError] = useState();
	const [tokenTotal, setTokenTotal] = useState(0);
	const [selectedTokens, setSelectedTokens] = useState([]);

	// n3rds
	const { contract: n3rdsContract } = useContract('0xA29F6F5C7bE206425a28F8188784233E9D75dEee');
	const { data: ownedN3rds, isN3rdsLoading, n3rdsError } = useOwnedNFTs(n3rdsContract, address);

	//n3rdifier
	const { contract: n3rdifierContract } = useContract('0x5Eaf5d74e8C3bDF12c75D4874b980c9AD9705E17');
	const { data: ownedN3rdifiers, isN3rdifierLoading, n3rdifierError } = useOwnedNFTs(n3rdifierContract, address);

	// boot disks
	const { contract: bootdiskContract } = useContract('0x908e743d03a17fC0E986f13f5C60479E2667e578');
	const { data: ownedBootdisks, isBootdiskLoading, bootdiskError } = useOwnedNFTs(n3rdifierContract, address);

	function connectWallet() {
		setConnectionError();
		if (address) {
			disconnect();
		} else {
			connectMetamask().catch((err) => {
				setConnectionError(err);
			});
		}
	}

	function selectToken(token) {
		if (!token.selected) {
			token.selected = true;
			setSelectedTokens(selectedTokens.concat(token.edition))
		} else {
			token.selected = false;
			const tokenIndex = selectedTokens.indexOf(token.edition);
			setSelectedTokens(selectedTokens.slice(0, tokenIndex).concat(selectedTokens.slice(tokenIndex + 1)));
		}
	}

	function burn() {
		if (selectedTokens.length) {
			if (selectedTokens.length % 3) {
				window.alert('Please select a multiple of 3 tokens to burn.');
			} else {
				window.alert('Burning!');
			}
		}
		console.log(bootdiskError, isBootdiskLoading);
	}

	useEffect(() => {
		let newTotal = 0;
		if (ownedN3rds) {
			newTotal += ownedN3rds.length;
		}
		if (ownedN3rdifiers) {
			newTotal += ownedN3rdifiers.length;
		}
		setTokenTotal(newTotal);
	}, [ownedN3rds, ownedN3rdifiers]);

	return (
		<div style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#ece2ca',
			fontFamily: 'roboto'
		}}>
			<div style={{
				width: '45%',
				minHeight: '80%',
				background: '#efe8db',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '20px'
			}} className="bubble-border">
				<div className="bubble-border" onClick={connectWallet} style={{ background: '#c5d0e4', textAlign: 'center' }}>{ address ?? 'Connect Wallet' }</div>
				<div style={{ display: 'flex', flexDirection: 'column'}}>
					<div style={{ marginBottom: '10px' }}>You have {tokenTotal === 1 ? '1 token' : `${tokenTotal} tokens`} in your wallet.</div>
					<div className="display-row">
						<div className="bubble-border" style={{ background: 'white', display: 'flex', flexWrap: 'wrap', width: '400px', minHeight: '84px' }}>
							{ownedN3rds && ownedN3rds.map(nerd => (
								<img src={nerd.metadata.image} alt={nerd.metadata.name} className={nerd.selected ? 'red-border square-border' : 'square-border'} style={{ margin: '5px' }} width={40} height={40} onClick={() => selectToken(nerd)}/>
							))}
						</div>
						<div>N3RDS2001</div>
					</div>
					<div className="display-row">
						<div className="bubble-border" style={{ background: 'white', display: 'flex', flexWrap: 'wrap', width: '400px', minHeight: '84px' }}>
							{ownedN3rdifiers && ownedN3rdifiers.map(n3rdifier => (<img src={n3rdifier.metadata.image} alt={n3rdifier.metadata.name} className="square-border" style={{ margin: '5px' }} width={40} height={40}/>))}
						</div>
						<div>N3RDIFIER</div>
					</div>
					<div className="display-row">
						<div className="bubble-border" style={{ background: 'white', display: 'flex', flexWrap: 'wrap', width: '400px', minHeight: '84px' }}>
							{ownedBootdisks && ownedBootdisks.map(bootdisk => (<img src={bootdisk.metadata.image} alt={bootdisk.metadata.name} className="square-border" style={{ margin: '5px' }} width={40} height={40}/>))}
						</div>
						<div>Boot Disks</div>
					</div>
				</div>
				<div className="display-row">
					<div style={{ display: 'flex', flexDirection: 'column'}}>
						<div style={{ marginBottom: '10px' }}>Burn at least 3 tokens to redeem.</div>
						<div className="bubble-border" style={{ background: '#c5d0e4', textAlign: 'center' }}>
							{selectedTokens.length === 1 ? '1 token' : `${selectedTokens.length} tokens`} selected
						</div>
					</div>
					<div className="bubble-border" onClick={burn} style={{ width: '100px', background: '#ef8b8d', textAlign: 'center' }}>BURN</div> {/* on click f5b7b4 ?*/}
				</div>
			</div>
		</div>
	);
};

export default Burner;
