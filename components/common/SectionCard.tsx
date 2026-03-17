import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../../contants/colors";

interface SectionCardProps {
  title: string;
  color?: string;
  letter?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
                                                          title,
                                                          color = Colors.primary,
                                                          letter,
                                                          children,
                                                        }) => {
  return (
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: color }]}>
          {letter && <Text style={styles.letter}>{letter}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  letter: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.card,
    width: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.card,
  },
  content: {
    padding: 16,
  },
});