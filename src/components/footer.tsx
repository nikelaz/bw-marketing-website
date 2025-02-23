import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
    alignItems: 'center',
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
  },
  link: {
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
      <FooterNavLink href="#">Blog</FooterNavLink>
      <FooterNavLink href="#">Support</FooterNavLink>
      <FooterNavLink href="#">Legal</FooterNavLink>
    </FooterNav>
  </footer>
);

const FooterNav = (props: GenericChildrenProps) => (
  <nav {...stylex.props(styles.nav)}>
    {props.children}
  </nav>
);

interface FooterNavLinkProps {
  children: React.ReactNode;
  href: string;
}

const FooterNavLink = (props: FooterNavLinkProps) => (
  <a href={props.href} {...stylex.props(styles.link)}>
    {props.children}
  </a>
);

export default Footer;
