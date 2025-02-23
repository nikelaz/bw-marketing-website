import stylex from '@stylexjs/stylex';
import { colors } from '../styles/theme.stylex';

const styles = stylex.create({
  anchor: {
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    transition: '.2s color',
  },
  noDecoration: {
    textDecoration: 'none',
  },
});

interface AnchorProps {
  children: React.ReactNode;
  href: string;
  textDecoration?: 'none';
}

const Aspect = (props: AnchorProps) => (
  <a href={props.href} {...stylex.props(styles.anchor, props.textDecoration && styles.noDecoration)}>
    {props.children}
  </a>
);

export default Aspect;
