import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import Logo from './logo';
import { fontSizes, fontWeights, colors } from '../styles/theme.stylex';
import Button from './button';

const xl: XlMaxMediaQuery = '@media (max-width: 1280px)';
const sm: SmMaxMediaQuery = '@media (max-width: 640px)';

interface HeaderProps {
  currentPath: string;
}

const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header {...stylex.props(styles.header)}>
      <a href="/" aria-label="home/overview">
        <Logo />
      </a>
      <HeaderNav>
        <HeaderNavDrawer isOpen={isOpen}>
          <button
            type="button"
            aria-label="close menu"
            onClick={() => setIsOpen(false)}
            {...stylex.props(styles.close)}
          >
            <svg width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
          <HeaderNavLink href="/" currentPath={props.currentPath}>Overview</HeaderNavLink>
          <HeaderNavLink href="/blog/" currentPath={props.currentPath}>Blog</HeaderNavLink>
          {/* <HeaderNavLink href="#" currentPath={props.currentPath}>Support</HeaderNavLink> */}
          <HeaderNavLink href="/legal/" currentPath={props.currentPath}>Legal</HeaderNavLink>
          <HeaderNavLink href="https://app.budgetwarden.com/login" currentPath={props.currentPath}>Sign In</HeaderNavLink>
          <Button size="sm" fontSize={20} href="https://app.budgetwarden.com/sign-up">Sign Up</Button>
        </HeaderNavDrawer>
        <button
          type="button"
          aria-label="open menu"
          onClick={() => setIsOpen(true)}
          {...stylex.props(styles.hamburger)}
        >
          <svg width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        </button>
      </HeaderNav>
    </header>
  );
};

const HeaderNav = (props: GenericChildrenProps) => (
  <nav {...stylex.props(styles.nav)} aria-label="main navigation">
    {props.children}
  </nav>
);

interface HeaderNavDrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

const HeaderNavDrawer = (props: HeaderNavDrawerProps) => (
  <div {...stylex.props(styles.drawer, props.isOpen && styles.drawerOpen)}>
    {props.children}
  </div>
);

interface HeaderNavLinkProps {
  children: React.ReactNode;
  href: string;
  currentPath: string;
}

const HeaderNavLink = (props: HeaderNavLinkProps) => (
  <a href={props.href} {...stylex.props(styles.link, props.currentPath === props.href && styles.linkActive)} data-astro-prefetch>
    {props.children}
  </a>
);

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: {
      default: '1.666rem 0',
      [sm]: '0.833rem 0',
    }
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  link: {
    width: {
      default: 'fit-content',
      [xl]: '100%',
    },
    height: 'min-content',
    padding: '0.5rem 0',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    lineHeight: 1,
    textDecoration: 'none',
    color: colors.black,
    borderBottom: {
      default: '2px solid transparent',
      [xl]: 'none'
    },
    borderColor: {
      default: 'transparent',
      ':hover': colors.ash600,
      ':focus': colors.ash600,
    },
    outline: 'none',
  },
  linkActive: {
    borderColor: colors.ash600,
  },
  hamburger: {
    display: {
      default: 'none',
      [xl]: 'block',
    },
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  drawer: {
    display: 'flex',
    minWidth: '280px',
    zIndex: 3,
    transform: {
      default: 'none',
      [xl]: 'translateX(100%)',
    },
    opacity: {
      default: 1,
      [xl]: 0,
    },
    alignItems: {
      default: 'center',
      [xl]: 'flex-start',
    },
    gap: {
      default: '2rem',
      [xl]: '0.8rem',
    },
    position: {
      default: 'static',
      [xl]: 'fixed',
    },
    flexDirection: {
      default: 'row',
      [xl]: 'column',
    },
    top: 0,
    right: 0,
    bottom: 0,
    padding: {
      default: 0,
      [xl]: '2rem 1.3rem',
    },
    backgroundColor: {
      default: 'transparent',
      [xl]: colors.ash100,
    },
    boxShadow: {
      default: 'none',
      [xl]: '-0.5rem 0 2rem rgba(0, 0, 0, 0.1)',
    },
    transition: '.25s transform, .25s opacity',
  },
  drawerOpen: {
    opacity: 1,
    transform: 'translateX(0)',
  },
  close: {
    backgroundColor: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginBottom: '1rem',
    backgroundColor: 'transparent',
    display: {
      default: 'none',
      [xl]: 'block'
    }
  },
  navCta: {
    width: {
      default: 'none',
      [xl]: '100%',
    }
  }
});

export default Header;
