import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  flexNormal: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
  },
  header: {
    borderStyle: "solid",
    borderWidth: 2,
    borderLeft: 0,
    borderRight: 0,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 12,
    color: "#000",
    fontWeight: 500,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
  },
  summary: {
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    marginVertical: 2,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  // Style de l'en-tête du tableau
  tableHeader: {
    backgroundColor: "#f0f0f0", // Couleur grise claire
    color: "black",
    fontWeight: "bold",
  },
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "center",
    flexShrink: 0, // Empêche le rétrécissement par défaut
  },
  // Largeurs de colonnes spécifiques (doit correspondre à la somme totale)
  colMatricule: { width: "15%" },
  colNom: { width: "52%", textAlign: "left", paddingLeft: 8 },
  colNote: { width: "10%" },
  colHeure: { width: "23%" },
});

export const TableHeader = () => (
  <View style={[styles.tableRow, styles.tableHeader]}>
    <View style={[styles.tableCell, styles.colMatricule]}>
      <Text>Matricule</Text>
    </View>
    <View style={[styles.tableCell, styles.colNom]}>
      <Text>Nom et prénom(s)</Text>
    </View>
    <View style={[styles.tableCell, styles.colNote]}>
      <Text>Note / 20</Text>
    </View>
    <View style={[styles.tableCell, styles.colHeure]}>
      <Text>Heure de soumission</Text>
    </View>
  </View>
);

export const TableRow: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
  return (
    <View style={[styles.tableRow]}>
      <View style={[styles.tableCell, styles.colMatricule]}>
        <Text>{data.utilisateur.matricule}</Text>
      </View>
      <View style={[styles.tableCell, styles.colNom]}>
        <Text>{data.utilisateur.nom}</Text>
      </View>
      <View style={[styles.tableCell, styles.colNote]}>
        <Text>{data.note_obtenue < 10 && "0"}{data.note_obtenue}</Text>
      </View>
      <View style={[styles.tableCell, styles.colHeure]}>
        <Text>{data.heure_soumission}</Text>
      </View>
    </View>
  );
};
