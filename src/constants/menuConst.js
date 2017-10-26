
export const URLS = {
    GITHUB_REPO: 'https://github.com/jaredwilli/webernote-react',
    GITHUB_ISSUES: 'https://github.com/jaredwilli/webernote-react/issues'
}

export const MOD_KEYS = {
    CMD: '⌘', //'&#8984;',
    SHIFT: '⇧', //'&#8679;',
    ALT: '⌥' //'&#8997;'
};

export const MENU_CONST = {
    FILE: [
        {
            text: 'New Note',
            secondary: '⌘N',
            config: {
                options: null,
                action: 'addNote',
                url: null
            },
            permissions: []
        }
    ],

    EDIT: [
        {
            text: 'Undo',
            secondary: '⌘Z',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Redo',
            secondary: '⌘⇧Z',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Cut',
            secondary: '⌘X',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Copy',
            secondary: '⌘C',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Paste',
            secondary: '⌘V',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }
    ],

    VIEW: [
        {
            text: 'Hide Sidebar',
            secondary: '⌘B',
            config: {
                options: null,
                action: 'toggleNoteNav',
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Zoom In',
            secondary: '⌘+',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Zoom Out',
            secondary: '⌘-',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Reset Zoom',
            secondary: '⌘0',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Reload',
            secondary: '⌘R',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }
    ],

    NOTE: [
        {
            text: 'Delete Note',
            secondary: '⌘D',
            config: {
                options: null,
                action: 'deleteNote',
                url: null
            },
            permissions: []
        }, {
            text: 'Delete Empty Notes',
            secondary: '⌘⇧D',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }
    ],

    TOOLS: [
        {
            text: 'Settings',
            secondary: '⌘⇧S',
            config: {
                modal: {
                    type: 'SETTINGS_MODAL',
                    dialogStyle: { height: 'auto', width: '80%' },
                    onClose: () => this.props.actions.hideModal(),
                    onSave: (options) => {
                        this.saveSettings(options);
                        this.props.actions.hideModal();
                    }
                },
                action: 'openSettingsModal',
                url: '/settings'
            },
            permissions: []
        }
    ],

    HELP: [
        {
            text: 'Report A Bug',
            secondary: '',
            config: {
                options: null,
                action: null,
                url: 'https://github.com/jaredwilli/webernote-react/issues'
            },
            permissions: []
        }, {
            text: 'Shortcuts',
            secondary: '⇧?',
            config: {
                options: null,
                action: null,
                url: null
            },
            permissions: []
        }
    ]
};
