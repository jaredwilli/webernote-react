
export const URLS = {
    GITHUB_REPO: 'https://github.com/jaredwilli/webernote-react',
    GITHUB_ISSUES: 'https://github.com/jaredwilli/webernote-react/issues'
}

export const MOD_KEYS = {
    CTRL: '⌃',
    CMD: '⌘', //'&#8984;',
    SHIFT: '⇧', //'&#8679;',
    ALT: '⌥' //'&#8997;'
};

export const MENU_ITEMS = {
    FILE: [
        {
            text: 'New Note',
            config: {
                type: 'action',
                secondary: '⌃N',
                command: 'cntrl+n',
                action: 'addNote',
                options: null,
                url: null
            },
            permissions: []
        }
    ],

    EDIT: [
        {
            text: 'Undo',
            config: {
                type: 'action',
                secondary: '⌘Z',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Redo',
            config: {
                type: 'action',
                secondary: '⌘⇧Z',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Cut',
            config: {
                type: 'action',
                secondary: '⌘X',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Copy',
            config: {
                type: 'action',
                secondary: '⌘C',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Paste',
            config: {
                type: 'action',
                secondary: '⌘V',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }
    ],

    VIEW: [
        {
            text: 'Hide Sidebar',
            config: {
                type: 'action',
                secondary: '⌘B',
                command: null,
                action: 'toggleNoteNav',
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Zoom In',
            config: {
                type: 'action',
                secondary: '⌘+',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Zoom Out',
            config: {
                type: 'action',
                secondary: '⌘-',
                command: null,
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Reset Zoom',
            config: {
                type: 'action',
                secondary: '⌘0',
                command: 'command+0',
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'divider'
        }, {
            text: 'Reload',
            config: {
                type: 'action',
                secondary: '⌘R',
                command: 'command+r',
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }
    ],

    NOTE: [
        {
            text: 'Delete Note',
            config: {
                type: 'action',
                secondary: '⌘D',
                command: 'command+d',
                action: 'deleteNote',
                options: null,
                url: null
            },
            permissions: []
        }, {
            text: 'Delete Empty Notes',
            config: {
                type: 'action',
                secondary: '⌘⇧D',
                command: 'command+shift+d',
                action: null,
                options: null,
                url: null
            },
            permissions: []
        }
    ],

    TOOLS: [
        {
            text: 'Settings',
            config: {
                type: 'link',
                secondary: '⌘⇧S',
                command: 'command+shift+s',
                action: 'openSettingsModal',
                options: {
                    dialogStyle: { height: 'auto', width: '80%' }
                },
                url: null
            },
            permissions: []
        }
    ],

    HELP: [
        {
            text: 'Report A Bug',
            config: {
                type: 'link',
                secondary: '',
                command: null,
                action: null,
                options: null,
                url: 'https://github.com/jaredwilli/webernote-react/issues'
            },
            permissions: []
        }, {
            text: 'Shortcuts',
            config: {
                type: 'modal',
                secondary: '⇧?',
                command: 'shift+?',
                action: 'openShortcutsModal',
                options: {
                    dialogStyle: { height: 'auto', width: '80%' }
                },
                url: null
            },
            permissions: []
        }
    ]
};
