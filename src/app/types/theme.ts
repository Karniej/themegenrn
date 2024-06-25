/** @format */

type FontSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type RoundnessSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ViewStyle = {
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
  };
  fontSizes: Record<FontSizes, number>;
  roundness: Record<RoundnessSizes, number>;
  shadows: {
    shadowColor: string;
    xs: ViewStyle;
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
    xl: ViewStyle;
    xxl: ViewStyle;
  };
};
