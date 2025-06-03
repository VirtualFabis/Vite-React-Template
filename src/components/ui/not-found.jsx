import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from '@tanstack/react-router';
import Error404 from '@/assets/error-404.png';
import { typesErrors, typesErrorsKeys } from '@utils/constants';

export default function NotFound() {
  const { title, message } = typesErrors[typesErrorsKeys.NotFound];

  return (
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center',
            }}
          >
            <img
              alt='Under development'
              src={Error404}
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography align='center' sx={{ mb: 3 }} variant='h3'>
            {title}
          </Typography>
          <Typography align='center' color='text.secondary' variant='body1'>
            {message}
          </Typography>
          <Link to='/'>
            <Button
              startIcon={
                <SvgIcon fontSize='small'>
                  <ArrowBackIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant='contained'
            >
              Regresa al Inicio de sesión
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
