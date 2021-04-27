import { createContext, useContext } from 'react';
import CartStore from './CartStore';
import VideoStore from './VideoStore';

export interface IStore {
	cart: CartStore;
	video: VideoStore;
}

export const store: IStore = {
	cart: new CartStore(),
	video: new VideoStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
	return useContext(StoreContext);
};
