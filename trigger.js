class Trigger {
	constructor() {
		this.listeners = [];
	}
	subscribe(func) {
		this.listeners.push(func);
		return func;
	}
	unsubscribe(func) {
		let index = this.listeners.indexOf(func);
		if (index !== -1) {
			this.listeners.splice(index, 1);
		}
	}
	trigger() {
		this.listeners.forEach(func => func());
	}
}
