import * as React from 'react';
import { QuoteData } from '@/lib/simulator/types';
import { simulatorConfig } from '@/lib/simulator/config';

interface QuoteEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
  quoteData: QuoteData;
}

export const QuoteEmailTemplate: React.FC<QuoteEmailTemplateProps> = ({
  name,
  email,
  phone,
  company,
  budget,
  message,
  quoteData,
}) => {
  const projectType = simulatorConfig.projectTypes.find(
    pt => pt.id === quoteData.projectType
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#0A0A0A',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#FF7A00',
          margin: 0,
          fontSize: '28px',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        }}>
          Nouvelle demande de devis
        </h1>
        <p style={{
          color: '#FFFFFF',
          margin: '10px 0 0 0',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          {quoteData.pricing.total.toLocaleString('fr-FR')} € TTC
        </p>
      </div>

      <div style={{
        backgroundColor: '#FAF9F7',
        padding: '40px 30px'
      }}>
        {/* Résumé du devis */}
        <div style={{
          backgroundColor: '#FF7A00',
          color: '#FFFFFF',
          padding: '20px 30px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0 0 5px 0',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 0.9
          }}>
            Devis en pièce jointe (PDF)
          </p>
          <p style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {projectType?.name} - {quoteData.estimation.duration} jours
          </p>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '30px',
          marginBottom: '20px',
          borderLeft: '4px solid #FF7A00'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            color: '#0A0A0A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '14px'
          }}>
            Informations du contact
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{
                  padding: '12px 0',
                  color: '#666666',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  width: '140px'
                }}>
                  Nom :
                </td>
                <td style={{
                  padding: '12px 0',
                  color: '#0A0A0A',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  {name}
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px 0',
                  color: '#666666',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Email :
                </td>
                <td style={{
                  padding: '12px 0',
                  color: '#FF7A00',
                  fontSize: '16px'
                }}>
                  <a href={`mailto:${email}`} style={{ color: '#FF7A00', textDecoration: 'none' }}>
                    {email}
                  </a>
                </td>
              </tr>
              {phone && (
                <tr>
                  <td style={{
                    padding: '12px 0',
                    color: '#666666',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Téléphone :
                  </td>
                  <td style={{
                    padding: '12px 0',
                    color: '#0A0A0A',
                    fontSize: '16px'
                  }}>
                    <a href={`tel:${phone}`} style={{ color: '#0A0A0A', textDecoration: 'none' }}>
                      {phone}
                    </a>
                  </td>
                </tr>
              )}
              {company && (
                <tr>
                  <td style={{
                    padding: '12px 0',
                    color: '#666666',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Entreprise :
                  </td>
                  <td style={{
                    padding: '12px 0',
                    color: '#0A0A0A',
                    fontSize: '16px'
                  }}>
                    {company}
                  </td>
                </tr>
              )}
              {budget && (
                <tr>
                  <td style={{
                    padding: '12px 0',
                    color: '#666666',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Budget initial :
                  </td>
                  <td style={{
                    padding: '12px 0',
                    color: '#0A0A0A',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    {budget}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Détails du devis */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '30px',
          marginBottom: '20px',
          borderLeft: '4px solid #FF7A00'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '14px',
            color: '#0A0A0A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Détails du devis
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ backgroundColor: '#FAF9F7' }}>
                <td style={{
                  padding: '12px 16px',
                  color: '#666666',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  width: '60%'
                }}>
                  Sous-total HT
                </td>
                <td style={{
                  padding: '12px 16px',
                  color: '#0A0A0A',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  {quoteData.pricing.subtotal.toLocaleString('fr-FR')} €
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px 16px',
                  color: '#666666',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  TVA (20%)
                </td>
                <td style={{
                  padding: '12px 16px',
                  color: '#0A0A0A',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  {quoteData.pricing.tax.toLocaleString('fr-FR')} €
                </td>
              </tr>
              <tr style={{ backgroundColor: '#FF7A00' }}>
                <td style={{
                  padding: '16px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '600'
                }}>
                  TOTAL TTC
                </td>
                <td style={{
                  padding: '16px',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: '700',
                  textAlign: 'right'
                }}>
                  {quoteData.pricing.total.toLocaleString('fr-FR')} €
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#FAF9F7',
            borderLeft: '3px solid #FF7A00'
          }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{
                    padding: '8px 0',
                    color: '#666666',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Durée estimée
                  </td>
                  <td style={{
                    padding: '8px 0',
                    color: '#0A0A0A',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>
                    {quoteData.estimation.duration} jours
                  </td>
                </tr>
                <tr>
                  <td style={{
                    padding: '8px 0',
                    color: '#666666',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Complexité
                  </td>
                  <td style={{
                    padding: '8px 0',
                    color: '#0A0A0A',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>
                    {quoteData.estimation.complexity} points
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Message */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '30px',
          borderLeft: '4px solid #FF7A00'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '14px',
            color: '#0A0A0A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Message
          </h2>
          <p style={{
            margin: 0,
            color: '#0A0A0A',
            fontSize: '16px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </p>
        </div>

        {/* Quick Action */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <a
            href={`mailto:${email}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#FF7A00',
              color: '#FFFFFF',
              padding: '16px 40px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'background-color 0.3s'
            }}
          >
            Répondre à {name}
          </a>
        </div>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        padding: '30px 20px',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          color: '#666666',
          fontSize: '12px'
        }}>
          Devis généré depuis votre simulateur de prix
        </p>
        <p style={{
          margin: '10px 0 0 0',
          color: '#666666',
          fontSize: '12px'
        }}>
          © {new Date().getFullYear()} Florent Detres
        </p>
      </div>
    </div>
  );
};
