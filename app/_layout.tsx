import 'react-native-reanimated';

import { theme } from '@/constants/theme';
import { Button, Chip, Divider, PaperProvider, Snackbar, Text, TextInput } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { View } from 'react-native';


const LoginScreen = () => {
  const [text, setText] = useState('');
  const [showSnack, setShowSnack] = useState(false); // Assuming you have state for Snackbar visibility

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  return (
    <ThemedView>
      <Text variant='headlineSmall'>
        Sign up to our newsletter!
      </Text>
      <Text variant='labelLarge'>
        Get a monthly dose of fresh React Native Paper news straight to your mailbox. Just sign up to our newsletter and enjoy!
      </Text>
      <Divider />
      <View>
        <Chip
          style={{ marginRight: 8 }}
        >
          Dark theme
        </Chip>
        <Chip
          style={{ marginRight: 8 }}
        >
          Material You
        </Chip>
      </View>
      <Divider />
      <TextInput
        style={{ marginTop: 15 }}
        label='Outlined input'
        mode='outlined'
      />
      <TextInput
        style={{ marginTop: 15 }}
        label='Flat input'
        mode='flat'
      />
      <Button
        style={{ marginTop: 15 }}
        icon='send'
        mode="contained"
        onPress={toggleSnack}
      >
        Sign me up
      </Button>
      <Snackbar
        visible={showSnack}
        onDismiss={toggleSnack}
        action={{
          label: 'Dismiss',
          onPress: () => {
            // Do side magic
          },
        }}
        duration={Snackbar.DURATION_LONG}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </ThemedView>
  );
}

export default function RootLayout() {

  return (
    <PaperProvider theme={theme}>
      <LoginScreen />
    </PaperProvider>
  );
}
