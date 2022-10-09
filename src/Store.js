import { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
	projectInfoModal: false,
	projectInfoZIndex: 0,
	membersOnlyModal: false,
	membersOnlyZIndex: 0,
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
		case 'Members Only':
			return { ...state, membersOnlyZIndex: newTopZIndex };
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
			return { ...state, projectInfoModal: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'Project Info', action.payload) };
		case 'SET_MEMBERS_ONLY_MODAL':
			return { ...state, membersOnlyModal: action.payload, openWindows: updateOpenWindows(currentOpenWindows, 'Members Only', action.payload) };
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
