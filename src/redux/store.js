//store.js
import { createStore } from 'redux'
import { dashboardReducer } from './reducers'

export const store = createStore(dashboardReducer)
