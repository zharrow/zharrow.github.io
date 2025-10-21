import * as React from 'react';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  name,
  email,
  phone,
  company,
  budget,
  message,
}) => (
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
        Nouveau message de contact
      </h1>
    </div>

    <div style={{
      backgroundColor: '#FAF9F7',
      padding: '40px 30px'
    }}>
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
                Budget :
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
        </table>
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
        Message envoyé depuis votre portfolio
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
