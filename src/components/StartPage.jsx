import React from 'react';

function StartPage({ onStart }) {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1567&q=80") center center / cover no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Creepster', cursive",
            position: 'fixed',
            zIndex: 0
        }}>
            <h1 style={{
                fontFamily: "'Creepster', cursive",
                color: '#FFD700',
                fontSize: '4rem',
                textShadow: '0 0 25px #fff, 0 0 48px #f7bb36, 0 0 75px #d96c06'
            }}>
                Göteborgs Ölkarta
            </h1>
            <p style={{
                fontFamily: "'Creepster', cursive",
                color: '#FFD700',
                fontSize: '2rem',
                marginBottom: '36px',
                textShadow: '0 0 11px #f7bb36, 0 0 25px #880c2a'
            }}>
                Hitta de mörkaste pubarna, barerna och restaurangerna... Om du vågar!
            </p>
            <button
                onClick={onStart}
                style={{
                    fontFamily: "'Creepster', cursive",
                    fontSize: '1.25rem',
                    background: 'linear-gradient(90deg, #ffcc00 80%, #763c24 100%)',
                    color: '#fff',
                    boxShadow: '0 0 18px #ffb04b, 0 0 42px #fa506d',
                    textShadow: '0 0 8px #fff700',
                    borderRadius: '10px',
                    border: 'none',
                    padding: '13px 33px',
                    marginTop: '22px',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    cursor: 'pointer'
                }}>
                Gå till kartan 👻
            </button>
        </div>
    );
}

export default StartPage;

