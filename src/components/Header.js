import React from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Header = ({ onSearch, searchQuery }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #fff',
            borderRadius: 3,
            px: 1,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search Widgets…"
            value={searchQuery} 
            onChange={(e) => onSearch(e.target.value)}
            sx={{
              color: 'white',
              '& .MuiInputBase-input': {
                padding: '8px',
                paddingLeft: '18px',
                width: '250px',
                transition: 'width 0.4s',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
