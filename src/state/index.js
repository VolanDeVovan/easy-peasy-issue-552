import { action, computed, createStore, persist } from 'easy-peasy'
import createElectronStorage from "redux-persist-electron-storage";


const electronStorage = createElectronStorage({
    electronStoreOpts: {
        name: 'config',
        fileExtension: ''
    }
})


const state = persist({
    value: 0,

    computedValue: computed(state => state.value * 2),

    increment: action(state => { state.value += 1 })
}, { storage: electronStorage })


export const store = createStore(state)