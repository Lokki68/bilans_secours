import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../../contants/colors";
import {SectionCard} from "../../components/common/SectionCard";
import {useBilanStore} from "../../store/bilanStore";

export default function BilanCirconstanciel() {

  const { bilan, updateCirconstanciel } = useBilanStore()
  const {circonstanciel} = bilan

  return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📋 Bilan Circonstanciel</Text>
          <Text style={styles.headerSubtitle} >{new Date().toLocaleString('fr-FR')}</Text>
        </View>

        {/* Localisation */}
        <SectionCard title="Localisation de l'intervention" color="#CC0000">
          <Text style={styles.inputLabel}>Adresse / Lieu</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex: 12 rue des lilas, appartement 3b"
            value={circonstanciel.address}
          />
        </SectionCard>

      {/* Contexte */}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 50
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.card
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  textAreaInput: { minHeight: 80, textAlignVertical: 'top' },
  numberControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
  },
  numberBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBtnText: {
    color: Colors.card,
    fontSize: 22,
    fontWeight: '700',
  },
  numberValue: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    minWidth: 40,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonText: {
    color: Colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
})