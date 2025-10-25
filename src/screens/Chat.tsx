import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LogOut, MessageCircle, SendHorizonal } from 'lucide-react-native';
import { COLORS } from '../utils';
import { storage } from '../storage';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  memoryTag?: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  // --- handle auto-scroll to latest message ---
  useEffect(() => {
    if (messages.length > 0)
      flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // --- simulate AI streaming response ---
  const simulateStreamingResponse = (fullText: string, memoryTag?: string) => {
    setIsTyping(true);
    let currentText = '';
    let i = 0;
    const id = Date.now().toString();

    const interval = setInterval(() => {
      currentText += fullText[i];
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
      setMessages(prev => {
        const existing = prev.find(m => m.id === id);
        if (existing) {
          return prev.map(m => (m.id === id ? { ...m, text: currentText } : m));
        } else {
          return [...prev, { id, sender: 'ai', text: currentText, memoryTag }];
        }
      });
    }, 50); // controls typing speed
  };

  // --- basic AI logic ---
  const getAIResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello')) {
      return { text: "Hey! Good to see you again. What's on your mind?" };
    }
    if (lower.includes('startup') || lower.includes('company')) {
      return {
        text: "I remember you're building AiRA. How's that going?",
        memoryTag: 'Remembered: career',
      };
    }
    if (lower.includes('help') || lower.includes('advice')) {
      return {
        text: "I'm here to help. What specifically are you thinking about?",
      };
    }
    return { text: "That's interesting. Tell me more about that." };
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          storage.set('access_token', '');
        },
      },
    ]);
  };

  // --- send message ---
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString() + '_user',
      text: input.trim(),
      sender: 'user',
    };
    setMessages(prev => [...prev, userMsg]);
    const { text, memoryTag } = getAIResponse(input.trim());
    setInput('');
    simulateStreamingResponse(text, memoryTag);
  };

  // --- Message bubble renderer ---
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.aiMessageContainer,
        ]}
      >
        {!isUser && (
          <View style={styles.avatar}>
            <MessageCircle color="#fff" size={16} />
          </View>
        )}
        <View
          style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          {item.memoryTag && (
            <Text style={styles.memoryTag}>{item.memoryTag}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {isTyping && (
        <View style={styles.typingContainer}>
          <ActivityIndicator color={COLORS.accent || '#8f24f5'} size="small" />
          <Text style={styles.typingText}>AI is typing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor={COLORS.textSecondary || '#aaa'}
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <SendHorizonal color="#fff" size={22} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  chatContainer: { padding: 16, paddingBottom: 80 },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  aiMessageContainer: { alignSelf: 'flex-start' },
  userMessageContainer: { alignSelf: 'flex-end' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8f24f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  aiBubble: { backgroundColor: '#1e1e1e', borderTopLeftRadius: 2 },
  userBubble: {
    backgroundColor: '#8f24f5',
    borderTopRightRadius: 2,
    marginLeft: 40,
  },
  messageText: { color: '#fff', fontSize: 16 },
  memoryTag: {
    fontSize: 10,
    color: '#9d9d9d',
    marginTop: 4,
    fontStyle: 'italic',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 8,
  },
  typingText: { color: '#9d9d9d', marginLeft: 6, fontSize: 13 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#3e3e3e',
    backgroundColor: '#1a1a1a',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#8f24f5',
    borderRadius: 24,
    padding: 10,
  },
  header: {
    height: 60,
    backgroundColor: '#121212',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2c2c2c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
  },
});
