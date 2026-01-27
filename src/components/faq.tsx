import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  item: {
    borderBottom: '1px solid',
    borderBottomColor: colors.ash300,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1.25rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  question: {
    margin: 0,
    fontSize: fontSizes['24'],
    fontWeight: fontWeights.semibold,
    color: colors.black,
    paddingRight: '1rem',
  },
  chevron: {
    flexShrink: 0,
    transition: 'transform 0.2s ease',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  answer: {
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
    maxHeight: 0,
    opacity: 0,
    paddingBottom: 0,
  },
  answerOpen: {
    maxHeight: '500px',
    opacity: 1,
    paddingBottom: '1.25rem',
  },
  answerText: {
    margin: 0,
    fontSize: fontSizes['22'],
    color: colors.ash900,
    lineHeight: 1.6,
  },
});

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = (props: FAQProps) => {
  const { items } = props;

  return (
    <div {...stylex.props(styles.container)}>
      {items.map((item, index) => (
        <FAQAccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

interface FAQAccordionItemProps {
  question: string;
  answer: string;
}

const FAQAccordionItem = (props: FAQAccordionItemProps) => {
  const { question, answer } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div {...stylex.props(styles.item)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        {...stylex.props(styles.button)}
      >
        <span {...stylex.props(styles.question)}>{question}</span>
        <svg
          {...stylex.props(styles.chevron, isOpen ? styles.chevronOpen : null)}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div {...stylex.props(styles.answer, isOpen ? styles.answerOpen : null)}>
        <p {...stylex.props(styles.answerText)}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
