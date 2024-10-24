import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme } from '@mui/material/styles';


const ModeSelect = () => {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
      return null;
    }
    return (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
            minHeight: '56px',
          }}
        >
          <Select value={mode} onChange={(event) => setMode(event.target.value)}>
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </Box>
      )
}

export default ModeSelect