import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    color: colors.black,
  },
  required: {
    color: colors.prim,
  },
  selectWrapper: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.regular,
    color: colors.black,
    backgroundColor: colors.white,
    border: '2px solid',
    borderColor: {
      default: colors.ash300,
      ':focus': colors.prim,
    },
    borderRadius: '0.416rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    cursor: 'pointer',
    appearance: 'none',
  },
  chevron: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    fill: colors.ash600,
  },
  error: {
    borderColor: '#dc2626',
  },
  errorMessage: {
    fontSize: '0.875rem',
    color: '#dc2626',
    margin: 0,
  },
});

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
  const {
    label,
    name,
    options,
    required = false,
    placeholder = 'Select an option',
    value,
    error,
    onChange,
  } = props;

  return (
    <div {...stylex.props(styles.wrapper)}>
      <label htmlFor={name} {...stylex.props(styles.label)}>
        {label}
        {required && <span {...stylex.props(styles.required)}> *</span>}
      </label>
      <div {...stylex.props(styles.selectWrapper)}>
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          {...stylex.props(styles.select, error ? styles.error : null)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          {...stylex.props(styles.chevron)}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      {error && <p {...stylex.props(styles.errorMessage)}>{error}</p>}
    </div>
  );
};

export default Select;
