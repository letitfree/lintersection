import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TextInput, TouchableOpacity, Alert, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

const QUARTIERS = ['Centre-ville', 'Saint-Marceau', 'La Source', 'Argonne', 'Bannier', 'Fleury-les-Aubrais', 'Autre'];
const TYPES = ['Voirie / trottoirs', 'Éclairage public', 'Propreté / déchets', 'Espaces verts', 'Logement dégradé', 'Transport / mobilité', 'Sécurité', 'Services publics absents', 'Autre'];
const DEJA = ['Non, premier signalement', 'Oui, 1 fois, sans réponse', 'Oui, plusieurs fois, sans réponse', 'Oui, réponse reçue mais pas de solution'];

const STATS = [
  { num: '1 842', label: 'Signalements déposés', color: COLORS.rougeMid },
  { num: '67',    label: 'Problèmes résolus',     color: COLORS.vertMid  },
  { num: '438',   label: 'En cours de traitement', color: COLORS.sableMid },
];

function SelectPicker({ label, options, value, onSelect }: {
  label: string; options: string[]; value: string; onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={sp.wrap}>
      <Text style={sp.label}>{label}</Text>
      <TouchableOpacity style={sp.btn} onPress={() => setOpen(!open)}>
        <Text style={[sp.btnText, !value && { color: COLORS.gris }]}>
          {value || '— Choisir —'}
        </Text>
        <Text style={sp.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={[sp.dropdown, SHADOWS.card]}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[sp.option, value === opt && sp.optionActive]}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[sp.optionText, value === opt && { color: COLORS.rouge, fontWeight: '700' }]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const sp = StyleSheet.create({
  wrap: { marginBottom: SPACING.md, zIndex: 1 },
  label: { fontSize: 11, fontWeight: '700', color: COLORS.gris, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  btn: { backgroundColor: COLORS.blanc, borderWidth: 1.5, borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  btnText: { fontSize: 14, color: COLORS.brun, flex: 1 },
  arrow: { fontSize: 10, color: COLORS.gris },
  dropdown: { backgroundColor: COLORS.blanc, borderWidth: 1, borderColor: 'rgba(58,28,20,0.1)', borderRadius: RADIUS.sm, marginTop: 4, maxHeight: 200, overflow: 'scroll' },
  option: { padding: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(58,28,20,0.06)' },
  optionActive: { backgroundColor: COLORS.rougePale },
  optionText: { fontSize: 14, color: COLORS.brun },
});

export default function SignalementScreen() {
  const [prenom, setPrenom] = useState('');
  const [quartier, setQuartier] = useState('');
  const [type, setType] = useState('');
  const [adresse, setAdresse] = useState('');
  const [desc, setDesc] = useState('');
  const [deja, setDeja] = useState('');

  const soumettre = () => {
    if (!prenom.trim() || !desc.trim() || !type) {
      Alert.alert('Champs manquants', 'Merci de remplir au minimum votre prénom, le type de problème et la description.');
      return;
    }
    Alert.alert('Signalement enregistré ✓', `Merci ${prenom} ! Votre signalement a été transmis. Nous allons l'examiner et agir.`, [
      { text: 'OK', onPress: () => { setPrenom(''); setQuartier(''); setType(''); setAdresse(''); setDesc(''); setDeja(''); } }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTag}>Mettre la pression</Text>
        <Text style={styles.headerTitle}>Mairie alternative</Text>
        <Text style={styles.headerSub}>Chaque signalement est documenté et transmis à la mairie.</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statCell}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Votre signalement</Text>

          <Text style={styles.fieldLabel}>Votre prénom *</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Prénom"
            placeholderTextColor={COLORS.gris}
          />

          <SelectPicker label="Votre quartier" options={QUARTIERS} value={quartier} onSelect={setQuartier} />
          <SelectPicker label="Type de problème *" options={TYPES} value={type} onSelect={setType} />

          <Text style={styles.fieldLabel}>Adresse exacte (si possible)</Text>
          <TextInput
            style={styles.input}
            value={adresse}
            onChangeText={setAdresse}
            placeholder="Rue, numéro..."
            placeholderTextColor={COLORS.gris}
          />

          <Text style={styles.fieldLabel}>Description du problème *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={desc}
            onChangeText={setDesc}
            placeholder="Décrivez le problème en détail. Depuis quand existe-t-il ? Quel est son impact sur votre quotidien ?"
            placeholderTextColor={COLORS.gris}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <SelectPicker label="Déjà signalé à la mairie ?" options={DEJA} value={deja} onSelect={setDeja} />

          <TouchableOpacity style={styles.btn} onPress={soumettre}>
            <Text style={styles.btnText}>Soumettre le signalement →</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>* Champs obligatoires. Vos données restent confidentielles.</Text>
        </View>
      </ScrollView>
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

  statsRow: { flexDirection: 'row', backgroundColor: COLORS.brunMid },
  statCell: { flex: 1, padding: SPACING.md, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: 'rgba(255,255,255,0.08)' },
  statNum: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 9, color: 'rgba(250,248,244,0.5)', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', marginTop: 2 },

  form: { padding: SPACING.md, paddingTop: SPACING.lg },
  formTitle: { fontSize: 18, fontWeight: '800', color: COLORS.brun, marginBottom: SPACING.md },

  fieldLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gris, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  input: {
    backgroundColor: COLORS.blanc, borderWidth: 1.5,
    borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm,
    padding: 12, fontSize: 14, color: COLORS.brun, marginBottom: SPACING.md,
  },
  textarea: { minHeight: 120, textAlignVertical: 'top' },

  btn: { backgroundColor: COLORS.rouge, borderRadius: RADIUS.sm, padding: 16, alignItems: 'center', marginTop: SPACING.sm },
  btnText: { color: 'white', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  hint: { fontSize: 12, color: COLORS.gris, textAlign: 'center', marginTop: SPACING.md },
});
