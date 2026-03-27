import { useMediaQuery } from '@mui/material';

const useResponsive = () => {
  const isExtraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.between('lg', 'xl'));
  const isLargeDesktop = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  return { isExtraSmall, isMobile, isTablet, isDesktop, isLargeDesktop };
};

export default useResponsive;
