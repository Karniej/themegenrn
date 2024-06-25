/** @format */
export const themeContextString = `import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Theme as NavigationTheme } from "@react-navigation/native";
import { presets } from "./presets"; // Adjust the import path as needed

export interface ExtendedTheme extends NavigationTheme {
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
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  roundness: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  shadows: {
    xs: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xl: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xxl: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

interface ThemeContextType {
  theme: ExtendedTheme;
  setTheme: (theme: ExtendedTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ExtendedTheme>(
    colorScheme === "dark" ? presets.Default.dark : presets.Default.light,
  );

  useEffect(() => {
    setTheme(
      colorScheme === "dark" ? presets.Default.dark : presets.Default.light,
    );
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme.dark ? presets.Default.light : presets.Default.dark,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};

export const useToggleTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useToggleTheme must be used within a ThemeProvider");
  }
  return context.toggleTheme;
};

export const useSetTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useSetTheme must be used within a ThemeProvider");
  }
  return context.setTheme;
};
`;

export const themedComponentsString = `import { useTheme } from "@react-navigation/native";
import {
  Text as DefaultText,
  View as DefaultView,
  FlatList as DefaultFlatList,
  Button as DefaultButton,
  TouchableOpacity as DefaultTouchableOpacity,
  ScrollView as DefaultScrollView,
  Modal as DefaultModal,
  Switch as DefaultSwitch,
  TextInput as DefaultTextInput,
  SectionList as DefaultSectionList,
  SectionListProps,
  Image as DefaultImage,
  TouchableHighlight as DefaultTouchableHighlight,
  SafeAreaView as DefaultSafeAreaView,
  ActivityIndicator as DefaultActivityIndicator,
} from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ButtonProps = ThemeProps & DefaultButton["props"];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];
export type ModalProps = ThemeProps &
  DefaultModal["props"] & { shouldUseTheme?: boolean };
export type TextProps = ThemeProps & DefaultText["props"];
export type SwitchProps = ThemeProps & DefaultSwitch["props"];
export type TextInputProps = ThemeProps &
  DefaultTextInput["props"] & { shouldUseTheme?: boolean };
export type ViewProps = ThemeProps &
  DefaultView["props"] & { shouldUseTheme?: boolean };
export type ScrollViewProps = ThemeProps &
  DefaultScrollView["props"] & { shouldUseTheme?: boolean };
export type FlatListProps = ThemeProps &
  DefaultFlatList["props"] & { shouldUseTheme?: boolean };
export type ImageProps = ThemeProps & DefaultImage["props"];
export type TouchableHighlightProps = ThemeProps &
  DefaultTouchableHighlight["props"];
export type SafeAreaViewProps = ThemeProps &
  DefaultSafeAreaView["props"] & { shouldUseTheme?: boolean };
export type ActivityIndicatorProps = ThemeProps &
  DefaultActivityIndicator["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();
  const color = theme.colors.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = false,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function FlatList(props: FlatListProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = true,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;

  return (
    <DefaultFlatList style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function SectionList(props: SectionListProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = true,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;

  return (
    <DefaultSectionList style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Button(props: ButtonProps) {
  const { color, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();
  const themeColor = theme.colors.primary;

  return <DefaultButton color={color || themeColor} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  return <DefaultTouchableOpacity style={style} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = true,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;

  return (
    <DefaultScrollView
      keyboardDismissMode="on-drag"
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function Modal(props: ModalProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = true,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;

  return <DefaultModal style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Switch(props: SwitchProps) {
  const {
    trackColor,
    ios_backgroundColor,
    thumbColor,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const theme = useTheme();
  const themeColor = theme.colors.primary;

  return (
    <DefaultSwitch
      trackColor={{ ...trackColor, true: themeColor }}
      ios_backgroundColor={ios_backgroundColor || theme.colors.border}
      thumbColor={thumbColor || themeColor}
      {...otherProps}
    />
  );
}

export function TextInput(props: TextInputProps) {
  const {
    style,
    lightColor,
    darkColor,
    shouldUseTheme = true,
    ...otherProps
  } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;
  const color = shouldUseTheme ? theme.colors.text : undefined;

  return (
    <DefaultTextInput
      style={[{ backgroundColor, color }, style]}
      {...otherProps}
    />
  );
}

export function Image(props: ImageProps) {
  return <DefaultImage {...props} />;
}

export function TouchableHighlight(props: TouchableHighlightProps) {
  const { style, ...otherProps } = props;
  const theme = useTheme();
  return (
    <DefaultTouchableHighlight
      style={[{ borderRadius: theme.roundness.sm }, style]}
      {...otherProps}
    />
  );
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, shouldUseTheme = true, ...otherProps } = props;
  const theme = useTheme();
  const backgroundColor = shouldUseTheme ? theme.colors.background : undefined;
  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ActivityIndicator(props: ActivityIndicatorProps) {
  const { color, ...otherProps } = props;
  const theme = useTheme();
  return (
    <DefaultActivityIndicator
      color={color || theme.colors.primary}
      {...otherProps}
    />
  );
}

`;

export const themeUsageExampleString = `
import React from 'react';
import { ThemeProvider, useTheme } from './path-to-your-appliedTheme-context';
import { Text, View } from './path-to-your-themed-components';

function MyComponent() {
  const appliedTheme = useTheme();
  return (
    <View style={{ backgroundColor: appliedTheme.colors.background }}>
      <Text style={{ color: appliedTheme.colors.primary }}>
        Hello, Themed World!
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}`;
