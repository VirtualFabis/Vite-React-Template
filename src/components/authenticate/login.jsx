import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@hooks/use-auth';
import { doLogin } from '@services/users-service';
import Wallpaper from '@components/ui/wallpaper';
import { convertKeysToLowerCase } from '@utils/case-converters';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('wiw');
  const setCurrentUser = useAuth((state) => state.setCurrentUser);

  const doLoginMutation = useMutation({ mutationFn: doLogin });
  const formik = useFormik({
    initialValues: {
      wiw: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      wiw: Yup.string().max(8).required('Wiw es requerido'),
      password: Yup.string().max(255).required('Contraseña es requerido'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        let user = await doLoginMutation.mutateAsync(values);
        user = convertKeysToLowerCase(user);
        validateStatus(user);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        setCurrentUser(user);
        navigate({ to: '/dashboard/first' });
      } catch (error) {
        const errorMessage = error.message || 'Error al enviar el formulario, intente de nuevo';
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: errorMessage });
        helpers.setSubmitting(false);
      }
    },
  });
  const validateStatus = (user) => {
    if (!user || typeof user.status !== 'string') {
      throw new Error('Objeto o estado de usuario no válido.');
    }

    if (user.status !== 'DONE') {
      throw new Error(`Error inesperado: ${user.status}`);
    }
  };

  const handleMethodChange = useCallback((_, value) => setMethod(value), []);

  const handleSkip = () => navigate({ to: '/dashboard/first' });

  return (
    <Wallpaper>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            maxWidth: 550,
            px: 3,
            py: '40px',
            maxHeight: 600,
            width: '100%',
            height: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant='h4'>Inicio de sesión</Typography>
              <Typography color='text.secondary' variant='body2'>
                Usa tu WIW y tu Password de ShopTech
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label='Who is Who' value='wiw' />
            </Tabs>
            {method === 'wiw' && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.wiw && formik.errors.wiw)}
                    fullWidth
                    helperText={formik.touched.wiw && formik.errors.wiw}
                    label='Who is Who'
                    name='wiw'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.wiw}
                    type='text'
                    autoComplete='current'
                  />
                  <TextField
                    fullWidth
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    label='Password'
                    name='password'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='password'
                    autoComplete='current-password'
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>Opcional puedes saltarlo.</FormHelperText>
                {formik.errors.submit && (
                  <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size='large'
                  sx={{ mt: 3 }}
                  disabled={doLoginMutation.isPending}
                  type='submit'
                  variant='contained'
                >
                  {doLoginMutation.isPending && <CircularProgress size={25} />}
                  Continuar
                </Button>
                <Button
                  fullWidth
                  size='large'
                  sx={{ mt: 3 }}
                  disabled={doLoginMutation.isPending}
                  onClick={handleSkip}
                >
                  {doLoginMutation.isPending && <CircularProgress size={25} />}
                  Saltar Autentificación, (Solo vistas publicas)
                </Button>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </Wallpaper>
  );
};

export default Login;
