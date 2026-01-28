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
    gap: '0.5rem',
  },
  categoryTitle: {
    margin: 0,
    marginBottom: '0.25rem',
    fontSize: '0.6rem',
    fontWeight: fontWeights.semibold,
    color: colors.ash900,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  articleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  articleLink: {
    display: 'block',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.regular,
    color: {
      default: colors.prim,
      ':hover': colors.primHover,
    },
    textDecoration: 'none',
    borderRadius: '0.25rem',
    transition: 'color 0.2s ease, background-color 0.2s ease',
  },
  articleLinkActive: {
    pointerEvents: 'none',
    color: colors.black,
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
