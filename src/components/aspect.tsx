import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  aspect: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '16 / 9',    
  },
});

interface AspectProps {
  children: React.ReactNode;
}

const Aspect = (props: AspectProps) => (
  <div {...stylex.props(styles.aspect)}>
    {props.children}
  </div>
);

export default Aspect;
