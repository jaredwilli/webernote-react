export const MOD_KEYS = {
    CMD: '⌘', //'&#8984;',
    SHIFT: '⇧', //'&#8679;',
    ALT: '⌥' //'&#8997;'
}

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
        action: null
    }, {
        text: 'Save As...',
        secondary: '⌘⇧S',
        action: null
    }, {
        text: 'Save',
        secondary: '⌘S',
        action: null
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
        action: null
    }, {
        text: 'Quit',
        secondary: '⌘Q',
        action: null
    }, {
        text: 'divider'
    }, {
        text: 'Import Notes...',
        secondary: '',
        action: null
    }, {
        text: 'Export Notes...',
        secondary: '',
        action: null
    }, {
        text: 'Print',
        secondary: '⌘P',
        action: null
    }
];

export const EDIT = [
    {
        text: 'Undo',
        secondary: '⌘Z',
        action: null
    }, {
        text: 'Redo',
        secondary: '⌘⇧Z',
        action: null
    }, {
        text: 'divider'
    }, {
        text: 'Cut',
        secondary: '⌘X',
        action: null
    }, {
        text: 'Copy',
        secondary: '⌘C',
        action: null
    }, {
        text: 'Paste',
        secondary: '⌘V',
        action: null
    }
];

export const VIEW = [
    {
        text: 'Hide Sidebar',
        secondary: '⌘B',
        action: null
    }, {
        text: 'divider'
    }, {
        text: 'Zoom In',
        secondary: '⌘+',
        action: null
    }, {
        text: 'Zoom Out',
        secondary: '⌘-',
        action: null
    }, {
        text: 'Reset Zoom',
        secondary: '⌘0',
        action: null
    }, {
        text: 'divider'
    }, {
        text: 'Reload',
        secondary: '⌘R',
        action: null
    }
];

export const NOTE = [
    {
        text: 'Edit Note Title',
        secondary: '⌘L',
        action: null
    }, {
        text: 'Edit Note Notebook',
        secondary: '⌘`',
        action: null
    }, {
        text: 'Edit Note Label',
        secondary: '⌘`',
        action: null
    }, {
        text: 'Edit Note Tags',
        secondary: '⌘`',
        action: null
    }, {
        text: 'Edit Note Description',
        secondary: '⌘`',
        action: null
    }
];

export const TOOLS = [
    {
        text: 'Clean Up Empty Notes',
        secondary: '⌘⇧D',
        action: null
    }
];

export const HELP = [
    {
        text: 'Shortcuts',
        secondary: '⌘?',
        action: null
    }
];
