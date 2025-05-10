import React, { createContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './themes';

export const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
    const systemScheme = useColorScheme() ?? 'dark';
    const [themeName, setThemeName] = useState(systemScheme);
    const [isReady, setIsReady] = useState(false);

    const THEME_KEY = '@user-theme';

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (storedTheme === 'light' || storedTheme === 'dark') {
                    setThemeName(storedTheme);
                } else {
                    setThemeName(systemScheme);
                }
            } catch (e) {
                console.warn('Failed to load theme:', e);
            } finally {
                setIsReady(true);
            }
        };

        loadTheme();
    }, [systemScheme]);

    const toggleTheme = async () => {
        const newTheme = themeName === 'light' ? 'dark' : 'light';
        setThemeName(newTheme);
        try {
            await AsyncStorage.setItem(THEME_KEY, newTheme);
        } catch (e) {
            console.warn('Failed to save theme:', e);
        }
    };

    const theme = useMemo(() => (
        themeName === 'light' ? lightTheme : darkTheme
    ), [themeName]);

    if (!isReady) return null;

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
