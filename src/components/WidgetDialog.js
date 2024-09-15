//WidgetDialog.js
import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Box,
} from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

const WidgetDialog = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('')
  const [parts, setParts] = useState([{ label: '', value: '' }])
  const [errors, setErrors] = useState([]) // To track errors for each part
  const [nameError, setNameError] = useState('') // To track errors for the widget name

  const handlePartChange = (index, field, value) => {
    const newParts = [...parts]
    newParts[index][field] = value

    const newErrors = [...errors]

    if (field === 'value') {
      // Check if the value is a valid number and is not empty or negative
      if (value === '' || isNaN(value)) {
        newErrors[index] = 'Value must be a numeric value'
      } else if (parseFloat(value) < 0) {
        newErrors[index] = 'Value cannot be less than zero'
      } else {
        newErrors[index] = ''
      }
    }

    if (field === 'label') {
      // Check if the label is empty or exceeds the maximum length
      if (value === '') {
        newErrors[index] = 'Label is required'
      } else if (value.length > 20) {
        newErrors[index] = 'Label must be 20 characters or less'
      } else {
        newErrors[index] = ''
      }
    }

    setParts(newParts)
    setErrors(newErrors)
  }

  const handleAddPart = () => {
    setParts([...parts, { label: '', value: '' }])
    setErrors([...errors, '']) // Add a blank error for the new part
  }

  const handleRemovePart = (index) => {
    const newParts = parts.filter((_, i) => i !== index)
    const newErrors = errors.filter((_, i) => i !== index) // Remove the corresponding error
    setParts(newParts)
    setErrors(newErrors)
  }

  const handleSave = () => {
    // Check if any part has errors or empty fields
    const hasPartErrors = errors.some((error) => error !== '')
    const hasEmptyValues = parts.some(
      (part) => part.value === '' || part.label === ''
    )
    const isNameEmpty = name === ''

    // Check for errors and notify the user if found
    if (hasPartErrors || hasEmptyValues || nameError || isNameEmpty) {
      alert('Please fill all fields and fix any errors before saving.')
      return
    }

    onSave({ id: Date.now().toString(), name, parts })
    setName('')
    setParts([{ label: '', value: '' }])
    setErrors([]) // Reset the errors
    setNameError('') // Reset the name error
    onClose()
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)

    // Validate widget name (must not be empty and max 35 characters)
    if (value === '') {
      setNameError('Widget Name is required')
    } else if (value.length > 35) {
      setNameError('Widget Name must be 35 characters or less')
    } else {
      setNameError('')
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Widget Name"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleNameChange}
          error={Boolean(nameError)} // Show error if Widget Name is invalid
          helperText={nameError} // Display error message for Widget Name
        />
        {parts.map((part, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
          >
            <TextField
              margin="dense"
              label="Part Label"
              variant="standard"
              value={part.label}
              onChange={(e) => handlePartChange(index, 'label', e.target.value)}
              error={Boolean(errors[index] && errors[index].includes('Label'))} // Show error if label is empty or too long
              helperText={
                errors[index] && errors[index].includes('Label')
                  ? errors[index]
                  : ''
              } // Display error message for Part Label
              sx={{ marginRight: 2 }}
            />
            <TextField
              margin="dense"
              label="Part Value"
              variant="standard"
              value={part.value}
              onChange={(e) => handlePartChange(index, 'value', e.target.value)}
              error={Boolean(errors[index] && !errors[index].includes('Label'))} // Show error if value is not numeric or less than zero
              helperText={
                errors[index] && !errors[index].includes('Label')
                  ? errors[index]
                  : ''
              } // Display error message for Part Value
            />
            <IconButton
              onClick={() => handleRemovePart(index)}
              sx={{ marginLeft: 2 }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={handleAddPart}>
          Add Part
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WidgetDialog
