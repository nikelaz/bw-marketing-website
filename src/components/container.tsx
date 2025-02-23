import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    width: '100%',
    maxWidth: '1326px',
    margin: '0 auto',
    padding: '0 1.25rem',
  }
});

export const Container = (props: GenericChildrenProps) => (
  <div {...stylex.props(styles.container)}>
    {props.children}
  </div>
);
