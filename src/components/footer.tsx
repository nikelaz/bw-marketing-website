import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '2.5rem 0',
    borderTop: '1px solid',
    borderTopColor: colors.ash600,
  },
  copy: {
    margin: 0,
    fontSize: fontSizes['20'],
  },
  nav: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    display: 'block',
    cursor: 'pointer',
    padding: 0,
    border: 'none',
    lineHeight: 1,
    background: 'transparent',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    textDecoration: 'none',
  }
});

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer {...stylex.props(styles.footer)}>
    <p {...stylex.props(styles.copy)}>© Budget Warden {currentYear}</p>
    <FooterNav>
      <button type="button" data-cc="show-preferencesModal" {...stylex.props(styles.link)}>Cookie Preferences</button>
      <FooterNavLink href="https://stats.uptimerobot.com/uhjAiQS2xR" target="_blank">Systems Status</FooterNavLink>
      <FooterNavLink href="/blog">Blog</FooterNavLink>
      {/* <FooterNavLink href="#">Support</FooterNavLink> */}
      <FooterNavLink href="/legal">Legal</FooterNavLink>
    </FooterNav>
  </footer>
);

const FooterNav = (props: GenericChildrenProps) => (
  <nav {...stylex.props(styles.nav)} aria-label="footer navigation">
    {props.children}
  </nav>
);

interface FooterNavLinkProps {
  children: React.ReactNode;
  href: string;
  target?: '_blank';
}

const FooterNavLink = (props: FooterNavLinkProps) => (
  <a href={props.href} {...stylex.props(styles.link)} data-astro-prefetch target={props.target} rel={props.target ? 'noopener noreferrer' : undefined}>
    {props.children}
  </a>
);

export default Footer;
