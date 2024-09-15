import React from 'react'
import { Paper, Typography, Box, IconButton, Tooltip } from '@mui/material'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  BarElement,
  LineElement,
} from 'chart.js'
import { Delete as DeleteIcon } from '@mui/icons-material'
ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  BarElement,
  LineElement
)

const Widget = ({ title, parts, onRemove, categoryId }) => {
  const labels = parts.map((part) => part.label)
  const values = parts.map((part) => part.value)
  const colors = [
    '#FF6384',
    '#FFCE56',
    '#36A2EB',
    '#A133FF',
    '#CFCFCF',
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#33FFA1',
    '#FF8C33',
    '#33FF8C',
    '#8C33FF',
    '#FF338C',
    '#338CFF',
    '#A1FF33',
    '#5733FF',
    '#FF5733',
    '#33FF8C',
    '#8CFF33',
    '#5733A1',
    '#33A1FF',
    '#A1FF8C',
    '#33FFA1',
    '#FF33FF',
    '#FF338C',
    '#FF5733',
    '#338CFF',
    '#33FFA1',
    '#A133FF',
    '#FFA133',
    '#33A1FF',
    '#5733FF',
    '#8CFF33',
    '#FF5733',
    '#33FF8C',
    '#33A1FF',
    '#A1FF33',
    '#FF33A1',
    '#338CFF',
    '#5733A1',
    '#33FFA1',
    '#FF33FF',
    '#A1FF8C',
    '#33FFA1',
    '#FF5733',
    '#33FF57',
    '#8C33FF',
    '#FF8C33',
    '#33FF8C',
    '#33FFA1',
    '#FF33FF',
    '#33A1FF',
  ]

  const totalValue = values.reduce((acc, value) => acc + Number(value), 0)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, values.length),
        hoverBackgroundColor: colors.slice(0, values.length),
        borderWidth: 2,
      },
    ],
  }

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  }
  const handleDelete = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this widget?'
    )
    if (confirmation) {
      onRemove() // Call the delete function if the user confirms
    }
  }

  const renderChart = () => {
    if (categoryId === 'cspm_dashboard') {
      return (
        <React.Fragment>
          <Doughnut data={data} options={options} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              overflow: 'hidden',
              maxWidth: '50%',
            }}
          >
            <Tooltip title={totalValue} arrow>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {totalValue}
              </Typography>
            </Tooltip>
            <Typography variant="body2" color="textSecondary">
              Total
            </Typography>
          </Box>
        </React.Fragment>
      )
    } else if (
      categoryId === 'registry_scan' ||
      categoryId === 'cwpp_dashboard'
    ) {
      return (
        <React.Fragment>
          <Box
            sx={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              {categoryId === 'registry_scan' ? (
                <Line data={data} options={options} />
              ) : (
                <Bar data={data} options={options} />
              )}
            </Box>
            <Box
              sx={{
                overflow: 'hidden',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Typography variant="body1" color="textSecondary">
                Total:&nbsp;
              </Typography>
              <Tooltip title={totalValue} arrow>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {totalValue}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </React.Fragment>
      )
    }
    return null
  }

  return (
    <Paper
      elevation={3}
      sx={{
        px: '15px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
        width: '100%',
        maxWidth: '350px',
        height: '230px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '20%',
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflow: 'hidden',
            lineHeight: '1.2',
            textOverflow: 'clip',
          }}
        >
          {title}
        </Typography>

        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '95%',
          height: '80%',
          overflow: 'hidden',
        }}
      >
        {totalValue > 0 ? (
          <Box
            sx={{
              width: '55%',
              height: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {renderChart()}
          </Box>
        ) : (
          <Box
            sx={{
              width: '55%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                py: 8,
                whiteSpace: 'nowrap',
              }}
            >
              No Graph Available
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="body1" color="textSecondary">
                Total:&nbsp;
              </Typography>
              <Tooltip title={totalValue} arrow>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {totalValue}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'start',
            overflowY: 'auto',
            maxHeight: '140px',
            gap: 0.5,
            width: '45%',
            paddingLeft: '20px',
          }}
        >
          {parts.map((part, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  minWidth: '10px',
                  minHeight: '10px',
                  backgroundColor: colors[index],
                  marginRight: '10px',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              ></Box>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography variant="body2">
                      {part.label} ({part.value})
                    </Typography>
                  </React.Fragment>
                }
                arrow
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {part.label} ({part.value})
                </Typography>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default Widget
