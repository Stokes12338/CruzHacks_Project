import { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function HomeScreen() {
  type TimeUnit = 'hours' | 'minutes' | 'seconds';
  const [task, setTask] = useState('');
  const [durationUnit, setDurationUnit] = useState<TimeUnit>('minutes');
  const [hoursInput, setHoursInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [secondsInput, setSecondsInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          // stop at zero
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    const h = parseInt(hoursInput, 10) || 0;
    const m = parseInt(minutesInput, 10) || 0;
    const s = parseInt(secondsInput, 10) || 0;
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) return;
    setRemainingSeconds(total);
    setIsRunning(true);
  };

  const restartTimer = () => {
    // Reset all inputs and the preview to zero; do not start the timer
    setHoursInput('0');
    setMinutesInput('0');
    setSecondsInput('0');
    setRemainingSeconds(0);
    setIsRunning(false);
  };

  // Select unit via buttons (does not start)
  const selectUnit = (unit: TimeUnit) => setDurationUnit(unit);

  const stopTimer = () => {
    setIsRunning(false);
  };

  const onChallenge = () => {
    if (isRunning) {
      stopTimer();
    } else {
      if (remainingSeconds > 0) {
        restartTimer();
      } else {
        startTimer();
      }
    }
  };

  const displayHours = Math.floor(remainingSeconds / 3600);
  const remainderAfterHours = remainingSeconds % 3600;
  const displayMinutes = Math.floor(remainderAfterHours / 60);
  const displaySeconds = remainderAfterHours % 60;
  const ctaLabel = isRunning ? 'Stop' : remainingSeconds > 0 ? 'Restart' : 'Challenge!';

  // While not running AND timer is at zero, update preview from inputs.
  // This prevents Stop from being overridden by input changes.
  useEffect(() => {
    if (isRunning) return;
    if (remainingSeconds !== 0) return;
    const h = parseInt(hoursInput, 10) || 0;
    const m = parseInt(minutesInput, 10) || 0;
    const s = parseInt(secondsInput, 10) || 0;
    const total = h * 3600 + m * 60 + s;
    setRemainingSeconds(total);
  }, [hoursInput, minutesInput, secondsInput, isRunning, remainingSeconds]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headingTop}>Challenge to AI</Text>
        <Text style={styles.headingAccent}>SLACKER!</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Enter your task</Text>
          <TextInput
            value={task}
            onChangeText={setTask}
            placeholder="Type your task..."
            placeholderTextColor="#f7cfd2"
            style={styles.input}
            editable={!isRunning}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Set your timer</Text>
          <View style={styles.timerRow}>
            <TextInput
              value={
                durationUnit === 'hours'
                  ? hoursInput
                  : durationUnit === 'minutes'
                  ? minutesInput
                  : secondsInput
              }
              onChangeText={(text) => {
                if (durationUnit === 'hours') setHoursInput(text);
                else if (durationUnit === 'minutes') setMinutesInput(text);
                else setSecondsInput(text);
              }}
              keyboardType="number-pad"
              placeholder="Amount"
              placeholderTextColor="#f7cfd2"
              style={[styles.input, styles.inputAmount]}
              editable={!isRunning}
            />
            <View style={styles.unitGroup}>
              {(['hours', 'minutes', 'seconds'] as TimeUnit[]).map((opt) => (
                <TouchableOpacity
                  key={opt}
                  disabled={isRunning}
                  onPress={() => !isRunning && selectUnit(opt)}
                  activeOpacity={0.8}
                  style={[
                    styles.unitButton,
                    durationUnit === opt && styles.unitButtonActive,
                  ]}
                >
                  <Text style={[styles.unitText, durationUnit === opt && styles.unitTextActive]}>
                    {opt === 'hours' ? 'HR' : opt === 'minutes' ? 'MIN' : 'SEC'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.squareRow}>
          <View style={styles.square}>
            <Text style={styles.timerNumber}>
              {String(displayHours).padStart(2, '0')}
            </Text>
            <Text style={styles.timerLabel}>HR</Text>
          </View>
          <View style={styles.square}>
            <Text style={styles.timerNumber}>
              {String(displayMinutes).padStart(2, '0')}
            </Text>
            <Text style={styles.timerLabel}>MIN</Text>
          </View>
          <View style={styles.square}>
            <Text style={styles.timerNumber}>
              {String(displaySeconds).padStart(2, '0')}
            </Text>
            <Text style={styles.timerLabel}>SEC</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            onPress={() => !isRunning && startTimer()}
            disabled={isRunning}
            activeOpacity={0.8}
            style={[styles.ctrlButton, isRunning && styles.ctrlButtonDisabled]}
          >
            <Text style={[styles.ctrlText, isRunning && styles.ctrlTextDisabled]}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => isRunning && stopTimer()}
            disabled={!isRunning}
            activeOpacity={0.8}
            style={[styles.ctrlButton, !isRunning && styles.ctrlButtonDisabled]}
          >
            <Text style={[styles.ctrlText, !isRunning && styles.ctrlTextDisabled]}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onChallenge} activeOpacity={0.9} style={styles.cta}>
        <Text style={styles.ctaText}>{ctaLabel}</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1E3C',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  card: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#14284F',
    borderWidth: 2,
    borderColor: '#102243',
    // subtle plaid-ish overlay using inner borders
    shadowColor: '#09152B',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  headingTop: {
    color: '#D8E4FF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },
  headingAccent: {
    marginTop: 6,
    color: '#FFB347',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  fieldGroup: {
    marginTop: 22,
  },
  label: {
    color: '#D8E4FF',
    fontSize: 18,
    fontWeight: '700',
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
  timerRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  inputAmount: {
    flex: 1,
  },
  unitGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    height: 44,
    minWidth: 60,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#f0aab4',
    backgroundColor: '#f4c7cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#9A6BFF',
    borderColor: '#724FE8',
  },
  unitText: {
    color: '#3a1e24',
    fontWeight: '800',
  },
  unitTextActive: {
    color: '#ffffff',
    fontWeight: '900',
  },
  // styles for unit buttons are defined above
  squareRow: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  square: {
    height: 96,
    width: '31%',
    backgroundColor: '#f4c7cc',
    borderColor: '#f0aab4',
    borderWidth: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  timerNumber: {
    color: '#3a1e24',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 2,
  },
  controlsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  ctrlButton: {
    backgroundColor: '#9A6BFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  ctrlButtonDisabled: {
    backgroundColor: '#c7b4ff',
  },
  ctrlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  ctrlTextDisabled: {
    color: '#eee9ff',
  },
  timerLabel: {
    marginTop: 2,
    color: '#7c4a52',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
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
