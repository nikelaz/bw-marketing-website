import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    height: '100%',
    backgroundColor: colors.ash100,
    borderRadius: '0.5rem',
    textDecoration: 'none',
    color: colors.black,
    transition: '.2s outline',
    outline: {
      default: '1px solid',
      ':hover': '7px solid'
    },
    outlineColor: colors.ash100,
  },
  iconWrapper: {
    color: colors.prim,
  },
  title: {
    margin: 0,
    fontSize: fontSizes['30'],
    fontWeight: fontWeights.bold,
    color: colors.prim,
  },
  description: {
    margin: 0,
    fontSize: fontSizes['22'],
    color: colors.ash900,
    lineHeight: 1.5,
  }
});

const icons = {
  ticket: (
    <svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 640 640">
      <path fill="currentColor" d="M320 97.9L128.4 239.8L286.5 357C291.8 360.9 297.7 363.9 304 365.7L304 528C304 533.5 304.5 538.8 305.3 544L128 544C92.7 544 64 515.3 64 480L64 240.1C64 219.8 73.6 200.7 89.9 188.7L286.5 43C296.2 35.8 307.9 32 320 32C332.1 32 343.8 35.9 353.5 43L550.1 188.7C557.3 194 563.2 200.7 567.5 208.3C565 208.1 562.5 208 560 208L468.6 208L320 97.9zM352 304C352 277.5 373.5 256 400 256L560 256C586.5 256 608 277.5 608 304L608 528C608 554.5 586.5 576 560 576L400 576C373.5 576 352 554.5 352 528L352 304zM432 320C418.7 320 408 330.7 408 344C408 357.3 418.7 368 432 368L528 368C541.3 368 552 357.3 552 344C552 330.7 541.3 320 528 320L432 320zM432 416C418.7 416 408 426.7 408 440C408 453.3 418.7 464 432 464L488 464C501.3 464 512 453.3 512 440C512 426.7 501.3 416 488 416L432 416z"/>
    </svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 640 640">
      <path fill="currentColor" d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z"/>
    </svg>
  ),
};

type IconType = keyof typeof icons;

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  iconType: IconType;
  target?: string;
}

const LinkCard = (props: LinkCardProps) => {
  const { title, description, href, iconType, target } = props;

  return (
    <a href={href} target={target} {...stylex.props(styles.card)} data-astro-prefetch>
      <div {...stylex.props(styles.iconWrapper)}>
        {icons[iconType]}
      </div>
      <h2 {...stylex.props(styles.title)}>{title}</h2>
      <p {...stylex.props(styles.description)}>{description}</p>
    </a>
  );
};

export default LinkCard;
