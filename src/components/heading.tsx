import stylex from '@stylexjs/stylex';
import { fontSizes } from '../styles/theme.stylex';

const sm: SmMaxMediaQuery = '@media (max-width: 640px)';

interface HeadingProps {
  children: React.ReactNode;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 30 | 32 | 40;
  letterSpacing?: 'normal';
  fontWeight?: 'regular';
}

const Heading = (props: HeadingProps) => (
  <props.level
    {...stylex.props(
      styles.heading,
      styles[`size${props.size}`],
      props.letterSpacing && styles[props.letterSpacing],
      props.fontWeight && styles[props.fontWeight],
    )}
  >
    {props.children}
  </props.level>
);

const styles = stylex.create({
  heading: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  size30: {
    fontSize: {
      default: fontSizes['30'],
      [sm]: fontSizes['26'],
    }
  },
  size32: {
    fontSize: {
      default: fontSizes['32'],
      [sm]: fontSizes['28'],
    }
  },
  size40: {
    fontSize: {
      default: fontSizes['40'],
      [sm]: fontSizes['32'],
    }
  },
  normal: {
    letterSpacing: 'normal',
  },
  regular: {
    fontWeight: 400,
  }
});

export default Heading;
