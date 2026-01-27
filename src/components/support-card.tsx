import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: colors.ash100,
    borderRadius: '0.5rem',
    textDecoration: 'none',
    color: colors.black,
    border: '2px solid transparent',
    borderColor: {
      default: 'transparent',
      ':hover': colors.prim,
      ':focus': colors.prim,
    },
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    transform: {
      default: 'none',
      ':hover': 'translateY(-2px)',
    },
    outline: 'none',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3.5rem',
    height: '3.5rem',
    backgroundColor: colors.prim,
    borderRadius: '0.5rem',
  },
  title: {
    margin: 0,
    fontSize: fontSizes['30'],
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  description: {
    margin: 0,
    fontSize: fontSizes['22'],
    color: colors.ash900,
    lineHeight: 1.5,
  },
  arrow: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    color: colors.prim,
  },
});

const icons = {
  ticket: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/>
    </svg>
  ),
  book: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
  ),
};

type IconType = keyof typeof icons;

interface SupportCardProps {
  title: string;
  description: string;
  href: string;
  iconType: IconType;
}

const SupportCard = (props: SupportCardProps) => {
  const { title, description, href, iconType } = props;

  return (
    <a href={href} {...stylex.props(styles.card)} data-astro-prefetch>
      <div {...stylex.props(styles.iconWrapper)}>
        {icons[iconType]}
      </div>
      <h2 {...stylex.props(styles.title)}>{title}</h2>
      <p {...stylex.props(styles.description)}>{description}</p>
      <span {...stylex.props(styles.arrow)}>
        Learn more
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  );
};

export default SupportCard;
