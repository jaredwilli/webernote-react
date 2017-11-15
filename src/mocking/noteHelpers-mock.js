// note data mocks

export const notes = [
	{
		title: 'test2',
		url: '',
		created_date: 1510673850936,
		description: '',
		id: '-KyvAP5HTXffEWdbaef0',
		isEditing: true,
		modified_date: '',
		notebook: {
			id: '-KyvAS_2G9YAXlsVuzuI',
			name: 'notebook2',
			value: '-KyvAS_2G9YAXlsVuzuI'
		},
		tags: [
			{
				id: '-KyvAO-6BDUfanm5WHno',
				label: 'react',
				value: '-KyvAO-6BDUfanm5WHno'
			},
			{
				id: '-KyvAR6OCmJ0nn0OXUCP',
				label: 'firebase',
				value: '-KyvAR6OCmJ0nn0OXUCP'
			}
		]
	},
	{
		created_date: 1510673839255,
		description: '',
		id: '-KyvAMElowTR2Kc8LcUm',
		isEditing: false,
		modified_date: '',
		title: '',
		url: '',
		tags: []
	},
	{
		title: 'Ok so things are working  now?',
		url: 'test',
		created_date: 1510673337295,
		description: '',
		id: '-Kyv8RiRx27K1Rgm5eth',
		isEditing: false,
		modified_date: '',
		label: {
			hex: '#D50000',
			id: '-KyvA7NSkDQQEqqyeLII',
			name: 'red',
			source: 'hex'
		},
		notebook: {
			id: '-Kyv9QutSpRXVJmvc-c1',
			name: 'New notebook',
			value: '-Kyv9QutSpRXVJmvc-c1'
		},
		tags: [
			{
				id: '-KyvAO-6BDUfanm5WHno',
				label: 'react',
				value: '-KyvAO-6BDUfanm5WHno'
			},
			{
				id: '-KyvAOga95wpmPOz13oU',
				label: 'redux',
				value: '-KyvAOga95wpmPOz13oU'
			}
		]
	}
];

export const notebooks = [
	{
		id: '-Kyv9QutSpRXVJmvc-c1',
		value: '-Kyv9QutSpRXVJmvc-c1',
		name: 'New notebook'
	},
	{
		id: '_xyz456',
		value: '_xyz456',
		name: 'Other Notebook'
	}
];

export const notebookFilter = {
	name: 'All notebooks',
	id: 'all_notebooks'
};

export const notebookMenuOptions = {
    target: {
        value: '-Kyv9QutSpRXVJmvc-c1',
        children: [
            {
                value: '-Kyv9QutSpRXVJmvc-c1',
                text: 'New Notebook'
            }, {
                value: '_xyz456',
                text: 'Other Notebook'
            }
        ]
    }
};
