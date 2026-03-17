import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {Colors} from "../../contants/colors";

interface Option {
  label: string;
  value: string;
  color?: string;
}

interface SelectButtonProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const SelectButton: React.FC<SelectButtonProps> = ({
                                                            options,
                                                            value,
                                                            onChange,
                                                            label,
                                                          }) => {
  return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.buttonGroup}>
          {options.map((option) => (
              <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.button,
                    value === option.value && {
                      backgroundColor: option.color || Colors.primary,
                      borderColor: option.color || Colors.primary,
                    },
                  ]}
                  onPress={() => onChange(option.value)}
              >
                <Text
                    style={[
                      styles.buttonText,
                      value === option.value && styles.buttonTextActive,
                    ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  buttonTextActive: {
    color: Colors.card,
    fontWeight: '700',
  },
});