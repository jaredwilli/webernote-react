/**
 * A class for mocking out firebase methods for testing
 */
export class Database {
    // debugger;
    ref = (path) => {
        if (!this[path]) {
            this[path] = new Reference(path)
        }
        return this[path]
    }
}

export class Reference {
    constructor(path) {
        this.path = path
        this.snap = { val: () => this._val()}
        this.data = null
    }

    _val = jest.fn(() => {
        return this.data;
    })

    once = jest.fn((param, callback) => {
        const promise = new Promise ((resolve, reject) => {
            if (callback) {
                callback(this.snap)
                resolve()
            } else {
                resolve(this.snap)
            }
        })
        mockFirebase.promises.push(promise)
        return promise
    })

    on = jest.fn((param, callback) => {
        const promise = new Promise ((resolve, reject) => {
            if (callback) {
                callback(this.snap)
                resolve()
            } else {
                resolve(this.snap)
            }
        })
        mockFirebase.promises.push(promise)
        return promise
    })

    off = jest.fn((param, callback) => {
        const promise = Promise.resolve()
        mockFirebase.promises.push(promise)
        return promise
    })

    update = jest.fn((data) => {
        const promise = Promise.resolve()
        mockFirebase.promises.push(promise)
        return promise
    })

    remove = jest.fn(() => {
        const promise = Promise.resolve()
        mockFirebase.promises.push(promise)
        return promise
    })
}

export class MockFirebase {
    constructor() {
        this.database = () => {
            if (!this.databaseInstance) {
                this.databaseInstance = new Database()
            }
            return this.databaseInstance
        }
    }
}

export default class mockFirebase {
    static initializeApp() {
        mockFirebase.firebase = new MockFirebase()
        mockFirebase.promises = []
        return mockFirebase.firebase
    }

    static reset() {
        mockFirebase.promises = []
        mockFirebase.firebase.databaseInstance = null
    }

    static waitForPromises() {
        return Promise.all(mockFirebase.promises)
    }
}
