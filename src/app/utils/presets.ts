/** @format */
export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const presets: Record<string, { light: Theme; dark: Theme }> = {
  Default: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(0, 122, 255)",
        background: "rgb(242, 242, 242)",
        card: "rgb(255, 255, 255)",
        text: "rgb(28, 28, 30)",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(10, 132, 255)",
        background: "rgb(1, 1, 1)",
        card: "rgb(18, 18, 18)",
        text: "rgb(229, 229, 231)",
        border: "rgb(39, 39, 41)",
        notification: "rgb(255, 69, 58)",
      },
    },
  },
  Ocean: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(0, 99, 155)",
        background: "rgb(240, 248, 255)",
        card: "rgb(255, 255, 255)",
        text: "rgb(20, 30, 40)",
        border: "rgb(200, 220, 240)",
        notification: "rgb(255, 100, 100)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(0, 149, 205)",
        background: "rgb(0, 20, 40)",
        card: "rgb(10, 30, 50)",
        text: "rgb(220, 230, 240)",
        border: "rgb(40, 60, 80)",
        notification: "rgb(255, 120, 120)",
      },
    },
  },
  Forest: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(34, 139, 34)",
        background: "rgb(245, 250, 245)",
        card: "rgb(255, 255, 255)",
        text: "rgb(30, 50, 30)",
        border: "rgb(200, 230, 200)",
        notification: "rgb(255, 140, 0)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(50, 205, 50)",
        background: "rgb(10, 30, 10)",
        card: "rgb(20, 40, 20)",
        text: "rgb(220, 240, 220)",
        border: "rgb(40, 80, 40)",
        notification: "rgb(255, 165, 0)",
      },
    },
  },
  Lavender: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(123, 104, 238)",
        background: "rgb(250, 245, 255)",
        card: "rgb(255, 255, 255)",
        text: "rgb(50, 40, 60)",
        border: "rgb(230, 220, 240)",
        notification: "rgb(255, 105, 180)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(138, 119, 253)",
        background: "rgb(30, 20, 40)",
        card: "rgb(40, 30, 50)",
        text: "rgb(230, 220, 240)",
        border: "rgb(70, 60, 80)",
        notification: "rgb(255, 120, 195)",
      },
    },
  },
  Sunset: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(255, 99, 71)",
        background: "rgb(255, 250, 240)",
        card: "rgb(255, 255, 255)",
        text: "rgb(60, 40, 30)",
        border: "rgb(240, 220, 200)",
        notification: "rgb(255, 165, 0)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(255, 114, 86)",
        background: "rgb(40, 20, 10)",
        card: "rgb(50, 30, 20)",
        text: "rgb(240, 220, 200)",
        border: "rgb(80, 60, 40)",
        notification: "rgb(255, 180, 0)",
      },
    },
  },
  Gruvbox: {
    light: {
      dark: false,
      colors: {
        primary: "rgb(204, 36, 29)", // red
        background: "rgb(249, 245, 215)", // light0_hard
        card: "rgb(242, 229, 188)", // light1
        text: "rgb(60, 56, 54)", // dark1
        border: "rgb(189, 174, 147)", // light4
        notification: "rgb(254, 128, 25)", // orange
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "rgb(251, 73, 52)", // red
        background: "rgb(29, 32, 33)", // dark0_hard
        card: "rgb(50, 48, 47)", // dark1
        text: "rgb(213, 196, 161)", // light2
        border: "rgb(124, 111, 100)", // dark4
        notification: "rgb(254, 128, 25)", // orange
      },
    },
  },
};
