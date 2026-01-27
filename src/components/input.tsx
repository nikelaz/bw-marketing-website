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
  input: {
    padding: '0.75rem 1rem',
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
    '::placeholder': {
      color: colors.ash600,
    },
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

interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    label,
    name,
    type = 'text',
    required = false,
    placeholder,
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
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...stylex.props(styles.input, error ? styles.error : null)}
      />
      {error && <p {...stylex.props(styles.errorMessage)}>{error}</p>}
    </div>
  );
};

export default Input;
