import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/theme.stylex';

const sm: SmMaxMediaQuery = '@media (max-width: 640px)';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const styles = stylex.create({
  nav: {
    display: {
      default: 'flex',
      [sm]: 'none',
    },
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
  },
  link: {
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    textDecoration: 'none',
    transition: '.2s color',
  },
  separator: {
    color: colors.ash600,
  },
  current: {
    color: colors.black,
  },
});

const Breadcrumb = (props: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" {...stylex.props(styles.nav)}>
    {props.items.map((item, index) => (
      <span key={item.label}>
        {index > 0 && <span {...stylex.props(styles.separator)}> / </span>}
        {item.href ? (
          <a href={item.href} {...stylex.props(styles.link)} data-astro-prefetch>
            {item.label}
          </a>
        ) : (
          <span {...stylex.props(styles.current)}>{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
