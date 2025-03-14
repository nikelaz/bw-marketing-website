import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  button: {
    display: 'inline-block',
    width: 'fit-content',
    padding: '0.8rem 2.5rem',
    fontSize: fontSizes['24'],
    fontWeight: fontWeights.medium,
    textDecoration: 'none',
    color: colors.white,
    backgroundColor: {
      default: colors.prim,
      ':hover': colors.primHover,
      ':focus': colors.primHover,
    },
    borderRadius: '0.416rem',
    transition: '.2s background-color',
    outline: 'none',
    textBox: 'trim-both cap alphabetic',
  },
  sm: {
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    fontSize: fontSizes['20'],
  },
  fs20: {
    fontSize: fontSizes['20'],
  }
});

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  size?: 'sm';
  fontSize?: 20;
}

const Button = (props: ButtonProps) => (
  <a
    href={props.href}
    {...stylex.props(styles.button, props.size && styles[props.size], props.fontSize && styles[`fs${props.fontSize}`])}
  >
    {props.children}
  </a>
);

export default Button;
