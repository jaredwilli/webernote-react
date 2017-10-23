
export const URLS = {
    GITHUB_REPO: 'https://github.com/jaredwilli/webernote-react',
    GITHUB_ISSUES: 'https://github.com/jaredwilli/webernote-react/issues'
}

export const MOD_KEYS = {
    CMD: '⌘', //'&#8984;',
    SHIFT: '⇧', //'&#8679;',
    ALT: '⌥' //'&#8997;'
};

export const FILE = [
    {
        text: 'New Note',
        secondary: '⌘N',
        action: 'addNote'
    }, {
        text: 'divider'
    }, {
        text: 'Save',
        secondary: '⌘S',
        action: null,
        url: null
    }, {
        text: 'Save As...',
        secondary: '⌘⇧S',
        action: null,
        url: null
    }, {
        text: 'Save',
        secondary: '⌘S',
        action: null,
        url: null
    }, {
        text: 'divider'
    }, {
        text: 'Login',
        secondary: '⌘L',
        action: 'loginUser'
    }, {
        text: 'Logout',
        secondary: '⌘⇧L',
        action: 'logoutUser'
    }, {
        text: 'divider'
    }, {
        text: 'Close',
        secondary: '⌘W',
        action: null,
        url: null
    }, {
        text: 'Quit',
        secondary: '⌘Q',
        action: null,
        url: null
    }, {
        text: 'divider'
    }, {
        text: 'Import Notes...',
        secondary: '',
        action: null,
        url: null
    }, {
        text: 'Export Notes...',
        secondary: '',
        action: null,
        url: null
    }, {
        text: 'Print',
        secondary: '⌘P',
        action: null,
        url: null
    }
];

export const EDIT = [
    {
        text: 'Undo',
        secondary: '⌘Z',
        action: null,
        url: null
    }, {
        text: 'Redo',
        secondary: '⌘⇧Z',
        action: null,
        url: null
    }, {
        text: 'divider'
    }, {
        text: 'Cut',
        secondary: '⌘X',
        action: null,
        url: null
    }, {
        text: 'Copy',
        secondary: '⌘C',
        action: null,
        url: null
    }, {
        text: 'Paste',
        secondary: '⌘V',
        action: null,
        url: null
    }
];

export const VIEW = [
    {
        text: 'Hide Sidebar',
        secondary: '⌘B',
        action: null,
        url: null
    }, {
        text: 'divider'
    }, {
        text: 'Zoom In',
        secondary: '⌘+',
        action: null,
        url: null
    }, {
        text: 'Zoom Out',
        secondary: '⌘-',
        action: null,
        url: null
    }, {
        text: 'Reset Zoom',
        secondary: '⌘0',
        action: null,
        url: null
    }, {
        text: 'divider'
    }, {
        text: 'Reload',
        secondary: '⌘R',
        action: null,
        url: null
    }
];

export const NOTE = [
    {
        text: 'Edit Note',
        secondary: '⌘E',
        action: null,
        url: null
    }, {
        text: 'Duplicate Note',
        secondary: '⌘V',
        action: null,
        url: null
    }, {
        text: 'Delete Note',
        secondary: '⌘D',
        action: null,
        url: null
    }, {
        text: 'Delete Empty Notes',
        secondary: '⌘⇧D',
        action: null,
        url: null
    }
];

export const TOOLS = [
    {
        text: 'Use Rich Text Editor',
        secondary: '⌘⇧R',
        action: null,
        url: null
    }
];

export const HELP = [
    {
        text: 'Report A Bug',
        secondary: '',
        action: null,
        url: 'https://github.com/jaredwilli/webernote-react/issues'
    }, {
        text: 'Shortcuts',
        secondary: '⇧?',
        action: null,
        url: null
    }
];
