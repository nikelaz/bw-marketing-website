import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { colors } from '../styles/theme.stylex';

type TabItem = {
  label: string,
  id: string,
}

interface TabsProps {
  tabs: TabItem[];
}

const styles = stylex.create({
  tabs: {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'row',
    backgroundColor: colors.ash100,
    borderRadius: '5rem',
    padding: '0.1rem',
  },
  tab: {
    background: 'none',
    appearance: 'none',
    border: 'none',
    outline: 'none',
    padding: '0.5rem 0.8rem',
    borderRadius: '2rem',
    margin: 0,
    fontSize: '0.8rem',
  },
  active: {
    backgroundColor: colors.ash200,
  }
});

const Tabs = (props: TabsProps) => {
  const [activeItem, setActiveItem] = useState(props.tabs[0].id);
  const tabContentEls = props.tabs.map(tab => document.querySelector(`[title="${tab.id}"]`));

  useEffect(() => {
    tabContentEls.forEach(element => {
      if (element?.getAttribute('title') === activeItem) {
        element?.removeAttribute('hidden');
      }
      else {
        element?.setAttribute('hidden', 'true');
      }
    });
  }, [activeItem]);

  return (
    <div {...stylex.props(styles.tabs)}>
      {props.tabs.map((tab: TabItem, index: number) => (
        <button 
          {...stylex.props(styles.tab, activeItem === tab.id && styles.active)}
          key={tab.id}
          onClick={() => setActiveItem(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
