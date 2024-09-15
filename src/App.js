// App.js
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './components/Dashboard'
import SideDialog from './components/SideDialog'

const App = () => {
  const categories = useSelector((state) => state.categories)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id || null
  )
  const [dashboardWidgets, setDashboardWidgets] = useState({})

  useEffect(() => {
    const initialWidgets = {}
    categories.forEach((category) => {
      initialWidgets[category.id] = category.widgets
    })
    setDashboardWidgets(initialWidgets)
  }, [categories])

  const handleAddWidget = (widgetsToKeep) => {
    setDashboardWidgets(widgetsToKeep)
  }

  const handleRemoveWidget = (categoryID, widgetID) => {
    const updatedWidgets = { ...dashboardWidgets }
    updatedWidgets[categoryID] = updatedWidgets[categoryID].filter(
      (widget) => widget.id !== widgetID
    )
    setDashboardWidgets(updatedWidgets)
  }

  const handleOpenDialog = (categoryID) => {
    setActiveCategory(categoryID)
    setDialogOpen(true)
  }

  const handleHeaderAddClick = () => {
    setActiveCategory(categories[0]?.id) // Default to first category if none is selected
    setDialogOpen(true)
  }

  return (
    <div>
      <Dashboard
        categories={categories}
        dashboardWidgets={dashboardWidgets}
        onAddWidget={handleAddWidget}
        onRemoveWidget={handleRemoveWidget}
        onOpenDialog={handleOpenDialog}
        onAddClick={handleHeaderAddClick}
      />
      {activeCategory && (
        <SideDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleAddWidget}
          categories={categories}
          initialCategory={activeCategory}
          initialCheckedWidgets={dashboardWidgets}
        />
      )}
    </div>
  )
}

export default App
