// user data mocks

export const userHelpers = {
	anonUser: {
		uid: 'abc123',
		isAnonymous: true,
		displayName: '',
		email: '',
		photoURL: ''
	},

	anonUserNoData: {
		uid: 'abc123',
		isAnonymous: true,
		online: true,
		displayName: 'guest',
		email: '',
		photo: '',
		permissions: ['basic_app'],
		role: 'guest',
		created_date: 1482363367071,
		last_login: 1482363367071,
		notebooks: {},
		labels: {},
		notes: {},
		tags: []
	},

	anonUserWithData: {
		uid: 'abc123',
		isAnonymous: true,
		displayName: '',
		email: '',
		photoURL: '',
		created_date: 1482363367071,
		last_login: 1482363367071,
		notebooks: {
			notebook1: {
				id: 'notebook1',
				value: 'notebook1',
				name: 'My Notebook'
			}
		},
		labels: {
			label1: {
				id: 'label1',
				source: 'hex',
				hex: '#C5CAE9',
				name: 'light indigo'
			}
		},
		tags: {
			tag1: {
				id: 'tag1',
				value: 'tag1',
				label: 'firebase'
			}
		},
		notes: {
			note1: {
				id: 'note1',
				title: 'Some mock data content for testing the code',
				description: 'Example anonUser note to be merged.',
				isEditing: false,
				created_date: 1509421092159,
				modified_date: 1509421172278,
				url: 'http://google.com',
				label: {
					id: 'label1',
					source: 'hex',
					hex: '#C5CAE9',
					name: 'light indigo'
				},
				notebook: {
					id: 'notebook1',
					value: 'notebook1',
					name: 'My Notebook'
				},
				tags: [
					('tag1': {
						id: 'tag1',
						value: 'tag1',
						label: 'firebase'
					})
				]
			}
        }
	},

	loggedInUser: {
		uid: 'xyz456',
		isAnonymous: false,
		displayName: 'Bob Dillon',
		email: 'bob@dillon.com',
		created_date: 1482363367071,
		last_login: 1482363367071,
		photoURL:
			'https://files.gamebanana.com/img/ico/sprays/awesome_hotdog.png'
	},

	loggedInUserNoData: {
		uid: 'xyz456',
		isAnonymous: false,
		online: true,
		displayName: 'Bob Dillon',
		email: 'bob@dillon.com',
		photo: 'https://files.gamebanana.com/img/ico/sprays/awesome_hotdog.png',
		permissions: ['basic_app', 'view_users', 'edit_profile', 'delete_profile'],
		role: 'user',
		created_date: 1482363367071,
		last_login: 1482363367071,
		notebooks: {},
		labels: {},
		notes: {},
		tags: []
	},

	loggedInUserWithData: {
		uid: 'xyz456',
		isAnonymous: false,
		online: true,
		email: 'bob@dillon.com',
		displayName: 'Bob Dillon',
		photo: 'https://files.gamebanana.com/img/ico/sprays/awesome_hotdog.png',
		permissions: ['basic_app', 'view_users', 'edit_profile', 'delete_profile'],
		role: 'user',
		created_date: 1482363367071,
		last_login: 1482363367071,
		notebooks: {
			notebook1: {
				id: 'notebook1',
				value: 'notebook1',
				name: 'My Notebook'
			}
		},
		labels: {
			label1: {
				id: 'label1',
				source: 'hex',
				hex: '#C5CAE9',
				name: 'light indigo'
			}
		},
		tags: {
			tag1: {
				id: 'tag1',
				value: 'tag1',
				label: 'firebase'
			}
		},
		notes: {
			note1: {
				id: 'note1',
				title: 'Some mock data content for testing the code',
				description: 'Example anonUser note to be merged.',
				isEditing: false,
				created_date: 1509421092159,
				modified_date: 1509421172278,
				url: 'http://google.com',
				label: {
					id: 'label1',
					source: 'hex',
					hex: '#C5CAE9',
					name: 'light indigo'
				},
				notebook: {
					id: 'notebook1',
					value: 'notebook1',
					name: 'My Notebook'
				},
				tags: [
					('tag1': {
						id: 'tag1',
						value: 'tag1',
						label: 'firebase'
					})
				]
			}
		}
	}
};
