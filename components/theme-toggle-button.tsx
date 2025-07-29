"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ThemeToggleButtonProps {
  onThemeChange?: () => void
}

export function ThemeToggleButton({ onThemeChange }: ThemeToggleButtonProps) {
  const { setTheme } = useTheme()

  const handleThemeSelect = (theme: string) => {
    setTheme(theme)
    onThemeChange?.()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeSelect("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
