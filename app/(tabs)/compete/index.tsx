import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function CompeteHome() {
  const startMatch = () => {
    router.push('/(tabs)/compete/match');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headingTop}>Ready to</Text>
        <Text style={styles.headingAccent}>COMPETE?</Text>

        <Text style={styles.copy}>Face off against a bot and beat the timer.</Text>

        <TouchableOpacity onPress={startMatch} activeOpacity={0.9} style={styles.primary}>
          <Text style={styles.primaryText}>Start Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1E3C',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  card: {
    marginHorizontal: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#14284F',
    borderWidth: 2,
    borderColor: '#102243',
    shadowColor: '#09152B',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },
  headingTop: {
    color: '#D8E4FF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headingAccent: {
    marginTop: 6,
    color: '#FFB347',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
  },
  copy: {
    marginTop: 16,
    color: '#D8E4FF',
    fontWeight: '700',
    textAlign: 'center',
  },
  primary: {
    marginTop: 28,
    backgroundColor: '#FF7A00',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  primaryText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
