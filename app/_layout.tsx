import 'react-native-reanimated';

import { theme } from '@/constants/theme';
import { Button, Chip, Divider, PaperProvider, Snackbar, Text, TextInput } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { View } from 'react-native';
import DrawerNavigation from '@/components/navigation';

export default function RootLayout() {
  return (
      <PaperProvider theme={theme}>
        <DrawerNavigation />
      </PaperProvider>
  );
}
