import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function PersonalizationScreen() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [reason, setReason] = useState('');
  const [improve, setImprove] = useState('');

  const onDone = () => {
    // Placeholder for submit/navigation
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.card}>
          <Text style={styles.heroTop}>Tell us about</Text>
          <Text style={styles.heroAccent}>YOURSELF</Text>

          <Text style={styles.welcome}>Welcome to Rivalry.ai!</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Type in your name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#f7cfd2"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>D.O.B</Text>
            <TextInput
              value={dob}
              onChangeText={setDob}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#f7cfd2"
              style={styles.input}
            />
          </View>

          <Text style={[styles.label, styles.sectionLabel]}>Why are you using this app?</Text>
          <View style={styles.textAreaBox}>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Share your goals..."
              placeholderTextColor="#cbb6d6"
              multiline
              style={styles.textArea}
            />
          </View>

          <Text style={[styles.label, styles.sectionLabel]}>What do want to improve?</Text>
          <View style={styles.textAreaBox}>
            <TextInput
              value={improve}
              onChangeText={setImprove}
              placeholder="Skills, habits, topics..."
              placeholderTextColor="#cbb6d6"
              multiline
              style={styles.textArea}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={onDone} activeOpacity={0.9} style={styles.cta}>
        <Text style={styles.ctaText}>Done?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B1E3C',
  },
  container: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  card: {
    marginHorizontal: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#14284F',
    borderWidth: 2,
    borderColor: '#102243',
    shadowColor: '#09152B',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  heroTop: {
    color: '#D8E4FF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },
  heroAccent: {
    marginTop: 6,
    color: '#D6C9FF',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 2,
  },
  welcome: {
    marginTop: 18,
    color: '#D8E4FF',
    textAlign: 'center',
    fontWeight: '800',
  },
  fieldGroup: {
    marginTop: 20,
  },
  label: {
    color: '#D8E4FF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f4c7cc',
    borderColor: '#f0aab4',
    borderWidth: 3,
    height: 44,
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#3a1e24',
    fontWeight: '700',
  },
  sectionLabel: {
    marginTop: 26,
    marginBottom: 10,
    textAlign: 'left',
  },
  textAreaBox: {
    backgroundColor: '#1b2f5a',
    borderColor: '#22386a',
    borderWidth: 4,
    borderRadius: 10,
    height: 140,
    padding: 8,
  },
  textArea: {
    flex: 1,
    color: '#E6E6F0',
    fontWeight: '700',
    textAlignVertical: 'top',
  },
  cta: {
    backgroundColor: '#FF7A00',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
