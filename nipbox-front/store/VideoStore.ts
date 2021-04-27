import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

export default class VideoStore {
	videoLink: string = '';

	constructor() {
		makeAutoObservable(this);
	}

	setVideo(link: string) {
		this.videoLink = link;
	}

	close() {
		this.videoLink = '';
	}
}
