import {
  type Dispatch,
  type FC,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  cloneElement,
  useState
} from 'react';
import Popover, { type PopoverProps } from '@mui/material/Popover';
import { IconButton } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { COLORS } from '../../theme/theme';

interface CustomPopoverProps extends Omit<PopoverProps, 'open' | 'children'> {
  children:
    | ReactNode
    | ((handleClose: (e: Event, reason: 'backdropClick' | 'escapeKeyDown') => void) => ReactNode);
  trigger?: ReactElement;
  iconStyle?: object;
  openPopover?: boolean;
  showCloseIcon?: boolean;
  setIsPopoverOpen?: Dispatch<SetStateAction<boolean>>;
  horizontalPosition?: 'left' | 'right';
}

const CustomPopover: FC<CustomPopoverProps> = ({
  children,
  trigger,
  iconStyle,
  horizontalPosition,
  showCloseIcon = false,
  setIsPopoverOpen,
  transitionDuration = 0,
  onClose,
  openPopover,
  ...props
  // eslint-disable-next-line complexity
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>('bottom');
  const open = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    if (spaceBelow < 310) {
      setPopoverPosition('top');
    } else {
      setPopoverPosition('bottom');
    }
    setIsPopoverOpen?.(true);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: Event, reason: 'backdropClick' | 'escapeKeyDown') => {
    setIsPopoverOpen?.(false);
    setAnchorEl(null);
    onClose?.(e, reason);
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(handleClose);
    }
    return children;
  };

  const popoverTrigger = trigger ? (
    cloneElement(trigger, {
      // @ts-expect-error: onClick is throwing error with React 19
      onClick: handleOpen,
      'aria-expanded': open,
      'aria-haspopup': true
    })
  ) : (
    <IconButton
      sx={{ color: COLORS.black, padding: '0px', ...iconStyle }}
      onClick={handleOpen}
      aria-expanded={open}
      aria-haspopup={true}
      data-testid='popover-icon'
    >
      {open ? (
        <KeyboardArrowUpOutlinedIcon fontSize='small' />
      ) : (
        <KeyboardArrowDownOutlinedIcon fontSize='small' />
      )}
    </IconButton>
  );

  const getVerticalAnchorOrigin = (position: 'top' | 'bottom') =>
    position === 'bottom' ? 'bottom' : 'top';
  const getVerticalTransformOrigin = (position: 'top' | 'bottom') =>
    position === 'bottom' ? 'top' : 'bottom';

  return (
    <>
      {popoverTrigger}
      <Popover
        open={openPopover === undefined ? open : open && openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: getVerticalAnchorOrigin(popoverPosition),
          horizontal: horizontalPosition ? horizontalPosition : 'right'
        }}
        transformOrigin={{
          vertical: getVerticalTransformOrigin(popoverPosition),
          horizontal: 'right'
        }}
        role='dialog'
        aria-describedby='popover-content'
        aria-live='polite'
        sx={{
          overflow: 'auto',
          ...props.sx
        }}
        transitionDuration={transitionDuration}
        {...props}
      >
        <div id='popover-content'>
          {showCloseIcon ? (
            <CloseRoundedIcon
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#eee',
                  borderRadius: '50%'
                }
              }}
              onClick={(e) => {
                handleClose(e as unknown as Event, 'escapeKeyDown');
              }}
              aria-label='close'
            />
          ) : null}
          {renderChildren()}
        </div>
      </Popover>
    </>
  );
};

CustomPopover.displayName = 'CustomPopover';
export default CustomPopover;
