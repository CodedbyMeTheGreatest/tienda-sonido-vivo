const CLASES = {
  neutral: 'text-bg-secondary',
  success: 'text-bg-success',
  warning: 'text-bg-warning',
  marca: 'text-bg-primary',
}

export function Insignia(props) {
  const tone = props.tone ?? 'neutral'
  return <span className={`badge ${CLASES[tone]}`}>{props.children}</span>
}