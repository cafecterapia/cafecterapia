import Image from 'next/image';

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export default function CoffeeCupholderIcon({ className = '', width = 24, height = 24 }: Props) {
  return (
    <Image
      src="/images/logobranca.avif"
      width={width}
      height={height}
      className={className}
      alt="Cafecterapia logo"
      aria-hidden={false}
    />
  );
}
