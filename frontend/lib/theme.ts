export interface Theme {
  name: 'light' | 'dark'
  colors: {
    primary: {
      orange: string
      blue: string
      gray: string
    }
    background: {
      primary: string
      secondary: string
      tertiary: string
    }
    text: {
      primary: string
      secondary: string
      muted: string
    }
    border: {
      primary: string
      secondary: string
    }
    surface: {
      elevated: string
      card: string
    }
  }
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: {
      orange: '#FE7446', // Primary orange from Figma
      blue: '#2563EB',   // Blue accent
      gray: '#6B7280'    // Gray neutral
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6'
    },
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6B7280'
    },
    border: {
      primary: '#E5E7EB',
      secondary: '#D1D5DB'
    },
    surface: {
      elevated: '#FFFFFF',
      card: '#FFFFFF'
    }
  }
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: {
      orange: '#FE7446',
      blue: '#3B82F6',
      gray: '#9CA3AF'
    },
    background: {
      primary: '#111827',
      secondary: '#1F2937',
      tertiary: '#374151'
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#E5E7EB',
      muted: '#9CA3AF'
    },
    border: {
      primary: '#374151',
      secondary: '#4B5563'
    },
    surface: {
      elevated: '#1F2937',
      card: '#374151'
    }
  }
}