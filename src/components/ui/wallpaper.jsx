import { styled } from '@mui/material';
import TruckBg from '@/assets/truck-bg.jpg';

const path = TruckBg;
const Wallpaper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'absolute',
  width: '100%',
  backgroundImage: `url('${path}')`,
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

export default Wallpaper;
