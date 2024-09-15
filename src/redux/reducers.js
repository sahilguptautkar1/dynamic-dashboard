//Reducer.js
import { ADD_WIDGET, REMOVE_WIDGET } from './actions'
import data from '../data.json'

const initialState = data

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryID
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget],
              }
            : category
        ),
      }
    case REMOVE_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryID
            ? {
                ...category,
                widgets: category.widgets.filter(
                  (widget) => widget.id !== action.payload.widgetID
                ),
              }
            : category
        ),
      }
    default:
      return state
  }
}
