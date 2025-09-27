import stylex from '@stylexjs/stylex';
import { colors } from '../styles/theme.stylex.ts';

const styles = stylex.create({
  figure: {
    padding: '1rem',
    borderRadius: '0.416rem',
    backgroundColor: colors.ash100,
  },
});

interface FigureProps {
  children: React.ReactNode;
  borderRadius?: string;
}

const Figure = (props: FigureProps) => (
  <div {...stylex.props(styles.figure)} style={{ borderRadius: props.borderRadius }}>
    {props.children}
  </div>
);

export default Figure;
