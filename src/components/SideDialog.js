import React, { useState, useEffect } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'

const SideDialog = ({
  open,
  onClose,
  onSubmit,
  categories,
  initialCheckedWidgets,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id)
  const [selectedWidgets, setSelectedWidgets] = useState({})

  useEffect(() => {
    if (open) {
      const initialSelection = {}
      categories.forEach((category) => {
        initialSelection[category.id] = {}
        category.widgets.forEach((widget) => {
          initialSelection[category.id][widget.id] =
            initialCheckedWidgets[category.id]?.some(
              (dashboardWidget) => dashboardWidget.id === widget.id
            ) || initialCheckedWidgets[category.id] === undefined
        })
      })
      setSelectedWidgets(initialSelection)
    }
  }, [categories, initialCheckedWidgets, open])

  const handleCategorySelect = (categoryID) => {
    setSelectedCategory(categoryID)
  }

  const handleCheckboxChange = (categoryID, widgetID) => {
    setSelectedWidgets((prevSelected) => ({
      ...prevSelected,
      [categoryID]: {
        ...prevSelected[categoryID],
        [widgetID]: !prevSelected[categoryID]?.[widgetID],
      },
    }))
  }

  const handleSubmit = () => {
    const widgetsToKeep = {}
    Object.keys(selectedWidgets).forEach((categoryID) => {
      const category = categories.find((cat) => cat.id === categoryID)
      const selectedWidgetIDs = Object.keys(selectedWidgets[categoryID]).filter(
        (widgetID) => selectedWidgets[categoryID][widgetID]
      )
      widgetsToKeep[categoryID] = category.widgets.filter((widget) =>
        selectedWidgetIDs.includes(widget.id)
      )
    })
    onSubmit(widgetsToKeep)
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 460, height: '88vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'primary.main',
            px: 2,
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Add/Remove Widget
          </Typography>
          <Close sx={{ color: 'white', cursor: 'pointer' }} onClick={onClose} />
        </Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Personalize your dashboard by adding the following widget
            </Typography>

            {/* Categories Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderBottom: '2px solid #ccc',
                position: 'relative',
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="text"
                  color="primary"
                  onClick={() => handleCategorySelect(category.id)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 0,
                    fontSize: 16,
                    borderBottom:
                      selectedCategory === category.id ? '2px solid' : 'none',
                    borderColor:
                      selectedCategory === category.id
                        ? 'primary.main'
                        : 'transparent',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                    },
                    position: 'relative',
                    top: '1.5px',
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>

            {/* Widgets Section */}
            {selectedCategory && (
              <List>
                {categories
                  .find((cat) => cat.id === selectedCategory)
                  .widgets.map((widget) => (
                    <ListItem
                      key={widget.id}
                      onClick={() =>
                        handleCheckboxChange(selectedCategory, widget.id)
                      }
                      sx={{ paddingLeft: 0 }}
                    >
                      <Checkbox
                        checked={
                          selectedWidgets[selectedCategory]?.[widget.id] ||
                          false
                        }
                        tabIndex={-1}
                        disableRipple
                        sx={{ padding: 0, marginRight: 2 }}
                      />
                      <ListItemText primary={widget.name} />
                    </ListItem>
                  ))}
              </List>
            )}
          </Box>

          {/* Buttons Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default SideDialog
