import './col.css';

interface ColProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  layout?: 'fit';
  break?: 'sm' | 'md' | 'lg';
  halfBreak?: 'md' | 'lg';
  largeGutter?: boolean;
}

export const Col = (props: ColProps) => (
  <div
    className={`col${props.layout === 'fit' ? ' col_fit' : ''}${props.break ? ` col_full_${props.break}` : ''}${props.halfBreak ? ` col_half_${props.halfBreak}` : ''}${props.span ? ` col_span_${props.span}` : ''}${props.largeGutter ? ' col_large_gutter' : ''}`}
  >
    {props.children}
  </div>
);
