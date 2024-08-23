import { Box, CircularProgress } from '@mui/material'
import React from 'react'


function Loader() {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", color: "#25a98e" }}>
            <CircularProgress />
        </Box>
    )
}

export default Loader