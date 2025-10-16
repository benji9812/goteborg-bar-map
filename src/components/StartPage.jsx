import React from 'react';

function StartPage({ onStart }) {
    return (
        <div style={{
            minHeight: '100vh',
            minWidth: '100vw',
            background: 'url("https://user-gen-media-assets.s3.amazonaws.com/seedream_images/6d28e0d8-ad5a-4e8b-aa42-0c33e90df76e.png") center center / cover no-repeat',
            backgroundColor: '#2a0a23',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <h1 style={{
                fontFamily: "'Creepster', cursive",
                fontSize: '4rem',
                color: '#D7263D', // Blood moon red
                textShadow: `
                0 0 40px #ef4700,      /* yttre orange glöd */
                0 0 22px #ad1e2c,      /* inre blodröd */
                2px 2px 8px #000,      /* djup svart */
                4px 4px 14px #7f0c01   /* ytterligare mörkröd/Orange */
              `,
                margin: 0,
                marginBottom: '18px'
            }}>
                GÖTEBORGS ÖLKARTA
            </h1>
            <p style={{
                fontFamily: "'Creepster', cursive",
                color: '#d7263d', // Blood moon red
                fontSize: '2rem',
                textAlign: 'center',
                textShadow: `
                0 0 15px #bc4936,
                0 0 30px #ef4700,
                0 1px 7px #450000
              `
            }}>
                VÅGAR DU LETA EFTER ÖL PÅ DE MÖRKASTE PLATSERNA?
            </p>

            <button
                onClick={onStart}
                style={{
                    fontFamily: "'Creepster', cursive",
                    fontSize: '1.25rem',
                    background: 'linear-gradient(90deg,#d7263d,#ef4700 90%)',
                    color: '#fff',
                    boxShadow: '0 0 22px #d7263dcc, 0 0 55px #ef4700aa',
                    textShadow: '0 0 13px #d7263d,0 0 5px #ef4700',
                    borderRadius: '10px',
                    border: 'none',
                    padding: '13px 33px',
                    marginTop: '22px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.08em'
                }}>
                GÅ TILL KARTAN OM DU VÅGAR...
            </button>
        </div>
    );
}
export default StartPage;


