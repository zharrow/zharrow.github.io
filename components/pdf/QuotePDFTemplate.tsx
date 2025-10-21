import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { QuoteData } from '@/lib/simulator/types';
import { simulatorConfig } from '@/lib/simulator/config';

// Couleurs de la charte graphique
const COLORS = {
  cream: '#FAF9F7',
  blackDeep: '#0A0A0A',
  graySecondary: '#666666',
  grayLight: '#F6F6F6',
  whitePure: '#FFFFFF',
  orangePantone: '#FF7A00',
};

// Styles du PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.whitePure,
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: `2px solid ${COLORS.orangePantone}`,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.blackDeep,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.graySecondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.blackDeep,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: `1px solid ${COLORS.grayLight}`,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 10,
    color: COLORS.blackDeep,
    flex: 1,
  },
  itemPrice: {
    fontSize: 10,
    color: COLORS.graySecondary,
    textAlign: 'right',
    width: 80,
  },
  categoryLabel: {
    fontSize: 9,
    color: COLORS.graySecondary,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  totalSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: `2px solid ${COLORS.blackDeep}`,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: COLORS.blackDeep,
  },
  totalValue: {
    fontSize: 12,
    color: COLORS.blackDeep,
    fontWeight: 'bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${COLORS.grayLight}`,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.blackDeep,
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.orangePantone,
  },
  estimationSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.cream,
    borderRadius: 4,
  },
  estimationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  estimationLabel: {
    fontSize: 10,
    color: COLORS.graySecondary,
  },
  estimationValue: {
    fontSize: 10,
    color: COLORS.blackDeep,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: COLORS.graySecondary,
    textAlign: 'center',
    paddingTop: 15,
    borderTop: `1px solid ${COLORS.grayLight}`,
  },
  maintenanceNote: {
    fontSize: 9,
    color: COLORS.orangePantone,
    marginTop: 5,
  },
});

interface QuotePDFTemplateProps {
  quoteData: QuoteData;
  clientName?: string;
  quoteNumber?: string;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const formatPrice = (price: number) => {
  return `${price.toLocaleString('fr-FR')} €`;
};

// Fonction pour générer le Document PDF
export const generateQuotePDF = ({
  quoteData,
  clientName,
  quoteNumber,
}: QuotePDFTemplateProps) => {
  const { selections, pricing, estimation } = quoteData;

  const projectType = simulatorConfig.projectTypes.find(
    (pt) => pt.id === quoteData.projectType
  );

  return React.createElement(
    Document,
    {},
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.title }, 'DEVIS WEB'),
        React.createElement(
          Text,
          { style: styles.subtitle },
          `${quoteNumber ? `N° ${quoteNumber} - ` : ''}Généré le ${formatDate(quoteData.generatedAt)}`
        ),
        clientName &&
          React.createElement(
            Text,
            { style: [styles.subtitle, { marginTop: 5 }] },
            `Client: ${clientName}`
          )
      ),

      // Type de projet
      projectType &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Type de projet'),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              Text,
              { style: styles.itemName },
              `${projectType.name} - ${projectType.description}`
            ),
            React.createElement(Text, { style: styles.itemPrice }, formatPrice(projectType.basePrice))
          )
        ),

      // Total
      React.createElement(
        View,
        { style: styles.totalSection },
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(Text, { style: styles.totalLabel }, 'Sous-total HT'),
          React.createElement(Text, { style: styles.totalValue }, formatPrice(pricing.subtotal))
        ),
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(Text, { style: styles.totalLabel }, 'TVA (20%)'),
          React.createElement(Text, { style: styles.totalValue }, formatPrice(pricing.tax))
        ),
        React.createElement(
          View,
          { style: styles.grandTotalRow },
          React.createElement(Text, { style: styles.grandTotalLabel }, 'TOTAL TTC'),
          React.createElement(Text, { style: styles.grandTotalValue }, formatPrice(pricing.total))
        )
      ),

      // Estimations
      React.createElement(
        View,
        { style: styles.estimationSection },
        React.createElement(
          View,
          { style: styles.estimationRow },
          React.createElement(Text, { style: styles.estimationLabel }, 'Durée estimée'),
          React.createElement(
            Text,
            { style: styles.estimationValue },
            `${estimation.duration} ${estimation.duration > 1 ? 'jours' : 'jour'}`
          )
        ),
        React.createElement(
          View,
          { style: styles.estimationRow },
          React.createElement(Text, { style: styles.estimationLabel }, 'Complexité'),
          React.createElement(Text, { style: styles.estimationValue }, `${estimation.complexity} points`)
        )
      ),

      // Footer
      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(
          Text,
          {},
          'Ce devis est valable 30 jours. Prix indicatifs en euros HT, ajustables selon les besoins spécifiques du projet.'
        ),
        React.createElement(
          Text,
          { style: { marginTop: 5 } },
          'Florent Detres - Développeur Web Full Stack - florent.detres@protonmail.com'
        )
      )
    )
  );
};
