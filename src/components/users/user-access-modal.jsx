import { useState } from 'react';
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import { insertOrUpdateUserAccess } from '@services/users-service';
import toast, { Toaster } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

const UserAccessModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      wiw: '',
      role: '',
      submit: null,
    },
    validationSchema: Yup.object({
      wiw: Yup.string().max(8).required('Wiw es requerido'),
      role: Yup.string().max(20).required('Role es requerido'),
    }),
    onSubmit: (values, helpers) => {
      try {
        insertUserAccess.mutate({ wiw: values.wiw, idRol: values.role, custom: '' });
        helpers.setSubmitting(false);
      } catch (error) {
        const errorMessage = error.message || 'Error al enviar el formulario, intente de nuevo';
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: errorMessage });
        helpers.setSubmitting(false);
      }
    },
  });

  const insertUserAccess = useMutation({
    mutationKey: ['InsertOrUpdateUserAccess'],
    mutationFn: insertOrUpdateUserAccess,
    onSuccess: (data) => {
      if (data.status != 'Success') throw new Error(data.status);
      toast.success('Usuario actualizado');
      handleClose();
    },
    onError: (error) => {
      toast.error('Error al actualizar el usuario ' + error.message);
    },
  });

  return (
    <>
      <Tooltip title='Add new User'>
        <SvgIcon fontSize='small' sx={{ cursor: 'pointer' }} as={SaveIcon} onClick={handleOpen} />
      </Tooltip>
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Stack sx={style} rowGap={1}>
            <Typography variant='h5'>Add User</Typography>
            <hr style={{ width: '100%' }} />
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
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    label='Rol'
                    type='text'
                    name='role'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <MenuItem value='' disabled>
                      Selecciona un rol
                    </MenuItem>
                    <MenuItem value='0'>User</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              {formik.errors.submit && (
                <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size='large' sx={{ mt: 3 }} type='submit' variant='contained'>
                Continuar
              </Button>
            </form>
          </Stack>
        </Fade>
      </Modal>
    </>
  );
};

export default UserAccessModal;
