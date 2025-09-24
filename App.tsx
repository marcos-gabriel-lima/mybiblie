import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const features = [
    { title: '📚 Leitura da Bíblia', description: 'Leia todos os livros da Bíblia Sagrada' },
    { title: '🔍 Busca', description: 'Encontre versículos específicos' },
    { title: '❤️ Favoritos', description: 'Salve seus versículos preferidos' },
    { title: '📝 Notas', description: 'Faça anotações pessoais' }
  ];

  const recentReads = [
    { book: 'João', chapter: 1, verse: 1, text: 'No princípio era o Verbo...' },
    { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é o meu pastor...' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📖 Bíblia App</Text>
          <Text style={styles.subtitle}>Sua Bíblia Digital</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.welcome}>Bem-vindo ao</Text>
          <Text style={styles.appTitle}>Bíblia App</Text>
          <Text style={styles.description}>
            Leia a Bíblia Sagrada com uma interface moderna e intuitiva.
            Acesse todos os livros, capítulos e versículos facilmente.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Começar Leitura</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Buscar Versículo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Funcionalidades</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Reads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Leituras Recentes</Text>
          {recentReads.map((read, index) => (
            <View key={index} style={styles.readCard}>
              <Text style={styles.readTitle}>{read.book} {read.chapter}:{read.verse}</Text>
              <Text style={styles.readText}>{read.text}</Text>
              <TouchableOpacity style={styles.readButton}>
                <Text style={styles.readButtonText}>Ler</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Daily Verse */}
        <View style={styles.dailyVerse}>
          <Text style={styles.dailyTitle}>📅 Versículo do Dia</Text>
          <Text style={styles.verseText}>
            "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito,
            para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
          </Text>
          <Text style={styles.verseReference}>João 3:16</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Desenvolvido por Marco Gabriel Lima</Text>
          <Text style={styles.footerText}>Versão 1.0 - React Native</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcome: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  readCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  readText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 12,
  },
  readButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 14,
  },
  dailyVerse: {
    backgroundColor: '#dbeafe',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  dailyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
  },
  verseText: {
    fontSize: 16,
    color: '#1e40af',
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  verseReference: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
});
