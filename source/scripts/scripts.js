import NumberGroup from './modules/number-group.js';
import Range from '../components/range/range.js';
import Slider from './modules/slider.js';
import { initModals } from 'unimodal';

initModals();

// Открываем все контролы, бессмысленные без наличия JS
for (const noJsHiddenEl of document.querySelectorAll('.no-js-hidden')) {
	noJsHiddenEl.classList.remove('no-js-hidden');
}

for (const numberGroupEl of document.querySelectorAll('.form__controls')) {
	new NumberGroup(numberGroupEl);
}

for (const promoEl of document.querySelectorAll('.promo--js')) {
	new Slider({
		el: promoEl,
		iClass: 'promo__dot-link',
		slideClass: 'promo__item'
	});
}

for (const servicesEl of document.querySelectorAll('.services')) {
	new Slider({
		el: servicesEl,
		iClass: 'services__tab-link',
		slideClass: 'services__content'
	});
}

for (const rangeEl of document.querySelectorAll('.range')) {
	new Range(rangeEl);
}
