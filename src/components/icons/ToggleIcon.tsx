type Props = {
  className?: string;
  /** Whether the right side (EN) is active. If false, PT (left) is active */
  on?: boolean;
  width?: number;
  height?: number;
  /** Accessible label for the control */
  ariaLabel?: string;
  /** Change handler receives new state (true => EN, false => PT) */
  onToggle?: (next: boolean) => void;
};

// Two-state toggle icon with PT (left) and EN (right) labels
export default function ToggleIcon({
  className = '',
  on = false,
  width = 56,
  height = 28,
  ariaLabel = 'Switch language',
  onToggle,
}: Props) {
  const knobCx = on ? 38 : 18; // adjusted for wider width (56) with padding

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={ariaLabel}
      onClick={() => onToggle?.(!on)}
      className={`relative inline-flex items-center focus:outline-none focus-visible:ring ring-offset-2 rounded-full ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 56 28"
        width={width}
        height={height}
        aria-hidden
        focusable="false"
        className="block"
      >
        <rect
          x={1}
          y={1}
          width={54}
          height={26}
          rx={13}
          fill="none"
          stroke="currentColor"
          className="transition-colors"
        />
        {/* Labels */}
        <text
          x={14}
          y={17}
          textAnchor="middle"
          fontSize={9}
          fontFamily="system-ui, sans-serif"
          fill={on ? 'currentColor' : '#fff'}
          className={`select-none transition-colors ${on ? 'opacity-60' : 'font-semibold'}`}
        >
          PT
        </text>
        <text
          x={42}
          y={17}
          textAnchor="middle"
          fontSize={9}
          fontFamily="system-ui, sans-serif"
          fill={on ? '#fff' : 'currentColor'}
          className={`select-none transition-colors ${on ? 'font-semibold' : 'opacity-60'}`}
        >
          EN
        </text>
        <circle
          cx={knobCx}
          cy={14}
          r={10}
          fill="currentColor"
          className="transition-all duration-300 ease-out"
        />
      </svg>
    </button>
  );
}
