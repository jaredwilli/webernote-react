{
    selectedNote: '',
    selectedTag: '',
    selectedNotebook: '',
    filterType: '',
    searchType: '',
    notesByAll: {
        isFetching: true,
        isListed: true,
        items: [],
        editingNote: {}
    },
    notesByNotebook: {
        [selectedNotebook]: {
            isFetching: true,
            isListed: false,
            items: [],
            editingNote: {}
        }
    },
    notesByTag: {
        [selectedTag]: {
            isFetching: true,
            isListed: false,
            items: [],
            editingNote: {}
        }
    },
    notebooks: {
        isFetching: true,
        isListed: false,
        items: [],
        editingNotebook: {}
    },
    tags: {
        isFetching: true,
        isListed: false,
        items: [],
        editingTag: {}
    }
}
