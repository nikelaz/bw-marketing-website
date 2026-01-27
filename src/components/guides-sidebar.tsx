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
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  categoryTitle: {
    margin: 0,
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  chevron: {
    transition: 'transform 0.2s ease',
    flexShrink: 0,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  articleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    paddingLeft: '0.75rem',
    borderLeft: '2px solid',
    borderLeftColor: colors.ash200,
    marginLeft: '0.25rem',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    maxHeight: 0,
    opacity: 0,
  },
  articleListOpen: {
    maxHeight: '500px',
    opacity: 1,
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

import { useState } from 'react';

const GuidesSidebar = (props: GuidesSidebarProps) => {
  const { categories, currentSlug } = props;
  
  // Find which category contains the current article and open it by default
  const currentCategory = categories.find(cat => 
    cat.articles.some(article => article.id === currentSlug)
  );
  
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(currentCategory ? [currentCategory.name] : [categories[0]?.name])
  );

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <nav {...stylex.props(styles.sidebar)} aria-label="User guides navigation">
      <a href="/support" {...stylex.props(styles.backLink)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Support
      </a>
      
      {categories.map((category) => {
        const isOpen = openCategories.has(category.name);
        
        return (
          <div key={category.name} {...stylex.props(styles.category)}>
            <button
              type="button"
              onClick={() => toggleCategory(category.name)}
              aria-expanded={isOpen}
              {...stylex.props(styles.categoryHeader)}
            >
              <span {...stylex.props(styles.categoryTitle)}>{category.name}</span>
              <svg
                {...stylex.props(styles.chevron, isOpen ? styles.chevronOpen : null)}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div {...stylex.props(styles.articleList, isOpen ? styles.articleListOpen : null)}>
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
        );
      })}
    </nav>
  );
};

export default GuidesSidebar;
