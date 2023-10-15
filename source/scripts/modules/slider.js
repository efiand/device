const setChangeCb = (index, activeClass) => (item, i) => {
	if (i === index) {
		item.classList.add(activeClass);
	} else {
		item.classList.remove(activeClass);
	}
};

export default class Slider {
	constructor({ el, iClass, slideClass }) {
		this._el = el;
		this._slides = el.querySelectorAll(`.${slideClass}`);
		this._iControls = el.querySelectorAll(`.${iClass}`);
		this._stepControls = el.querySelectorAll('[data-step]');
		this._iActiveClass = `${iClass}--active`;
		this._slideActiveClass = `${slideClass}--active`;
		this._index = 0;

		this._setListeners();
	}

	_setListeners() {
		this._handleIClick = this._handleIClick.bind(this);
		this._handleStepClick = this._handleStepClick.bind(this);

		for (const iControl of this._iControls) {
			iControl.addEventListener('click', this._handleIClick);
		}

		for (const stepControl of this._stepControls) {
			stepControl.addEventListener('click', this._handleStepClick);
		}
	}

	_handleIClick(evt) {
		evt.preventDefault();

		const index = parseInt(evt.currentTarget.dataset.i, 10);
		this._setSlide(index);
	}

	_handleStepClick(evt) {
		evt.preventDefault();

		let index = this._index + parseInt(evt.currentTarget.dataset.step, 10);

		if (index >= this._slides.length) {
			index = 0;
		} else if (index < 0) {
			index = this._slides.length - 1;
		}

		this._setSlide(index);
	}

	_setSlide(index) {
		this._index = index;

		this._slides.forEach(setChangeCb(index, this._slideActiveClass));
		this._iControls.forEach(setChangeCb(index, this._iActiveClass));
	}
}
