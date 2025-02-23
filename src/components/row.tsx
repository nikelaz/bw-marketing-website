import stylex from '@stylexjs/stylex';

const gutter = 1.25;
const largeGutter = 3.333;

const styles = stylex.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: `${gutter}rem`,
    margin: `0 -${gutter / 2}rem`,
  },
  largeGutter: {
    rowGap: `${largeGutter}rem`,
    margin: `0 -${largeGutter / 2}rem`,
  },
  center: {
    justifyContent: 'center',
  }
});

interface RowProps {
  children: React.ReactNode;
  largeGutter?: boolean,
  align?: 'center',
}

export const Row = (props: RowProps) => (
  <div {...stylex.props(styles.row, props.largeGutter && styles.largeGutter, props.align && styles[props.align])}>
    {props.children}
  </div>
);
