import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import * as React from 'react'
import { cn } from '@/lib/utils'

// Heading component
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, size, children, ...props }, ref) => {
    const defaultSizes = {
      1: 'text-4xl md:text-5xl',
      2: 'text-3xl md:text-4xl',
      3: 'text-2xl md:text-3xl',
      4: 'text-xl md:text-2xl',
      5: 'text-lg md:text-xl',
      6: 'text-base md:text-lg'
    }

    const customSizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl'
    }

    const sizeClass = size ? customSizes[size] : defaultSizes[level]
    const baseStyles = 'font-semibold text-neutral-900 leading-tight tracking-tight'

    switch (level) {
      case 1:
        return <h1 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h1>
      case 2:
        return <h2 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h2>
      case 3:
        return <h3 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h3>
      case 4:
        return <h4 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h4>
      case 5:
        return <h5 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h5>
      case 6:
        return <h6 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h6>
      default:
        return <h1 ref={ref} className={cn(baseStyles, sizeClass, className)} {...props}>{children}</h1>
    }
  }
)

Heading.displayName = 'Heading'

// Text component
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'muted' | 'accent'
  as?: 'p' | 'span' | 'div'
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'md', weight = 'normal', color = 'primary', as = 'p', children, ...props }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    }

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }

    const colors = {
      primary: 'text-neutral-900',
      secondary: 'text-neutral-700',
      muted: 'text-neutral-600',
      accent: 'text-primary'
    }

    const baseStyles = 'leading-relaxed'
    const combinedClassName = cn(baseStyles, sizes[size], weights[weight], colors[color], className)

    switch (as) {
      case 'span':
        return <span ref={ref as any} className={combinedClassName} {...props}>{children}</span>
      case 'div':
        return <div ref={ref as any} className={combinedClassName} {...props}>{children}</div>
      case 'p':
      default:
        return <p ref={ref} className={combinedClassName} {...props}>{children}</p>
    }
  }
)

Text.displayName = 'Text'

// Label component
interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'md', required, children, ...props }, ref) => {
    const sizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }

    const baseStyles = 'font-medium text-neutral-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

    return (
      <label
        ref={ref}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Heading, Text, Label }