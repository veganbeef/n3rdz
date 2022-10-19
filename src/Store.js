import { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
	projectInfoWizard: false,
	projectInfoZIndex: 0,
	linksModal: false,
	linksZIndex: 0,
	nerdcaveModal: false,
	nerdcaveZIndex: 0,
	walletConnectorModal: false,
	walletConnectorZIndex: 0,
	topZIndex: 0,
	openWindows: [],
	activeWindow: ''
};

function bringModalToFront(label, state) {
	const newTopZIndex = state.topZIndex + 1;
	state = { ...state, topZIndex: newTopZIndex, activeWindow: label};
	switch (label) {
		case 'Project Info':
			return { ...state, projectInfoZIndex: newTopZIndex };
		case 'Links':
			return { ...state, linksZIndex: newTopZIndex };
		case 'The Nerdcave':
			return { ...state, nerdcaveZIndex: newTopZIndex };
		case 'Wallet Connector':
			return { ...state, walletConnectorZIndex: newTopZIndex };
		default:
			return state;
	}
}

function updateOpenWindows(openWindows, label, payload) {
	if (payload && !openWindows.includes(label)) {
		openWindows.push(label);
	} else if (!payload && openWindows.includes(label)) {
		openWindows.splice(openWindows.indexOf(label), 1);
	}
	return openWindows;
}

function reducer(state, action) {
	const currentOpenWindows = state.openWindows;
	switch (action.type) {
		case 'SET_PROJECT_INFO_MODAL':
			return { ...state, projectInfoWizard: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'Project Info', action.payload) };
		case 'SET_LINKS_MODAL':
			return { ...state, linksModal: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'Links', action.payload) };
		case 'SET_NERDCAVE_MODAL':
			return { ...state, nerdcaveModal: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'The Nerdcave', action.payload) };
		case 'SET_WALLET_CONNECTOR_MODAL':
			return { ...state, walletConnectorModal: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'Wallet Connector', action.payload) };
		case 'BRING_MODAL_TO_FRONT':
			return bringModalToFront(action.payload, state);
		default:
			return state;
	}
}

const Store = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StoreContext.Provider value={[state, dispatch]}>
			{children}
		</StoreContext.Provider>
	);
};

export default Store;
