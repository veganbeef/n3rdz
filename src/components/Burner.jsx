import './Burner.css';
import Display from './Display';

const Burner = () => {
	const dummyNerds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	function connectWallet() {
		console.log('connect wallet');
	}

	function burn() {
		console.log('burn!');
	}

	return (
		<div style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<div style={{
				width: '40%',
				background: 'blanchedAlmond',
				display: 'flex',
				flexDirection: 'column',
				padding: '20px'
			}} className="bubble-border">
				<button className="bubble-border" onClick={connectWallet} style={{ background: 'greenYellow' }}>Connect Wallet</button>
				<div>You have 30 tokens in your wallet.</div>
				<div style={{ display: 'flex', flexDirection: 'column'}}>
					<div className="display-row">
						<Display nerds={dummyNerds} background={'lavender'} />
						<div>N3RDZ2001</div>
					</div>
					<div className="display-row">
						<Display nerds={dummyNerds} background={'rosyBrown'} />
						<div>N3RDIFIER</div>
					</div>
					<div className="display-row">
						<Display nerds={dummyNerds} background={'paleTurquoise'} />
						<div>Other</div>
					</div>
				</div>
				<div className="display-row">
					<div style={{ display: 'flex', flexDirection: 'column'}}>
						<div>Burn at least 3 N3RDS to redeem.</div>
						<div className="bubble-border" style={{ background: 'lightSalmon' }}>
							0 tokens selected
						</div>
					</div>
					<button className="bubble-border" onClick={burn} style={{ width: '100px', height: '100px', background: 'tomato' }}>BURN</button>
				</div>
			</div>
		</div>
	);
};

export default Burner;
