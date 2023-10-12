import { ReactNode } from 'react';
import { Grid, Box } from '@mui/material';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      sx={{ p: 2 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <main>
        <Box
          sx={{
            padding: 2,
            width: '350px',
            marginTop: 2,
          }}
        >
          {children}
        </Box>
      </main>
    </Grid>
  );
};

export default AuthLayout;
