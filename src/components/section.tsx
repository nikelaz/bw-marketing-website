import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  section: {
    padding: '2.5rem 0',
    overflow: 'hidden',
  }
});

const Section = (props: GenericChildrenProps) => (
  <section {...stylex.props(styles.section)}>
    {props.children}
  </section>
);

export default Section;
