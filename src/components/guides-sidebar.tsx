import stylex from '@stylexjs/stylex';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const lg: LgMaxMediaQuery = '@media (max-width: 1024px)';

const styles = stylex.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: {
      default: 'sticky',
      [lg]: 'static',
    },
    top: '2rem',
    maxHeight: {
      default: 'calc(100vh - 4rem)',
      [lg]: 'none',
    },
    overflowY: {
      default: 'auto',
      [lg]: 'visible',
    },
    paddingRight: '1rem',
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  categoryTitle: {
    margin: 0,
    marginBottom: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: fontWeights.semibold,
    color: colors.ash600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  articleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    paddingLeft: '0.75rem',
    borderLeft: '2px solid',
    borderLeftColor: colors.ash200,
    marginLeft: '0.25rem',
  },
  articleLink: {
    display: 'block',
    padding: '0.5rem 0.75rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.regular,
    color: {
      default: colors.ash900,
      ':hover': colors.prim,
    },
    textDecoration: 'none',
    borderRadius: '0.25rem',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.ash100,
    },
  },
  articleLinkActive: {
    color: colors.prim,
    fontWeight: fontWeights.semibold,
    backgroundColor: colors.ash100,
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    textDecoration: 'none',
    padding: '0.5rem 0',
    marginBottom: '0.5rem',
  },
});

interface Article {
  id: string;
  title: string;
  category: string;
  order: number;
}

interface CategoryGroup {
  name: string;
  articles: Article[];
}

interface GuidesSidebarProps {
  categories: CategoryGroup[];
  currentSlug?: string;
}

const GuidesSidebar = (props: GuidesSidebarProps) => {
  const { categories, currentSlug } = props;

  return (
    <nav {...stylex.props(styles.sidebar)} aria-label="User guides navigation">
      <a href="/support" {...stylex.props(styles.backLink)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Support
      </a>
      
      {categories.map((category) => (
        <div key={category.name} {...stylex.props(styles.category)}>
          <span {...stylex.props(styles.categoryTitle)}>{category.name}</span>
          <div {...stylex.props(styles.articleList)}>
            {category.articles
              .sort((a, b) => a.order - b.order)
              .map((article) => (
                <a
                  key={article.id}
                  href={`/support/guides/${article.id}`}
                  {...stylex.props(
                    styles.articleLink,
                    currentSlug === article.id ? styles.articleLinkActive : null
                  )}
                >
                  {article.title}
                </a>
              ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default GuidesSidebar;
