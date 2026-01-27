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
  textarea: {
    padding: '0.75rem 1rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.regular,
    fontFamily: 'inherit',
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
    resize: 'vertical',
    minHeight: '120px',
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

interface TextareaProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: TextareaProps) => {
  const {
    label,
    name,
    required = false,
    placeholder,
    rows = 5,
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
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        {...stylex.props(styles.textarea, error ? styles.error : null)}
      />
      {error && <p {...stylex.props(styles.errorMessage)}>{error}</p>}
    </div>
  );
};

export default Textarea;
