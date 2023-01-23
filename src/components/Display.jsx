import './Burner.css';

const Display = ({nerds, background}) => {
	return (<div className="bubble-border" style={{ background, display: 'flex', flexWrap: 'wrap', width: '400px' }}>
		{nerds.map((nerd) => (<div className="square-border" style={{ width: '40px', height: '40px', margin: '5px' }}></div>))}
	</div>);
};

export default Display;
