import React, { JSX } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { User, Heart, MessageSquare } from 'lucide-react-native';
import { COLORS } from '../utils'; // optional, adjust to your theme

type MemoryItem = {
  id: string;
  category: 'about' | 'preferences' | 'conversations';
  icon: JSX.Element;
  title: string;
  description: string;
  date: string;
};

const memories: MemoryItem[] = [
  {
    id: '1',
    category: 'about',
    icon: <User color="#8f24f5" size={20} />,
    title: 'Career',
    description: 'You mentioned working on a startup called AiRA.',
    date: 'Oct 20, 2025',
  },
  {
    id: '2',
    category: 'about',
    icon: <User color="#8f24f5" size={20} />,
    title: 'Name',
    description: 'You introduced yourself as Adesh.',
    date: 'Oct 12, 2025',
  },
  {
    id: '3',
    category: 'preferences',
    icon: <Heart color="#8f24f5" size={20} />,
    title: 'Topics of Interest',
    description: 'You enjoy discussions around product design and AI ethics.',
    date: 'Oct 14, 2025',
  },
  {
    id: '4',
    category: 'preferences',
    icon: <Heart color="#8f24f5" size={20} />,
    title: 'Preferred Tone',
    description: 'You prefer clear and concise replies.',
    date: 'Oct 10, 2025',
  },
  {
    id: '5',
    category: 'conversations',
    icon: <MessageSquare color="#8f24f5" size={20} />,
    title: 'Startup Advice',
    description: 'Asked for feedback on fundraising strategies.',
    date: 'Oct 21, 2025',
  },
  {
    id: '6',
    category: 'conversations',
    icon: <MessageSquare color="#8f24f5" size={20} />,
    title: 'Tech Stack',
    description: 'We discussed React Native and backend options.',
    date: 'Oct 18, 2025',
  },
];

const Section = ({ title, data }: { title: string; data: MemoryItem[] }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {data.map(item => (
      <View key={item.id} style={styles.memoryItem}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <View style={styles.memoryTextContainer}>
          <Text style={styles.memoryTitle}>{item.title}</Text>
          <Text style={styles.memoryDescription}>{item.description}</Text>
          <Text style={styles.memoryDate}>{item.date}</Text>
        </View>
      </View>
    ))}
  </View>
);

const Memory = () => {
  const about = memories.filter(m => m.category === 'about');
  const prefs = memories.filter(m => m.category === 'preferences');
  const convos = memories.filter(m => m.category === 'conversations');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AI Memory Panel</Text>
      <Section title="About You" data={about} />
      <Section title="Preferences" data={prefs} />
      <Section title="Conversations" data={convos} />
    </ScrollView>
  );
};

export default Memory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#8f24f5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  memoryItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  memoryTextContainer: { flex: 1 },
  memoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memoryDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  memoryDate: {
    color: '#777',
    fontSize: 12,
  },
});
