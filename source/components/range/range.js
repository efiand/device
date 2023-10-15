import noUiSlider from 'nouislider';

const THRESHOLD = 40; // Расстояние между ползунками, при котором происходит соединение тултипов
const DIFF = 1000;

export default class Range {
	constructor(el) {
		this._el = el;
		this._slider = this._el.querySelector('.range__target');
		this._fromField = this._el.querySelector('input:first-of-type');
		this._toField = this._el.querySelector('input:last-of-type');
		this._tooltips = [];

		this._init();
		this._setListeners();
	}

	get _params() {
		const { max, min, step } = this._el.dataset;

		return {
			fromLabel: this._fromField.dataset.title,
			max: parseInt(max, 10),
			min: parseInt(min, 10),
			step: parseInt(step, 10),
			toLabel: this._toField.dataset.title
		};
	}

	_init() {
		const { fromLabel, max, min, step, toLabel } = this._params;

		noUiSlider.create(this._slider, {
			connect: true,
			cssPrefix: 'range__',
			handleAttributes: [
				{
					'aria-label': fromLabel
				},
				{
					'aria-label': toLabel
				}
			],
			range: {
				max,
				min
			},
			start: [
				this._fromField.value || min,
				this._toField.value || max
			],
			step,
			tooltips: [true, true]
		});

		this._tooltips = this._slider.noUiSlider.getTooltips();

		// Move tooltips into the origin element
		const origins = this._slider.noUiSlider.getOrigins();
		this._tooltips.forEach((tooltip, i) => {
			if (tooltip) {
				origins[i].appendChild(tooltip);
			}
		});
	}

	_setListeners() {
		this._handleUpdate = this._handleUpdate.bind(this);
		this._modifyTooltips = this._modifyTooltips.bind(this);

		this._slider.noUiSlider.on('update', this._handleUpdate);
	}

	_handleUpdate(values, ...params) {
		const labels = [this._params.fromLabel, this._params.toLabel].map((label, i) => {
			const value = parseInt(values[i], 10);
			return `${label} ${value}`;
		});
		const [, , , positions] = params;
		const [firstPositon] = positions;
		const [firstLabel] = labels;
		const [startValue, endValue] = values;
		this._fromField.value = parseInt(startValue, 10);
		this._toField.value = parseInt(endValue, 10);

		// Merge tooltips (https://refreshless.com/nouislider/examples/#section-merging-tooltips)
		const pools = [[]];
		const poolPositions = [[]];
		const poolValues = [[]];
		let atPool = 0;

		// Assign the first tooltip to the first pool, if the tooltip is configured
		if (this._tooltips[0]) {
			pools[0][0] = 0;
			poolPositions[0][0] = firstPositon;
			poolValues[0][0] = firstLabel;
		}

		for (let i = 1; i < positions.length; i++) {
			if (!this._tooltips[i] || positions[i] - positions[i - 1] > THRESHOLD) {
				atPool++;
				pools[atPool] = [];
				poolValues[atPool] = [];
				poolPositions[atPool] = [];
			}

			if (this._tooltips[i]) {
				pools[atPool].push(i);
				poolValues[atPool].push(labels[i]);
				poolPositions[atPool].push(positions[i]);
			}
		}

		pools.forEach(this._modifyTooltips(poolPositions, poolValues));
	}

	_modifyTooltips(poolPositions, poolValues) {
		return (pool, poolIndex) => {
			const handlesInPool = pool.length;

			for (let index = 0; index < handlesInPool; index++) {
				const handleNumber = pool[index];

				if (index === handlesInPool - 1) {
					let offset = 0;

					poolPositions[poolIndex].forEach((value) => {
						offset += DIFF - value;
					});

					const lastOffset = DIFF - poolPositions[poolIndex][handlesInPool - 1];
					offset /= handlesInPool;
					offset -= lastOffset;

					// Center this tooltip over the affected handles
					this._tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(' ');
					this._tooltips[handleNumber].style.display = 'block';
					this._tooltips[handleNumber].style.right = `${offset}%`;
				} else {
					// Hide this tooltip
					this._tooltips[handleNumber].style.display = 'none';
				}
			}
		};
	}
}
