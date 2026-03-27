import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { act } from 'react';

let mockOnChange: (value: Dayjs | null) => void = () => {};
let mockOnAccept: (value: Dayjs | null) => void = () => {};

jest.mock('@mui/x-date-pickers/DatePicker', () => {
  const MockDatePicker = (props: {
    onChange: (value: Dayjs | null) => void;
    onAccept: (value: Dayjs | null) => void;
    value: Dayjs | null;
    label: string;
  }) => {
    mockOnChange = props.onChange;
    mockOnAccept = props.onAccept;
    return (
      <input
        data-testid={`mock-dpicker-${props.label}`}
        value={props.value?.toISOString() ?? ''}
        aria-label={props.label}
        readOnly
      />
    );
  };
  MockDatePicker.displayName = 'MockDatePicker';
  return { DatePicker: MockDatePicker };
});

describe('DatePicker', () => {
  const label = 'Test DatePicker';
  const helperText = 'This is a helper text';
  const errorMessage = 'This is an error message';

  beforeEach(() => {
    mockOnChange = () => {};
    mockOnAccept = () => {};
  });

  test('shows helper text when provided', () => {
    render(<DatePicker label={label} value={null} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  test('shows error message when provided', () => {
    render(<DatePicker label={label} value={null} errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('shows value when provided and updates when prop changes', () => {
    const today = dayjs('2025-04-27');
    const tomorrow = dayjs('2025-04-28');
    const { rerender } = render(<DatePicker label={label} value={today} />);

    expect(screen.getByLabelText(label)).toHaveValue(today.toISOString());

    rerender(<DatePicker label={label} value={tomorrow} />);
    expect(screen.getByLabelText(label)).toHaveValue(tomorrow.toISOString());
  });

  test('internal handleChange is called and updates value', () => {
    const today = dayjs('2025-04-27');
    render(<DatePicker label={label} value={null} />);

    act(() => {
      mockOnChange(today);
    });

    expect(screen.getByLabelText(label)).toHaveValue(today.toISOString());
  });

  test('internal handleChange calls onChange prop when errorMessage is present', () => {
    const handleChangeProp = jest.fn();
    const today = dayjs('2025-04-27');
    render(
      <DatePicker
        label={label}
        value={null}
        onChange={handleChangeProp}
        errorMessage={errorMessage}
      />
    );

    act(() => {
      mockOnChange(today);
    });

    expect(handleChangeProp).toHaveBeenCalledWith(today);
  });

  test('internal handleChange does NOT call onChange prop without errorMessage', () => {
    const handleChangeProp = jest.fn();
    const today = dayjs('2025-04-27');
    render(<DatePicker label={label} value={null} onChange={handleChangeProp} />);

    act(() => {
      mockOnChange(today);
    });

    expect(handleChangeProp).not.toHaveBeenCalled();
  });

  test('internal handleAccept calls onChange prop', () => {
    const handleChangeProp = jest.fn();
    const today = dayjs('2025-04-27');
    render(<DatePicker label={label} value={null} onChange={handleChangeProp} />);

    act(() => {
      mockOnAccept(today);
    });

    expect(handleChangeProp).toHaveBeenCalledWith(today);
  });

  test('renders nothing for helper/error text if not provided', () => {
    render(<DatePicker label={label} value={null} />);
    expect(screen.queryByText(helperText)).not.toBeInTheDocument();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
