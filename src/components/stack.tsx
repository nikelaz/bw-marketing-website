import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
  },
  sm: {
    gap: '0.833rem',
  },
  md: {
    gap: '1.666rem',
  },
  lg: {
    gap: '2.5rem',
  },
  xl: {
    gap: '3.333rem',
  },
  jCenter: {
    justifyContent: 'center',
  },
  aCenter: {
    alignItems: 'center',
  },
});

interface StackProps {
  children: React.ReactNode;
  gap: 'sm' | 'md' | 'lg' | 'xl';
  justify?: 'center';
  align?: 'center';
}

const Stack = (props: StackProps) => (
  <div {...stylex.props(
    styles.stack,
    styles[props.gap],
    props.justify === 'center' && styles.jCenter,
    props.align === 'center' && styles.aCenter
  )}>
    {props.children}
  </div>
);

export default Stack;
