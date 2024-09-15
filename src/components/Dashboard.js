import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography, IconButton, Box, Paper } from '@mui/material'
import Widget from './Widget'
import WidgetDialog from './WidgetDialog'
import SideDialog from './SideDialog'
import Header from './Header'
import { addWidget, removeWidget } from '../redux/actions'
import { Add, FilterList } from '@mui/icons-material'

const Dashboard = () => {
  const categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sideDialogOpen, setSideDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [filteredWidgets, setFilteredWidgets] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddWidget = (widget) => {
    dispatch(addWidget(currentCategory, widget))

    // Immediately update the filteredWidgets state
    setFilteredWidgets((prevState) => ({
      ...prevState,
      [currentCategory]: [
        ...(prevState[currentCategory] ||
          categories.find((cat) => cat.id === currentCategory).widgets),
        widget,
      ],
    }))

    setDialogOpen(false)
  }

  const handleRemoveWidget = (categoryID, widgetID) => {
    dispatch(removeWidget(categoryID, widgetID))

    setFilteredWidgets((prevState) => ({
      ...prevState,
      [categoryID]: [
        ...(prevState[categoryID] ||
          categories.find(((cat) => cat.id === categoryID).widgets)),
      ],
    }))
  }

  useEffect(() => {
    const initialWidgets = {}
    categories.forEach((category) => {
      initialWidgets[category.id] = category.widgets
    })
    setFilteredWidgets(initialWidgets) // Sync local state with Redux
  }, [categories])

  const handleSideDialogSubmit = (widgetsToKeep) => {
    setFilteredWidgets(widgetsToKeep)
    setSideDialogOpen(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  const handleFilterClick = () => {
    setSearchQuery('') // Clear the search query when the filter button is clicked
    setSideDialogOpen(true)
  }

  // Apply search and filter together
  const getFilteredCategories = () => {
    return categories.map((category) => {
      const widgetsToFilter = filteredWidgets[category.id] || category.widgets
      const searchedWidgets = widgetsToFilter.filter((widget) =>
        widget.name.toLowerCase().includes(searchQuery)
      )
      return {
        ...category,
        widgets: searchedWidgets,
      }
    })
  }

  const filteredCategories = getFilteredCategories()

  return (
    <Box sx={{ p: 2 }}>
      <Header onSearch={handleSearch} searchQuery={searchQuery} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 7,
          mb: 2,
          gap: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          CNAPP Dashboard
        </Typography>
        <IconButton
          onClick={handleFilterClick}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '5px 12px',
            mt: '6px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="button" sx={{ fontSize: '14px' }}>
              Filter Widgets
            </Typography>
            <FilterList sx={{ fontSize: '20px', marginLeft: '6px' }} />
          </Box>
        </IconButton>
      </Box>
      <Grid container spacing={3} px={2}>
        {filteredCategories.map((category) => (
          <Grid item xs={12} key={category.id}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {category.name}
            </Typography>
            <Grid container spacing={2}>
              {category.widgets.map((widget) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={widget.id}>
                  <Widget
                    title={widget.name}
                    parts={widget.parts}
                    onRemove={() => handleRemoveWidget(category.id, widget.id)}
                    categoryId={category.id}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '15px',
                    margin: '10px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: '350px',
                    height: '230px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    textTransform: 'none',
                    '&:hover': {
                      boxShadow: '0px 0px 8px 3px rgba(0, 0, 0, 0.2)',
                      backgroundColor: '#f9f9f9',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setCurrentCategory(category.id)
                    setDialogOpen(true)
                  }}
                >
                  <Add fontSize="small" />
                  <Typography variant="button" component="div">
                    Add Widget
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <WidgetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleAddWidget}
      />
      <SideDialog
        open={sideDialogOpen}
        onClose={() => setSideDialogOpen(false)}
        onSubmit={handleSideDialogSubmit}
        categories={categories}
        initialCategory={currentCategory}
        initialCheckedWidgets={filteredWidgets}
      />
    </Box>
  )
}

export default Dashboard
