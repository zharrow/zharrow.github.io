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
    marginBottom: 12,
    paddingVertical: 4,
    alignItems: 'flex-start',
    minHeight: 24,
  },
  itemName: {
    fontSize: 10,
    color: COLORS.blackDeep,
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 10,
    color: COLORS.graySecondary,
    textAlign: 'right',
    width: 90,
    flexShrink: 0,
  },
  categoryLabel: {
    fontSize: 8,
    color: COLORS.graySecondary,
    fontStyle: 'italic',
    marginTop: 1,
  },
  itemContainer: {
    flex: 1,
    paddingRight: 15,
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
  // Utiliser un espace normal au lieu de l'espace insécable pour éviter les problèmes de rendu PDF
  const formattedNumber = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formattedNumber} €`;
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

  // Calculer le coût mensuel de maintenance
  let monthlyMaintenance = 0;
  selections.maintenance.forEach(optionId => {
    const option = simulatorConfig.maintenanceOptions.find(o => o.id === optionId);
    if (option) {
      monthlyMaintenance += option.monthlyPrice;
    }
  });

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
            projectType.basePrice > 0
              ? React.createElement(Text, { style: styles.itemPrice }, formatPrice(projectType.basePrice))
              : React.createElement(
                  Text,
                  { style: [styles.itemPrice, { color: COLORS.orangePantone, fontStyle: 'italic' }] },
                  '-25% sur total'
                )
          ),
          projectType.id === 'refonte' && React.createElement(
            Text,
            { style: [styles.categoryLabel, { marginTop: 4, color: COLORS.orangePantone }] },
            'Une réduction de 25% a été appliquée sur le montant total du devis'
          )
        ),

      // Options de design
      selections.design.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Options de design'),
          ...selections.design.map(optionId => {
            const option = simulatorConfig.designOptions.find(o => o.id === optionId);
            if (!option) return null;
            return React.createElement(
              View,
              { key: optionId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, option.name),
                React.createElement(Text, { style: styles.categoryLabel }, option.description)
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(option.price))
            );
          }).filter(Boolean)
        ),

      // Sections
      selections.sections.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Sections du site'),
          ...selections.sections.map(({ sectionId, level }) => {
            const section = simulatorConfig.sectionOptions.find(s => s.id === sectionId);
            if (!section) return null;
            const price = level === 'basic'
              ? section.basicPrice
              : level === 'advanced'
              ? section.advancedPrice
              : section.premiumPrice;
            const levelLabel = level === 'basic' ? 'Basique' : level === 'advanced' ? 'Avancé' : 'Premium';
            return React.createElement(
              View,
              { key: sectionId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, section.name),
                React.createElement(Text, { style: styles.categoryLabel }, `Niveau ${levelLabel}`)
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(price))
            );
          }).filter(Boolean)
        ),

      // Fonctionnalités techniques
      selections.technical.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Fonctionnalités techniques'),
          ...selections.technical.map(featureId => {
            const feature = simulatorConfig.technicalFeatures.find(f => f.id === featureId);
            if (!feature) return null;
            return React.createElement(
              View,
              { key: featureId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, feature.name),
                React.createElement(Text, { style: styles.categoryLabel }, feature.description)
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(feature.price))
            );
          }).filter(Boolean)
        ),

      // Maintenance
      selections.maintenance.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Options de maintenance'),
          ...selections.maintenance.map(optionId => {
            const option = simulatorConfig.maintenanceOptions.find(o => o.id === optionId);
            if (!option) return null;
            return React.createElement(
              View,
              { key: optionId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, option.name),
                React.createElement(Text, { style: styles.categoryLabel }, option.description),
                option.monthlyPrice > 0 && React.createElement(
                  Text,
                  { style: styles.maintenanceNote },
                  `+ ${option.monthlyPrice} €/mois`
                )
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(option.setupPrice))
            );
          }).filter(Boolean)
        ),

      // Performance et SEO
      selections.performance.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Performance & SEO'),
          ...selections.performance.map(optionId => {
            const option = simulatorConfig.performanceOptions.find(o => o.id === optionId);
            if (!option) return null;
            return React.createElement(
              View,
              { key: optionId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, option.name),
                React.createElement(Text, { style: styles.categoryLabel }, option.description)
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(option.price))
            );
          }).filter(Boolean)
        ),

      // Contenu
      Object.keys(selections.content).length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, 'Création de contenu'),
          ...Object.entries(selections.content).map(([optionId, quantity]) => {
            const option = simulatorConfig.contentOptions.find(o => o.id === optionId);
            if (!option || quantity <= 0) return null;
            return React.createElement(
              View,
              { key: optionId, style: styles.row },
              React.createElement(
                View,
                { style: styles.itemContainer },
                React.createElement(Text, { style: styles.itemName }, `${option.name} (x${quantity})`),
                React.createElement(Text, { style: styles.categoryLabel }, option.description)
              ),
              React.createElement(Text, { style: styles.itemPrice }, formatPrice(option.price * quantity))
            );
          }).filter(Boolean)
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
        ),
        monthlyMaintenance > 0 && React.createElement(
          View,
          { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.grayLight}` } },
          React.createElement(
            Text,
            { style: { fontSize: 10, color: COLORS.graySecondary, marginBottom: 3 } },
            'Coût de maintenance mensuel'
          ),
          React.createElement(
            Text,
            { style: { fontSize: 14, fontWeight: 'bold', color: COLORS.orangePantone } },
            `${monthlyMaintenance} € / mois`
          )
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
