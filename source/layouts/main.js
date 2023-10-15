(data, Util) => {
	Util.addBlankLink = (item) => ({
		...item,
		href: !item.href && item.href !== null ? 'blank.html' : item.href
	});

	const action = 'https://echo.htmlacademy.ru';
	const modalId = 'order';
	const phoneNumber = '+7 (812) 812-12-12';

	return {
		accentLink: {
			href: 'modal.html',
			modalId,
			title: 'Доставим редкий товар под заказ'
		},
		action,
		address: 'Санкт-Петербург, набережная реки Карповки, 5, литера П.',
		breadcrumbs: {
			list: [
				{
					href: 'index.html',
					title: 'Главная'
				}
			]
		},
		catalogMenu: {
			list: [
				{
					title: 'Виртуальная реальность'
				},
				{
					title: 'Фитнес-браслеты'
				},
				{
					title: 'Квадрокоптеры'
				},
				{
					current: data.page === 'catalog',
					href: 'catalog.html',
					title: 'Моноподы для cелфи'
				},
				{
					title: 'Умные часы'
				},
				{
					title: 'Экшн-камеры'
				}
			].map(Util.addBlankLink),
			title: 'Каталог товаров'
		},
		developer: {
			href: 'https://htmlacademy.ru/',
			logo: {
				alt: 'Логотип HTML Academy',
				height: '34',
				src: 'images/logo-htmlacademy.svg',
				width: '115'
			}
		},
		form: {
			action,
			fields: [
				{
					icon: 'user',
					label: 'Ваше имя',
					message: 'Добавьте имя',
					name: 'username',
					placeholder: 'Введите имя',
					required: true,
					type: 'text'
				},
				{
					icon: 'letter',
					label: 'Ваш e-mail',
					message: 'Забавный у вас адрес',
					name: 'email',
					placeholder: 'Введите адрес электронной почты',
					required: true,
					type: 'email',
					value: 'почта'
				},
				{
					label: 'Что нужно привезти',
					name: 'comment',
					placeholder: 'В свободной форме',
					type: 'textarea'
				},
				{
					label: 'Количество',
					max: '999',
					min: '1',
					name: 'quantity',
					required: true,
					step: '1',
					tooltip: 'Постараемся найти, сколько нужно. Привезём сколько получится по требованиям к&nbsp;провозу багажа.',
					type: 'number',
					value: '1'
				}
			],
			formId: modalId,
			stepDownText: 'Меньше',
			stepUpText: 'Больше',
			submitText: 'Отправить'
		},
		heading: 'Страница в разработке',
		lang: 'ru',
		logo: {
			alt: 'Логотип Device',
			height: '36',
			href: 'index.html',
			src: 'images/logo-device.svg',
			width: '145'
		},
		mainMenu: {
			list: [
				{
					current: data.page === 'blank',
					title: 'Доставка'
				},
				{
					href: 'promo.html',
					title: 'Гарантия'
				},
				{
					title: 'Контакты'
				}
			].map(Util.addBlankLink)
		},
		modal: {
			closeTitle: 'Закрыть',
			heading: 'Доставка под заказ',
			modalId
		},
		postProcess({ breadcrumbs, breadcrumbsTail, title }) {
			breadcrumbs.list = [
				...breadcrumbs.list,
				...breadcrumbsTail || [{ title }]
			];
		},
		projectName: 'Device',
		promo: {
			detailsHref: 'promo.html',
			detailsTitle: 'Подробнее',
			dotTitle: 'К слайду №',
			heading: 'Промо-слайдер',
			list: [
				{
					content: '<p>Этот обычный, на первый взгляд, квадрокоптер оснащен мощным лазером, замаскированным под стандартную камеру.</p>',
					lead: 'Порхает как бабочка, жалит как пчела!',
					params: [
						{
							key: 'Дальность полета',
							value: '800 м'
						},
						{
							key: 'Радиус поражения',
							value: '50 м'
						}
					]
				},
				{
					content: '<p>Мотивирующие фитнес-браслеты помогут найти в себе силы не пропускать занятия и соблюдать диету.</p>',
					lead: 'Худеем<br>правильно!',
					params: [
						{
							key: 'Без подзарядки',
							value: '48 часов'
						}
					]
				},
				{
					content: '<p>Самая длинная палка для селфи доступна в нашем магазине. Восемь (Восемь, Карл!) метров длиной и весом всего 5 кг.</p>',
					lead: 'Делай селфи,<br>как Бен Стиллер! ',
					params: [
						{
							key: 'Длина палки',
							value: '8,5 м'
						},
						{
							key: 'Вес палки',
							value: '5 кг'
						},
						{
							key: 'Материал',
							value: 'Карбон'
						}
					]
				}
			].map((item, i) => {
				const num = i + 1;

				return {
					...item,
					heading: `Товар ${num}`,
					image: {
						alt: item.alt || '',
						height: '560',
						src: `images/slide-${num}.png`,
						width: '560'
					}
				};
			}),
			nextTitle: 'Следующий слайд',
			prevTitle: 'Предыдущий слайд'
		},
		searchForm: {
			action,
			label: 'Поиск',
			name: 'search',
			placeholder: 'Поиск по сайту',
			submitTitle: 'Найти',
			value: 'Текст поиска'
		},
		social: {
			list: [
				{
					href: 'https://www.facebook.com/htmlacademy',
					id: 'facebook',
					title: 'Facebook'
				},
				{
					href: 'https://www.instagram.com/htmlacademy/',
					id: 'instagram',
					title: 'Instagram'
				},
				{
					href: 'https://twitter.com/htmlacademy_ru',
					id: 'twitter',
					title: 'Twitter'
				}
			]
		},
		tel: {
			formattedValue: phoneNumber,
			shortTitle: 'Тел.:',
			value: Util.numberize(phoneNumber)
		},
		title: 'В разработке',
		userMenu: {
			list: [
				{
					alias: 'user',
					href: 'catalog.html',
					title: 'Войти'
				},
				{
					alias: 'sort',
					title: 'Сравнить'
				},
				{
					alias: 'cart',
					hiddenText: 'Товаров в корзине:',
					href: null,
					label: '2',
					popover: {
						list: [
							{
								title: 'Любительская<br>селфи-палка'
							},
							{
								title: 'Профессиональная<br>селфи-палка'
							}
						].map((item, i) => ({
							...Util.addBlankLink(item),
							hrefToRemove: 'blank.html',
							image: {
								height: 43,
								src: `images/product-${i + 1}-small.jpg`,
								src2x: item.has2x ? `images/product-${i + 1}-small@2x.jpg` : null,
								width: 39
							}
						})),
						openLink: Util.addBlankLink({
							title: 'Открыть корзину'
						}),
						params: [
							{
								key: 'Товаров',
								value: 2
							},
							{
								key: 'Сумма',
								value: '2000 ₽'
							}
						],
						titleToRemove: 'Удалить из корзины'
					},
					title: 'Корзина'
				}
			].map(Util.addBlankLink)
		}
	};
};
