interface LabelProps {
  symbol: string
  color: string
}

export function Label(props: LabelProps) {
  return (
    <div style={{ color: props.color }}>
      {props.symbol}
    </div>
  );
}
