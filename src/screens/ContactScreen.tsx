import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TextInput, TouchableOpacity, Alert, Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

const SERVICES = [
  { icon: '⚖️', title: 'Aide juridique bénévole', desc: 'Litiges locatifs, droits sociaux, conflits de voisinage.', color: COLORS.rouge },
  { icon: '🛒', title: 'Épicerie solidaire', desc: 'Distribution hebdomadaire à La Source. Ouverte à tous.', color: COLORS.vert },
  { icon: '🔧', title: 'Petits travaux solidaires', desc: 'Artisans bénévoles pour réparations urgentes.', color: COLORS.sable },
  { icon: '💻', title: 'Aide numérique', desc: 'Accompagnement aux démarches en ligne.', color: COLORS.rouge },
  { icon: '🚗', title: 'Mobilité d\'urgence', desc: 'Conducteurs bénévoles pour rendez-vous médicaux.', color: COLORS.vert },
  { icon: '📝', title: 'Démarches administratives', desc: 'Aide pour CAF, Pôle Emploi, logement social.', color: COLORS.sable },
];

const OBJETS = ['Rejoindre le mouvement', 'Proposer mes compétences', 'Demande de service', 'Partenariat / presse', 'Question générale'];

export default function ContactScreen() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [objet, setObjet] = useState('');
  const [msg, setMsg] = useState('');
  const [showObjetPicker, setShowObjetPicker] = useState(false);

const envoyer = () => {
  if (!nom.trim() || !email.trim() || !msg.trim()) {
    Alert.alert('Champs manquants', 'Merci de remplir votre nom, email et message.');
    return;
  }

  const subject = encodeURIComponent(objet || "Contact depuis l'application");
  const body = encodeURIComponent(
`Nom: ${nom}
Email: ${email}
Objet: ${objet}

Message:
${msg}`
  );

  const mailUrl = `mailto:lalevee2026@gmail.com?subject=${subject}&body=${body}`;

  Linking.openURL(mailUrl);
};

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTag}>Nous rejoindre</Text>
          <Text style={styles.headerTitle}>Contact & Services</Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionMeta}>Ces services que la mairie ne vous offre pas</Text>
          <Text style={styles.sectionTitle}>Entraide citoyenne</Text>
          <Text style={styles.sectionSub}>Gratuit, assuré par des bénévoles orléanais.</Text>

          <View style={styles.servicesGrid}>
            {SERVICES.map(s => (
              <TouchableOpacity
                key={s.title}
                style={[styles.serviceCard, SHADOWS.card]}
                onPress={() => Alert.alert(s.title, `${s.desc}\n\nContactez-nous via le formulaire ci-dessous pour ce service.`)}
              >
                <View style={[styles.serviceIconWrap, { backgroundColor: s.color + '22' }]}>
                  <Text style={styles.serviceIcon}>{s.icon}</Text>
                </View>
                <Text style={styles.serviceTitle}>{s.title}</Text>
                <Text style={styles.serviceDesc}>{s.desc}</Text>
                <View style={[styles.serviceBar, { backgroundColor: s.color }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Canaux */}
        <View style={[styles.section, { backgroundColor: COLORS.cremeMid, marginTop: 0, paddingTop: SPACING.lg }]}>
          <Text style={styles.sectionMeta}>Nous joindre</Text>
          <Text style={styles.sectionTitle}>Coordonnées</Text>

          {[
            { icon: '✉️', label: 'lalevee2026@gmail.com', sub: 'Réponse sous 48h en semaine', color: COLORS.rouge, action: () => Linking.openURL('mailto:lalevee2026@gmail.com') },
            { icon: '📱', label: '06 87 31 91 38', sub: 'Joignable en semaine 9h–18h', color: COLORS.vert, action: () => Linking.openURL('tel:0687319138') },
            { icon: '📍', label: 'Événements', sub: 'Voir l\'agenda', color: COLORS.sable, action: () => Linking.openURL('https://calendar.google.com/calendar/u/0/embed?src=lalevee2026@gmail.com&ctz=Europe/Paris') },
            { icon: '💬', label: 'Groupe Discord du mouvement', sub: 'Pour les sympathisants et membres actifs', color: COLORS.rouge, action: () => Linking.openURL('https://discord.gg/fwe8SUe5') },
          ].map(c => (
            <TouchableOpacity
              key={c.label}
              style={[styles.channelCard, SHADOWS.card]}
              onPress={c.action ?? undefined}
              disabled={!c.action}
            >
              <View style={[styles.channelIcon, { backgroundColor: c.color + '22' }]}>
                <Text style={styles.channelIconText}>{c.icon}</Text>
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelLabel}>{c.label}</Text>
                <Text style={styles.channelSub}>{c.sub}</Text>
              </View>
              {c.action && <Text style={styles.channelArrow}>›</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulaire contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envoyer un message</Text>

          <Text style={styles.fieldLabel}>Nom et prénom *</Text>
          <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Votre nom" placeholderTextColor={COLORS.gris} />

          <Text style={styles.fieldLabel}>E-mail *</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="votre@email.fr" placeholderTextColor={COLORS.gris} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.fieldLabel}>Objet</Text>
          <TouchableOpacity style={styles.picker} onPress={() => setShowObjetPicker(!showObjetPicker)}>
            <Text style={[styles.pickerText, !objet && { color: COLORS.gris }]}>{objet || '— Choisir un objet —'}</Text>
            <Text style={styles.pickerArrow}>{showObjetPicker ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showObjetPicker && (
            <View style={[styles.pickerDropdown, SHADOWS.card]}>
              {OBJETS.map(o => (
                <TouchableOpacity key={o} style={styles.pickerOption} onPress={() => { setObjet(o); setShowObjetPicker(false); }}>
                  <Text style={[styles.pickerOptionText, objet === o && { color: COLORS.rouge, fontWeight: '700' }]}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={[styles.fieldLabel, { marginTop: SPACING.md }]}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={msg} onChangeText={setMsg}
            placeholder="Votre message..."
            placeholderTextColor={COLORS.gris}
            multiline numberOfLines={5} textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitBtn} onPress={envoyer}>
            <Text style={styles.submitText}>Envoyer le message →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.creme },
  header: { backgroundColor: COLORS.brun, padding: SPACING.lg, paddingTop: SPACING.md },
  headerTag: { fontSize: 11, fontWeight: '700', color: COLORS.vertMid, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: COLORS.creme },
  section: { padding: SPACING.md, paddingTop: SPACING.lg, paddingBottom: SPACING.lg },
  sectionMeta: { fontSize: 11, fontWeight: '700', color: COLORS.rouge, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.brun, marginBottom: 6 },
  sectionSub: { fontSize: 13, color: COLORS.gris, marginBottom: SPACING.md },

  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  serviceCard: {
    backgroundColor: COLORS.blanc, borderRadius: RADIUS.md,
    padding: SPACING.md, width: '47%', overflow: 'hidden',
  },
  serviceIconWrap: { width: 40, height: 40, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  serviceIcon: { fontSize: 20 },
  serviceTitle: { fontSize: 13, fontWeight: '700', color: COLORS.brun, marginBottom: 4 },
  serviceDesc: { fontSize: 12, color: COLORS.gris, lineHeight: 17 },
  serviceBar: { height: 2, position: 'absolute', bottom: 0, left: 0, right: 0 },

  channelCard: { backgroundColor: COLORS.blanc, borderRadius: RADIUS.md, flexDirection: 'row', alignItems: 'center', padding: SPACING.md, marginBottom: SPACING.sm, gap: SPACING.md },
  channelIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  channelIconText: { fontSize: 18 },
  channelInfo: { flex: 1 },
  channelLabel: { fontSize: 14, fontWeight: '600', color: COLORS.brun },
  channelSub: { fontSize: 12, color: COLORS.gris },
  channelArrow: { fontSize: 20, color: COLORS.gris },

  fieldLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gris, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  input: { backgroundColor: COLORS.blanc, borderWidth: 1.5, borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm, padding: 12, fontSize: 14, color: COLORS.brun, marginBottom: SPACING.md },
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  picker: { backgroundColor: COLORS.blanc, borderWidth: 1.5, borderColor: 'rgba(58,28,20,0.15)', borderRadius: RADIUS.sm, padding: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  pickerText: { fontSize: 14, color: COLORS.brun },
  pickerArrow: { fontSize: 10, color: COLORS.gris },
  pickerDropdown: { backgroundColor: COLORS.blanc, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: 'rgba(58,28,20,0.1)', marginBottom: SPACING.md },
  pickerOption: { padding: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(58,28,20,0.06)' },
  pickerOptionText: { fontSize: 14, color: COLORS.brun },
  submitBtn: { backgroundColor: COLORS.rouge, borderRadius: RADIUS.sm, padding: 16, alignItems: 'center', marginTop: SPACING.sm },
  submitText: { color: 'white', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});
