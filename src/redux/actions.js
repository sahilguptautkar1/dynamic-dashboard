//actions.js
export const ADD_WIDGET = 'ADD_WIDGET'
export const REMOVE_WIDGET = 'REMOVE_WIDGET'

export const addWidget = (categoryID, widget) => ({
  type: ADD_WIDGET,
  payload: { categoryID, widget },
})

export const removeWidget = (categoryID, widgetID) => ({
  type: REMOVE_WIDGET,
  payload: { categoryID, widgetID },
})
