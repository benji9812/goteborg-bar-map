import React from 'react';

function SearchBar({ onSearch, onTypeFilter }) {
    return (
        <div
            style={{
                position: 'relative',
                minWidth: '340px',
                background: 'rgba(30,32,38,0.62)', // Glassmorphism
                boxShadow: '0 8px 32px #2d2936cc', // Soft-glow/shadow
                borderRadius: '18px',
                backdropFilter: 'blur(16px)', // Glassmorphism-blur
                border: '2px solid rgba(255,255,255,0.12)',
                color: '#fff',
                padding: '32px 28px',
                fontFamily: "'Creepster', cursive",
                marginBottom: '18px'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '16px',
                borderBottom: '2px solid rgba(200,200,200,0.16)'
            }}>
                <span style={{ fontSize: '32px', marginRight: '12px' }}>🍺</span>
                <div>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.36rem',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '0.02em',
                        fontFamily: "'Creepster', cursive"
                    }}>
                        Hitta ditt ölställe
                    </h3>
                    <p style={{
                        margin: '2px 0 0 0',
                        fontSize: '13px',
                        color: '#f7bb36',
                        fontWeight: 500
                    }}>
                        Jämför ölpriser i Göteborg
                    </p>
                </div>
            </div>

            {/* Sökfält */}
            <div style={{ marginBottom: '18px' }}>
                <label htmlFor="search-input"
                    style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffd148',
                        marginBottom: '6px'
                    }}>
                    🔍 Sök efter namn
                </label>
                <input
                    type="text"
                    id="search-input"
                    name="search"
                    placeholder="T.ex. Hops, Kellys..."
                    onChange={(e) => onSearch(e.target.value)}
                    style={{
                        width: '92%',
                        padding: '11px 13px',
                        border: '2px solid #ffd14899',
                        borderRadius: '8px',
                        fontSize: '15px',
                        background: 'rgba(30,32,38,0.25)',
                        color: '#ffd148',
                        marginBottom: '7px',
                        fontFamily: 'inherit',
                        boxShadow: '0 2px 16px #fff4',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Filter efter typ */}
            <div style={{ marginBottom: '10px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#ffd148',
                    marginBottom: '7px'
                }}>
                    Filtrera efter typ
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    <label htmlFor="filter-all" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '11px 15px',
                        background: 'rgba(44,8,19,0.43)',
                        boxShadow: '0 2px 18px #f7bb3666',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: '1.5px solid rgba(255,255,255,0.13)',
                        fontSize: '15px',
                        marginBottom: '4px',
                        transition: 'background 0.18s, box-shadow 0.18s'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(120,20,32,0.72)';
                            e.currentTarget.style.boxShadow = '0 2px 28px #ffd148cc';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(44,8,19,0.43)';
                            e.currentTarget.style.boxShadow = '0 2px 18px #f7bb3666';
                        }}>
                        <input id="filter-all" name="type" type="radio" value="all" defaultChecked onChange={e => onTypeFilter(e.target.value)} style={{ marginRight: '10px' }} />
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>🌟</span>
                        <span style={{ fontWeight: 500 }}>Visa alla ställen</span>
                    </label>

                    <label htmlFor="filter-bar" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '11px 15px',
                        background: 'rgba(44,8,19,0.43)',
                        boxShadow: '0 2px 18px #f7bb3666',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: '1.5px solid rgba(255,255,255,0.13)',
                        fontSize: '15px',
                        marginBottom: '4px',
                        transition: 'background 0.18s, box-shadow 0.18s'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(120,20,32,0.72)';
                            e.currentTarget.style.boxShadow = '0 2px 28px #ffd148cc';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(44,8,19,0.43)';
                            e.currentTarget.style.boxShadow = '0 2px 18px #f7bb3666';
                        }}>

                        <input id="filter-bar"
                            name="type"
                            type="radio"
                            value="bar"
                            onChange={e => onTypeFilter(e.target.value)}
                            style={{ marginRight: '10px' }} />

                        <span style={{ fontSize: '18px', marginRight: '8px' }}>🍺</span>
                        <span style={{ fontWeight: 500 }}>Endast barer</span>

                    </label>

                    <label htmlFor="filter-pub" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '11px 15px',
                        background: 'rgba(44,8,19,0.43)',
                        boxShadow: '0 2px 18px #f7bb3688',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: '1.5px solid rgba(255,255,255,0.13)',
                        fontSize: '15px',
                        marginBottom: '4px',
                        transition: 'background 0.18s, box-shadow 0.18s'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(120,20,32,0.72)';
                            e.currentTarget.style.boxShadow = '0 2px 28px #ffd148cc';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(44,8,19,0.43)';
                            e.currentTarget.style.boxShadow = '0 2px 18px #f7bb3688';
                        }}>
                        <input id="filter-pub" name="type" type="radio" value="pub" onChange={e => onTypeFilter(e.target.value)} style={{ marginRight: '10px' }} />
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>🍻</span>
                        <span style={{ fontWeight: 500 }}>Endast pubar</span>
                    </label>

                    <label htmlFor="filter-rest" style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '11px 15px',
                        background: 'rgba(44,8,19,0.43)',
                        boxShadow: '0 2px 18px #f7bb3688',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: '1.5px solid rgba(255,255,255,0.13)',
                        fontSize: '15px',
                        marginBottom: '4px',
                        transition: 'background 0.18s, box-shadow 0.18s'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(120,20,32,0.72)';
                            e.currentTarget.style.boxShadow = '0 2px 28px #ffd148cc';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(44,8,19,0.43)';
                            e.currentTarget.style.boxShadow = '0 2px 18px #f7bb3688';
                        }}>
                        <input id="filter-rest" name="type" type="radio" value="restaurant" onChange={e => onTypeFilter(e.target.value)} style={{ marginRight: '10px' }} />
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>🍴</span>
                        <span style={{ fontWeight: 500 }}>Endast restauranger</span>
                    </label>
                </div>
            </div>

            {/* Info footer */}
            <div style={{
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #f0f0f0',
                fontSize: '11px',
                color: '#999',
                textAlign: 'center',
                opacity: 0.85
            }}>
                Data från OpenStreetMap
            </div>
        </div>
    );
}

export default SearchBar;
