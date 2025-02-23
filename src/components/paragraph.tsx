import stylex from '@stylexjs/stylex';
import { fontSizes } from '../styles/theme.stylex';

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: 26 | 28;
}

const Paragraph = (props: ParagraphProps) => (
  <p {...stylex.props(styles.p, props.fontSize && styles[`fs${props.fontSize}`])}>
    {props.children}
  </p>
);

const styles = stylex.create({
  p: {
    margin: 0,
    lineHeight: 1.5,
  },
  fs26: {
    fontSize: fontSizes['26'],
  },
  fs28: {
    fontSize: fontSizes['28'],
  },
});

export default Paragraph;
