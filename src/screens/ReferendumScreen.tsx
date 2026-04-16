import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

interface Mesure {
  id: string;
  title: string;
  desc: string;
  pour: number;
  total: number;
  accentColor: string;
}

const INITIAL_MESURES: Mesure[] = [
  {
    id: 'v1',
    title: 'Transports gratuits pour les moins de 18 ans',
    desc: 'La mobilité des jeunes ne doit pas dépendre du portefeuille des parents.',
    pour: 486, total: 623,
    accentColor: COLORS.rouge,
  },
  {
    id: 'v2',
    title: 'Permanence juridique gratuite dans chaque quartier',
    desc: 'L\'accès au droit ne doit pas être un luxe. Chaque orléanais mérite d\'être conseillé.',
    pour: 445, total: 489,
    accentColor: COLORS.vert,
  },
  {
    id: 'v3',
    title: 'Réponse obligatoire de la mairie sous 30 jours',
    desc: 'Les signalements ignorés pendant des mois doivent devenir impossibles à Orléans.',
    pour: 1197, total: 1247,
    accentColor: COLORS.rouge,
  },
  {
    id: 'v4',
    title: 'Budget participatif de 2 millions € par an',
    desc: 'Que les orléanais décident directement où va une partie du budget municipal.',
    pour: 726, total: 874,
    accentColor: COLORS.vert,
  },
];

export default function ReferendumScreen() {
  const [mesures, setMesures] = useState(INITIAL_MESURES);
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleVote = (id: string, oui: boolean) => {
    if (voted[id]) {
      Alert.alert('Déjà voté', 'Vous avez déjà exprimé votre avis sur cette mesure.');
      return;
    }
    setMesures(prev => prev.map(m => {
      if (m.id !== id) return m;
      return {
        ...m,
        pour: oui ? m.pour + 1 : m.pour,
        total: m.total + 1,
      };
    }));
    setVoted(prev => ({ ...prev, [id]: true }));
    Alert.alert(
      oui ? 'Vote Pour enregistré ✓' : 'Vote Contre enregistré ✗',
      'Merci pour votre participation citoyenne !'
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTag}>Démocratie participative</Text>
        <Text style={styles.headerTitle}>Référendum citoyen</Text>
        <Text style={styles.headerSub}>Votez sur les mesures que nous devons défendre en priorité.</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.fcNotice}>
          <Text style={styles.fcIcon}>🔐</Text>
          <Text style={styles.fcText}>
            Intégration France Connect en cours pour certifier un seul vote par citoyen orléanais.
          </Text>
        </View>

        <View style={styles.list}>
          {mesures.map(m => {
            const pct = Math.round((m.pour / m.total) * 100);
            const hasVoted = voted[m.id];
            return (
              <View key={m.id} style={[styles.card, SHADOWS.card]}>
                <View style={[styles.accentBar, { backgroundColor: m.accentColor }]} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{m.title}</Text>
                  <Text style={styles.cardDesc}>{m.desc}</Text>

                  {/* Barre de progression */}
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: m.accentColor }]} />
                  </View>
                  <View style={styles.statsRow}>
                    <Text style={[styles.pct, { color: m.accentColor }]}>{pct}% Pour</Text>
                    <Text style={styles.total}>{m.total.toLocaleString('fr-FR')} votes</Text>
                  </View>

                  {/* Boutons vote */}
                  {hasVoted ? (
                    <View style={styles.votedBadge}>
                      <Text style={styles.votedText}>✓ Votre vote a été enregistré</Text>
                    </View>
                  ) : (
                    <View style={styles.vbtns}>
                      <TouchableOpacity
                        style={[styles.btnOui, { borderColor: m.accentColor }]}
                        onPress={() => handleVote(m.id, true)}
                      >
                        <Text style={[styles.btnOuiText, { color: m.accentColor }]}>✓ Pour</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnNon}
                        onPress={() => handleVote(m.id, false)}
                      >
                        <Text style={styles.btnNonText}>✗ Contre</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.creme },
  scroll: { flex: 1 },
  header: { backgroundColor: COLORS.brun, padding: SPACING.lg, paddingTop: SPACING.md },
  headerTag: { fontSize: 11, fontWeight: '700', color: COLORS.vertMid, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: COLORS.creme },
  headerSub: { fontSize: 13, color: 'rgba(250,248,244,0.55)', marginTop: 4 },

  fcNotice: {
    backgroundColor: '#e8f0fe', borderLeftWidth: 4, borderLeftColor: '#4285f4',
    margin: SPACING.md, padding: SPACING.md, flexDirection: 'row', gap: 10, alignItems: 'flex-start',
  },
  fcIcon: { fontSize: 16 },
  fcText: { flex: 1, fontSize: 13, color: '#3c4043', lineHeight: 18 },

  list: { padding: SPACING.md, paddingTop: 0 },

  card: { backgroundColor: COLORS.blanc, borderRadius: RADIUS.md, overflow: 'hidden', marginBottom: SPACING.md },
  accentBar: { height: 3 },
  cardContent: { padding: SPACING.md },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.brun, marginBottom: 6, lineHeight: 22 },
  cardDesc: { fontSize: 13, color: COLORS.gris, marginBottom: SPACING.md, lineHeight: 18 },

  barBg: { height: 6, backgroundColor: COLORS.cremeMid, borderRadius: 3, marginBottom: 6 },
  barFill: { height: '100%', borderRadius: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  pct: { fontSize: 13, fontWeight: '700' },
  total: { fontSize: 13, color: COLORS.gris },

  vbtns: { flexDirection: 'row', gap: SPACING.sm },
  btnOui: { flex: 1, padding: 10, borderWidth: 2, borderRadius: RADIUS.sm, alignItems: 'center' },
  btnOuiText: { fontSize: 13, fontWeight: '700' },
  btnNon: { flex: 1, padding: 10, borderWidth: 2, borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm, alignItems: 'center' },
  btnNonText: { fontSize: 13, fontWeight: '700', color: COLORS.gris },

  votedBadge: { backgroundColor: COLORS.vertPale, padding: 10, borderRadius: RADIUS.sm, alignItems: 'center' },
  votedText: { color: COLORS.vert, fontSize: 13, fontWeight: '700' },
});
