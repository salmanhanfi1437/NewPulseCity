// Spacing utilities
export const margin = (value: number) => ({ margin: value });
export const marginTop = (value: number) => ({ marginTop: value });
export const marginBottom = (value: number) => ({ marginBottom: value });
export const marginLeft = (value: number) => ({ marginLeft: value });
export const marginRight = (value: number) => ({ marginRight: value });

export const padding = (value: number) => ({ padding: value });
export const paddingTop = (value: number) => ({ paddingTop: value });
export const paddingBottom = (value: number) => ({ paddingBottom: value });
export const paddingLeft = (value: number) => ({ paddingLeft: value });
export const paddingRight = (value: number) => ({ paddingRight: value });

// Font utilities
export const fontSize = (value: number) => ({ fontSize: value });
export const fontWeight = (value: string) => ({ fontWeight: value });

// Border/Radii
export const radius = (value: number) => ({ borderRadius: value });
export const borderWidth = (value: number) => ({ borderWidth: value });

// Layout helpers
export const flex = (value: number) => ({ flex: value });
export const w = (value: number | string) => ({ width: value });
export const h = (value: number | string) => ({ height: value });