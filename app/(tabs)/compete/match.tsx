import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function MatchScreen() {
  const [botLabel] = useState('BOT #1');

  const onDone = () => {
    router.push('/(tabs)/compete/result');
  };
  const onQuit = () => {
    router.replace('/(tabs)/compete');
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={styles.bubble} />
        <Text style={styles.botTitle}>{botLabel}</Text>

        <View style={styles.stage}>
          <View style={styles.band} />
          <View style={styles.band} />
          <View style={styles.band} />
          <View style={styles.bandWide} />
        </View>

        <TouchableOpacity onPress={onDone} activeOpacity={0.9} style={styles.done}>
          <Text style={styles.doneText}>I'M DONE</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onQuit} activeOpacity={0.9} style={styles.quit}>
        <Text style={styles.quitText}>QUIT!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B1E3C',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 24,
    marginHorizontal: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#14284F',
    borderWidth: 2,
    borderColor: '#102243',
  },
  bubble: {
    alignSelf: 'flex-end',
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: '#6C6CFF',
    marginBottom: 14,
  },
  botTitle: {
    textAlign: 'center',
    color: '#EBD5FF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
  },
  stage: {
    marginTop: 8,
    borderColor: '#22386a',
    borderWidth: 4,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  band: {
    height: 36,
    backgroundColor: '#1b2f5a',
    borderColor: '#22386a',
    borderWidth: 4,
    borderRadius: 8,
    marginBottom: 14,
  },
  bandWide: {
    height: 48,
    backgroundColor: '#1b2f5a',
    borderColor: '#22386a',
    borderWidth: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  done: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#9A6BFF',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  doneText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  quit: {
    backgroundColor: '#FF7A00',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
