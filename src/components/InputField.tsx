import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '../utils';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  toggleSecureEntry?: () => void;
  showToggle?: boolean;
}

const InputField = memo(
  ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    toggleSecureEntry,
    showToggle,
  }: InputFieldProps) => (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputStyle}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {showToggle && toggleSecureEntry && (
        <TouchableOpacity
          onPress={toggleSecureEntry}
          style={styles.eyeIcon}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {secureTextEntry ? (
            <EyeOff color={COLORS.textSecondary} size={22} />
          ) : (
            <Eye color={COLORS.textSecondary} size={22} />
          )}
        </TouchableOpacity>
      )}
    </View>
  ),
);

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputStyle: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});
