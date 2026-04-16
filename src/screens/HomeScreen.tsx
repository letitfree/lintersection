import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';

const STATS = [
  { num: '247', label: 'Membres actifs', color: COLORS.rougeMid },
  { num: '34',  label: 'Actions menées', color: COLORS.sableMid },
  { num: '1 842', label: 'Signalements', color: COLORS.vertMid },
  { num: '12',  label: 'Quartiers',     color: COLORS.rougeMid },
];

const MEMBERS = [
  { initials: 'ML', name: 'Marie Lefebvre', role: 'Cofondatrice', quartier: 'Saint-Marceau', color: COLORS.rouge },
  { initials: 'TD', name: 'Thomas Durand',  role: 'Coordinateur', quartier: 'Argonne',       color: COLORS.vert  },
  { initials: 'SB', name: 'Sara Benali',    role: 'Cofondatrice', quartier: 'La Source',     color: COLORS.sable },
  { initials: 'PL', name: 'Paul Laurent',   role: 'Communication',quartier: 'Centre-ville',  color: COLORS.rouge },
  { initials: 'AR', name: 'Amandine Roux',  role: 'Terrain',      quartier: 'Bannier',       color: COLORS.vert  },
];

const EVENTS = [
  { day: '18', month: 'JAN', title: 'Assemblée générale mensuelle', lieu: 'Salle des fêtes — 19h00', color: COLORS.rouge },
  { day: '25', month: 'JAN', title: 'Distribution alimentaire La Source', lieu: 'Parking Leclerc — 10h00', color: COLORS.vert },
  { day: '08', month: 'FÉV', title: 'Action "Rue propre" centre-ville', lieu: 'Place du Martroi — 9h00', color: COLORS.sable },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={styles.hero}>
          {/* Logo cercles */}
          <View style={styles.logoWrap}>
            <View style={[styles.circle, { backgroundColor: COLORS.sable, top: 0, left: 8 }]} />
            <View style={[styles.circle, { backgroundColor: COLORS.rouge, top: 14, left: 0 }]} />
            <View style={[styles.circle, { backgroundColor: COLORS.vert,  top: 14, left: 16 }]} />
            <Text style={styles.star}>✦</Text>
          </View>

          <Text style={styles.heroTitle}>L'Intersection</Text>
          <View style={styles.tags}>
            <View style={[styles.tag, { backgroundColor: COLORS.rouge }]}>
              <Text style={styles.tagText}>Antifasciste</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: COLORS.sable }]}>
              <Text style={[styles.tagText, { color: COLORS.brun }]}>Progressiste</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: COLORS.vert }]}>
              <Text style={styles.tagText}>Écologiste</Text>
            </View>
          </View>
          <Text style={styles.heroSub}>
            Mouvement citoyen orléanais — là où nos convictions se rejoignent pour agir.
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsGrid}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statCell}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>

          {/* PHILOSOPHIE */}
          <Text style={styles.sectionTag}>Notre philosophie</Text>
          <Text style={styles.sectionTitle}>À l'intersection de nos convictions</Text>

          {[
            { color: COLORS.rouge, icon: '✊', title: 'Antifasciste', desc: 'Vigilance permanente face aux idées d\'extrême-droite qui progressent dans nos quartiers et institutions.' },
            { color: COLORS.sableMid, icon: '⚡', title: 'Progressiste', desc: 'Des solutions concrètes pour les droits sociaux, le logement, la santé et l\'éducation des orléanais.' },
            { color: COLORS.vert, icon: '🌱', title: 'Écologiste', desc: 'L\'urgence climatique est quotidienne. Nous agissons pour une ville plus verte, sobre et juste.' },
          ].map(p => (
            <Card key={p.title} accentColor={p.color}>
              <View style={styles.pilierRow}>
                <View style={[styles.pilierDot, { backgroundColor: p.color }]}>
                  <Text style={styles.pilierIcon}>{p.icon}</Text>
                </View>
                <View style={styles.pilierText}>
                  <Text style={[styles.pilierTitle, { color: p.color }]}>{p.title}</Text>
                  <Text style={styles.pilierDesc}>{p.desc}</Text>
                </View>
              </View>
            </Card>
          ))}

          {/* MEMBRES */}
          <Text style={[styles.sectionTag, { marginTop: SPACING.xl }]}>L'équipe</Text>
          <Text style={styles.sectionTitle}>Les membres</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membresScroll}>
            {MEMBERS.map(m => (
              <View key={m.name} style={styles.membreCard}>
                <View style={[styles.avatar, { backgroundColor: m.color + '22' }]}>
                  <Text style={[styles.avatarText, { color: m.color }]}>{m.initials}</Text>
                </View>
                <Badge label={m.role} color={m.color === COLORS.rouge ? 'rouge' : m.color === COLORS.vert ? 'vert' : 'sable'} />
                <Text style={styles.membreName}>{m.name}</Text>
                <Text style={styles.membreQuartier}>{m.quartier}</Text>
              </View>
            ))}
            <View style={styles.membreCard}>
              <View style={[styles.avatar, { backgroundColor: COLORS.rougePale }]}>
                <Text style={[styles.avatarText, { color: COLORS.rouge, fontSize: 24 }]}>+</Text>
              </View>
              <Text style={[styles.membreName, { marginTop: 8 }]}>Rejoignez-nous</Text>
              <Text style={styles.membreQuartier}>242 autres membres</Text>
            </View>
          </ScrollView>

          {/* AGENDA */}
          <Text style={[styles.sectionTag, { marginTop: SPACING.xl }]}>Agenda</Text>
          <Text style={styles.sectionTitle}>Actions à venir</Text>

          {EVENTS.map(ev => (
            <View key={ev.title} style={[styles.eventCard, SHADOWS.card]}>
              <View style={[styles.eventDay, { backgroundColor: ev.color }]}>
                <Text style={styles.eventDayNum}>{ev.day}</Text>
                <Text style={styles.eventMonth}>{ev.month}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventLieu}>📍 {ev.lieu}</Text>
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

  hero: {
    backgroundColor: COLORS.brun,
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  logoWrap: { width: 52, height: 46, marginBottom: SPACING.md, position: 'relative' },
  circle: {
    position: 'absolute', width: 30, height: 30,
    borderRadius: 15, opacity: 0.85,
  },
  star: { position: 'absolute', top: 12, left: 13, color: 'white', fontSize: 16, opacity: 0.9 },
  heroTitle: {
    fontSize: 36, fontWeight: '900', color: COLORS.creme,
    letterSpacing: -0.5, marginBottom: SPACING.md,
  },
  tags: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap', justifyContent: 'center', marginBottom: SPACING.md },
  tag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: RADIUS.sm },
  tagText: { fontSize: 11, fontWeight: '700', color: 'white', letterSpacing: 0.8, textTransform: 'uppercase' },
  heroSub: { fontSize: 14, color: 'rgba(250,248,244,0.65)', textAlign: 'center', lineHeight: 20, fontWeight: '300' },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: COLORS.brunMid,
  },
  statCell: {
    width: '50%', padding: SPACING.md,
    alignItems: 'center', borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statNum: { fontSize: 26, fontWeight: '900', lineHeight: 30 },
  statLabel: { fontSize: 11, color: 'rgba(250,248,244,0.5)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 },

  section: { padding: SPACING.md, paddingTop: SPACING.lg },
  sectionTag: { fontSize: 11, fontWeight: '700', color: COLORS.rouge, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: COLORS.brun, marginBottom: SPACING.md, lineHeight: 28 },

  pilierRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md },
  pilierDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  pilierIcon: { fontSize: 16 },
  pilierText: { flex: 1 },
  pilierTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  pilierDesc: { fontSize: 13, color: COLORS.gris, lineHeight: 19 },

  membresScroll: { marginHorizontal: -SPACING.md, paddingLeft: SPACING.md },
  membreCard: {
    backgroundColor: COLORS.blanc, borderRadius: RADIUS.md,
    padding: SPACING.md, marginRight: SPACING.sm,
    alignItems: 'center', width: 140,
    ...SHADOWS.card,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  avatarText: { fontSize: 18, fontWeight: '800' },
  membreName: { fontSize: 13, fontWeight: '600', color: COLORS.brun, textAlign: 'center' },
  membreQuartier: { fontSize: 11, color: COLORS.gris, textAlign: 'center', marginTop: 2 },

  eventCard: {
    backgroundColor: COLORS.blanc, borderRadius: RADIUS.md,
    flexDirection: 'row', marginBottom: SPACING.md, overflow: 'hidden',
  },
  eventDay: { width: 64, alignItems: 'center', justifyContent: 'center', padding: SPACING.sm },
  eventDayNum: { fontSize: 24, fontWeight: '900', color: 'white', lineHeight: 28 },
  eventMonth: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: 1 },
  eventInfo: { flex: 1, padding: SPACING.md },
  eventTitle: { fontSize: 14, fontWeight: '600', color: COLORS.brun, marginBottom: 4, lineHeight: 20 },
  eventLieu: { fontSize: 12, color: COLORS.gris },
});
