import React from 'react';

function StartPage({ onStart }) {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(128deg, #232526 20%, #332526 90%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontFamily: '"Montserrat", "Segoe UI", Arial, sans-serif',
        }}>
            <div style={{
                background: 'rgba(25,28,36,0.80)',
                borderRadius: '24px',
                padding: '48px 36px',
                boxShadow: '0 7px 32px 0 rgba(0,0,0,0.30)'
            }}>
                <h1 style={{
                    color: '#F7BB36',
                    textTransform: 'uppercase',
                    fontSize: '3rem',
                    fontFamily: '"Orbitron", "Montserrat", Arial, sans-serif',
                    letterSpacing: '0.05em',
                    marginBottom: '18px',
                    textShadow: '0 2px 8px #222'
                }}>
                    Göteborgs Ölkarta
                </h1>
                <p style={{
                    color: '#fff',
                    fontSize: '1.3rem',
                    marginBottom: '36px',
                    textAlign: 'center'
                }}>
                    Hitta, jämför och upptäck barer, pubar och restauranger med ölpris & stämning.<br />
                    <span style={{ fontSize: '2.1em' }}>🍺🍻🍴</span>
                </p>
                <button
                    onClick={onStart}
                    style={{
                        padding: '12px 36px',
                        fontSize: '1.1rem',
                        fontFamily: '"Montserrat", Arial, sans-serif',
                        background: 'linear-gradient(90deg, #f7bb36 80%, #d96c06 100%)',
                        color: '#222',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 1px 10px #f7bb3690',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                    }}>
                    Gå till kartan
                </button>
            </div>
            <div style={{
                position: 'absolute',
                bottom: '24px',
                width: '100%',
                textAlign: 'center',
                color: '#bbb',
                fontSize: '0.9rem',
                opacity: 0.8,
                letterSpacing: '0.04em'
            }}>
                © {new Date().getFullYear()} Göteborgs Ölkarta | Data: OSM & Manuellt | Design: YOU
            </div>
        </div>
    );
}

export default StartPage;
