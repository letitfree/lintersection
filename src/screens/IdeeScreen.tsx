import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TextInput, TouchableOpacity, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

interface Idee {
  id: string;
  title: string;
  desc: string;
  auteur: string;
  votes: number;
  voted: boolean;
  color: string;
}

const INITIAL: Idee[] = [
  { id: '1', title: 'Carte interactive de tous les problèmes signalés', desc: 'Une carte publique pour visualiser en temps réel ce que la mairie traite ou ignore.', auteur: 'Marc T. — il y a 3 jours', votes: 142, voted: false, color: COLORS.rouge },
  { id: '2', title: '"Shadow conseil municipal" citoyen', desc: 'Tenir en parallèle de chaque conseil notre propre session ouverte à tous les orléanais.', auteur: 'Fatou D. — il y a 5 jours', votes: 98, voted: false, color: COLORS.vert },
  { id: '3', title: 'Newsletter papier pour les non-connectés', desc: 'Un résumé distribué dans les boîtes aux lettres pour toucher tout le monde.', auteur: 'Jean-Pierre M. — il y a 1 semaine', votes: 71, voted: false, color: COLORS.rouge },
  { id: '4', title: 'Permanences mobiles dans les marchés', desc: 'Une table de notre mouvement lors des marchés hebdomadaires pour aller vers les gens.', auteur: 'Amandine R. — il y a 2 semaines', votes: 54, voted: false, color: COLORS.vert },
];

export default function IdeeScreen() {
  const [idees, setIdees] = useState<Idee[]>(INITIAL);
  const [titre, setTitre] = useState('');
  const [desc, setDesc] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tab, setTab] = useState<'liste' | 'soumettre'>('liste');

  const voter = (id: string) => {
    setIdees(prev => prev.map(i => {
      if (i.id !== id || i.voted) return i;
      return { ...i, votes: i.votes + 1, voted: true };
    }));
  };

  const soumettre = () => {
    if (!titre.trim() || !desc.trim()) {
      Alert.alert('Champs manquants', 'Merci de remplir le titre et la description.');
      return;
    }
    const newIdee: Idee = {
      id: Date.now().toString(),
      title: titre.trim(),
      desc: desc.trim(),
      auteur: (prenom.trim() || 'Anonyme') + ' — à l\'instant',
      votes: 1,
      voted: true,
      color: COLORS.rouge,
    };
    setIdees(prev => [newIdee, ...prev]);
    setTitre(''); setDesc(''); setPrenom('');
    Alert.alert('Idée soumise ✓', 'Merci ! Votre idée a été ajoutée à la liste.');
    setTab('liste');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTag}>Démocratie interne</Text>
        <Text style={styles.headerTitle}>Boîte à idées</Text>
        <Text style={styles.headerSub}>Proposez, votez. Les idées les plus soutenues guident nos priorités.</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'liste' && styles.tabActive]}
          onPress={() => setTab('liste')}
        >
          <Text style={[styles.tabText, tab === 'liste' && styles.tabTextActive]}>Idées ({idees.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'soumettre' && styles.tabActive]}
          onPress={() => setTab('soumettre')}
        >
          <Text style={[styles.tabText, tab === 'soumettre' && styles.tabTextActive]}>+ Proposer</Text>
        </TouchableOpacity>
      </View>

      {tab === 'liste' ? (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
            {[...idees].sort((a, b) => b.votes - a.votes).map(idee => (
              <View key={idee.id} style={[styles.ideeCard, SHADOWS.card]}>
                <TouchableOpacity
                  style={[styles.voteBtn, idee.voted && styles.voteBtnActive, { borderColor: idee.voted ? idee.color : 'rgba(58,28,20,0.2)' }]}
                  onPress={() => voter(idee.id)}
                  disabled={idee.voted}
                >
                  <Text style={styles.voteArrow}>▲</Text>
                  <Text style={[styles.voteNum, { color: idee.voted ? idee.color : COLORS.gris }]}>{idee.votes}</Text>
                </TouchableOpacity>

                <View style={styles.ideeContent}>
                  <Text style={styles.ideeTitle}>{idee.title}</Text>
                  <Text style={styles.ideeDesc}>{idee.desc}</Text>
                  <Text style={styles.ideeAuteur}>{idee.auteur}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Titre de votre idée *</Text>
            <TextInput style={styles.input} value={titre} onChangeText={setTitre} placeholder="Court et clair..." placeholderTextColor={COLORS.gris} />

            <Text style={styles.fieldLabel}>Description *</Text>
            <TextInput style={[styles.input, styles.textarea]} value={desc} onChangeText={setDesc} placeholder="Expliquez votre idée en quelques lignes. Quel problème résout-elle ?" placeholderTextColor={COLORS.gris} multiline numberOfLines={4} textAlignVertical="top" />

            <Text style={styles.fieldLabel}>Votre prénom (facultatif)</Text>
            <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Prénom ou anonyme" placeholderTextColor={COLORS.gris} />

            <TouchableOpacity style={styles.submitBtn} onPress={soumettre}>
              <Text style={styles.submitText}>Proposer cette idée →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.creme },
  scroll: { flex: 1 },
  header: { backgroundColor: COLORS.brun, padding: SPACING.lg, paddingTop: SPACING.md },
  headerTag: { fontSize: 11, fontWeight: '700', color: COLORS.rougeMid, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: COLORS.creme },
  headerSub: { fontSize: 13, color: 'rgba(250,248,244,0.55)', marginTop: 4 },

  tabs: { flexDirection: 'row', backgroundColor: COLORS.brunMid },
  tab: { flex: 1, padding: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: COLORS.sable },
  tabText: { fontSize: 13, fontWeight: '600', color: 'rgba(250,248,244,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 },
  tabTextActive: { color: COLORS.sable },

  list: { padding: SPACING.md },
  ideeCard: {
    backgroundColor: COLORS.blanc, borderRadius: RADIUS.md,
    flexDirection: 'row', marginBottom: SPACING.md, overflow: 'hidden',
  },
  voteBtn: {
    width: 56, alignItems: 'center', justifyContent: 'center',
    padding: SPACING.sm, borderRightWidth: 2,
    borderRightColor: 'rgba(58,28,20,0.1)',
  },
  voteBtnActive: { backgroundColor: COLORS.rougePale },
  voteArrow: { fontSize: 14, color: COLORS.gris, marginBottom: 2 },
  voteNum: { fontSize: 18, fontWeight: '900' },
  ideeContent: { flex: 1, padding: SPACING.md },
  ideeTitle: { fontSize: 14, fontWeight: '700', color: COLORS.brun, marginBottom: 4, lineHeight: 20 },
  ideeDesc: { fontSize: 13, color: COLORS.gris, lineHeight: 18, marginBottom: 6 },
  ideeAuteur: { fontSize: 11, color: 'rgba(58,28,20,0.4)' },

  form: { padding: SPACING.md, paddingTop: SPACING.lg },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gris, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  input: { backgroundColor: COLORS.blanc, borderWidth: 1.5, borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm, padding: 12, fontSize: 14, color: COLORS.brun, marginBottom: SPACING.md },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: COLORS.vert, borderRadius: RADIUS.sm, padding: 16, alignItems: 'center', marginTop: SPACING.sm },
  submitText: { color: 'white', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});
