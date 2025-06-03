import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Link, useParams } from '@tanstack/react-router';
import Error401 from '@/assets/error-401.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { typesErrors } from '@utils/constants';

export default function AccessDenied() {
  const params = useParams({ from: '/dashboard/access-denied/$typeError' });
  const { title, message } = typesErrors[params.typeError];
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
              src={Error401}
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
              startIcon={<SvgIcon fontSize='small' as={ArrowBackIcon} />}
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
