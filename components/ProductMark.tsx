import type { Product } from "@/lib/site";

/** Rounded-square gradient tile that identifies a product. */
export default function ProductMark({
  product,
  size = 48,
  radius = 13,
  shadow = false,
  style,
}: {
  product: Product;
  size?: number;
  radius?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: product.gradient,
        boxShadow: shadow ? product.shadow : undefined,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
