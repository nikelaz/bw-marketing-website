import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.666rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.25rem',
    borderRadius: '0.416rem',
    backgroundColor: colors.ash100,
  },
  heading: {
    fontSize: fontSizes['30'],
    fontWeight: fontWeights.bold,
  },
  link: {
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    textDecoration: 'none',
    transition: '.2s color',
  },
  description: {
    margin: 0,
    fontSize: fontSizes['26'],
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  }
});

export const Card = (props: GenericChildrenProps) => (
  <article {...stylex.props(styles.card)}>
    {props.children}
  </article>
);

export const CardHeader = (props: GenericChildrenProps) => (
  <header {...stylex.props(styles.header)}>
    {props.children}
  </header>
);

export const CardFooter = (props: GenericChildrenProps) => (
  <footer {...stylex.props(styles.footer)}>
    {props.children}
  </footer>
);
