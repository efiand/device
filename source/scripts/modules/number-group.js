export default class NumberGroup {
	constructor(el) {
		this._input = el.querySelector('input');
		this._decreaser = el.querySelector('button:first-of-type');
		this._increaser = el.querySelector('button:last-of-type');

		this._setListeners();
	}

	_setListeners() {
		this._handleStepUp = this._handleStepUp.bind(this);
		this._handleStepDown = this._handleStepDown.bind(this);

		this._increaser.addEventListener('click', this._handleStepUp);
		this._decreaser.addEventListener('click', this._handleStepDown);
	}

	_handleStepUp(evt) {
		evt.preventDefault();

		this._input.stepUp();
	}

	_handleStepDown(evt) {
		evt.preventDefault();

		this._input.stepDown();
	}
}
