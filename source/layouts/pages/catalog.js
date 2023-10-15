(data, Util) => {
	const { action, userMenu } = data;
	const heading = 'Моноподы для селфи';
	const title = 'Каталог товаров';

	const [profileLink] = userMenu.list;
	profileLink.title = 'Коля Петухов'; // На данном этапе ТЗ требует показать шапку для авторизованного пользователя на этой странице
	profileLink.extend = {
		href: 'index.html',
		title: 'Выйти'
	};

	return {
		breadcrumbsTail: [
			{
				href: 'catalog.html',
				title
			},
			{
				title: heading
			}
		],
		catalog: {
			filter: {
				action,
				heading: 'фильтр',
				list: [
					{
						fields: [
							{
								label: 'от',
								value: '0'
							},
							{
								label: 'до',
								value: '5000'
							}
						].map((field) => ({
							...field,
							name: 'cost[]'
						})),
						max: '8400',
						min: '0',
						step: '100',
						title: 'Стоимость'
					},
					{
						fields: [
							{
								checked: true,
								label: 'Черный',
								value: 'black'
							},
							{
								checked: true,
								label: 'Белый',
								value: 'white'
							},
							{
								label: 'Синий',
								value: 'blue'
							},
							{
								label: 'Красный',
								value: 'red'
							},
							{
								disabled: true,
								label: 'Розовый',
								value: 'pink'
							}
						].map((field) => ({
							...field,
							name: 'color[]',
							type: 'checkbox'
						})),
						title: 'Цвет'
					},
					{
						fields: [
							{
								checked: true,
								label: 'Есть',
								value: '1'
							},
							{
								label: 'Нет',
								value: '0'
							}
						].map((field) => ({
							...field,
							name: 'bluetooth',
							type: 'radio'
						})),
						title: 'Bluetooth'
					}
				],
				sublitTitle: 'Показать'
			},
			list: [
				{
					heading: 'Любительская селфи-палка',
					label: 'new',
					price: '500 ₽'
				},
				{
					heading: 'Профессиональная селфи-палка',
					price: '1 500 ₽'
				},
				{
					alt: 'Корпус жёлтого цвета',
					heading: 'Непотопляемая селфи-палка',
					price: '2 500 ₽'
				},
				{
					heading: 'Селфи-палка «Следуй за мной»',
					price: '1 500 ₽'
				}
			].map((item, i) => ({
				...Util.addBlankLink(item),
				image: {
					alt: item.alt || '',
					height: '380',
					src: `images/product-${i + 1}.jpg`,
					width: '360'
				},
				linkTitle: 'Подробнее'
			})),
			moreButton: Util.addBlankLink({
				title: 'Загрузить ещё'
			}),
			pagination: {
				list: ['1', '2', '3', '...', '15'].map((item) => Util.addBlankLink({
					title: item
				})),
				next: Util.addBlankLink({
					title: 'Вперёд'
				}),
				prev: Util.addBlankLink({
					title: 'Назад'
				})
			},
			sorting: {
				action,
				directions: [
					{
						label: 'По возрастанию',
						value: 'asc'
					},
					{
						label: 'По убыванию',
						value: 'desc'
					}
				],
				dirname: 'direction',
				heading: 'сортировка',
				select: {
					name: 'sorting',
					options: [
						{
							title: 'Популярные',
							value: 'popularity'
						},
						{
							title: 'Дорогие',
							value: 'cost'
						}
					]
				}
			}
		},
		heading,
		title
	};
};
