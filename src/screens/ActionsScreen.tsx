import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';
import Badge from '../components/Badge';

const ACTIONS = [
  {
    date: 'Novembre 2024',
    status: '✓ Victoire',
    statusColor: 'vert' as const,
    title: 'Réfection des trottoirs rue de Bourgogne',
    desc: 'Après 8 mois de signalements ignorés, notre mobilisation (pétition 1 200 signatures + conseil municipal) a forcé le début des travaux.',
    accentColor: COLORS.rouge,
  },
  {
    date: 'Septembre 2024',
    status: '✓ Succès',
    statusColor: 'vert' as const,
    title: 'Épicerie solidaire La Source',
    desc: 'Ouverture d\'un point de distribution alimentaire hebdomadaire. 18 bénévoles, plus de 120 familles aidées chaque semaine.',
    accentColor: COLORS.vert,
  },
  {
    date: 'Juin 2024',
    status: '✓ Succès',
    statusColor: 'vert' as const,
    title: 'Médiation locataires / propriétaires Argonne',
    desc: 'Résolution de 14 conflits locatifs par notre réseau de bénévoles juristes. 4 procédures judiciaires évitées.',
    accentColor: COLORS.sable,
  },
  {
    date: 'En cours',
    status: '⏳ En cours',
    statusColor: 'sable' as const,
    title: 'Éclairage public zone industrielle nord',
    desc: 'Dossier monté, courriers envoyés à la préfecture et à la mairie. Réponse attendue avant fin janvier 2025.',
    accentColor: COLORS.rouge,
  },
  {
    date: 'En cours',
    status: '⏳ En cours',
    statusColor: 'sable' as const,
    title: 'Pression budget participatif 2025',
    desc: 'Dossier en cours de constitution. Présentation publique prévue le 15 février.',
    accentColor: COLORS.vert,
  },
];

export default function ActionsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTag}>Bilan</Text>
        <Text style={styles.headerTitle}>Nos actions</Text>
        <Text style={styles.headerSub}>{ACTIONS.length} actions documentées depuis 2023</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.timeline}>
          {ACTIONS.map((action, idx) => (
            <View key={idx} style={styles.timelineItem}>
              {/* Ligne verticale + point */}
              <View style={styles.timelineLeft}>
                <View style={[styles.dot, { backgroundColor: action.accentColor }]} />
                {idx < ACTIONS.length - 1 && <View style={styles.line} />}
              </View>

              {/* Contenu */}
              <View style={[styles.card, SHADOWS.card]}>
                <View style={[styles.accentBar, { backgroundColor: action.accentColor }]} />
                <View style={styles.cardContent}>
                  <Text style={[styles.date, { color: action.accentColor }]}>{action.date.toUpperCase()}</Text>
                  <Badge label={action.status} color={action.statusColor} />
                  <Text style={styles.title}>{action.title}</Text>
                  <Text style={styles.desc}>{action.desc}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.creme },
  scroll: { flex: 1 },

  header: {
    backgroundColor: COLORS.brun,
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerTag: { fontSize: 11, fontWeight: '700', color: COLORS.rougeMid, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.creme, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: 'rgba(250,248,244,0.5)', marginTop: 4 },

  timeline: { padding: SPACING.md, paddingTop: SPACING.lg },
  timelineItem: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },

  timelineLeft: { alignItems: 'center', width: 20, paddingTop: 16 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  line: { width: 2, flex: 1, backgroundColor: COLORS.cremeMid, marginTop: 4 },

  card: { flex: 1, backgroundColor: COLORS.blanc, borderRadius: RADIUS.md, overflow: 'hidden' },
  accentBar: { height: 3 },
  cardContent: { padding: SPACING.md },

  date: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  title: { fontSize: 15, fontWeight: '700', color: COLORS.brun, marginBottom: 6, lineHeight: 22 },
  desc: { fontSize: 13, color: COLORS.gris, lineHeight: 19 },
});
