import React, { useState, useEffect } from 'react';
import './App.css';
import gibiReplikleri from './gibiReplikleri';

function App() {
    const [replik, setReplik] = useState(null);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowIntro(false);
            setReplik(getRandomReplik());
        }, 3000);
    }, []);

    function getRandomReplik() {
        const randomIndex = Math.floor(Math.random() * gibiReplikleri.length);
        return gibiReplikleri[randomIndex];
    }

    function yeniReplik() {
        setReplik(getRandomReplik());
    }

    function getVideoId(url) {
        if (!url) return "";
        const parts = url.split('/');
        return parts[parts.length - 1];
    }

    // Görsel için random pozisyon ve boyut üreten yardımcı fonksiyon
    const generateRandomStyle = () => {
        const top = Math.floor(Math.random() * (window.innerHeight - 300));
        const left = Math.floor(Math.random() * (window.innerWidth - 300));
        const size = Math.floor(Math.random() * 150) + 300; // 300–450px
        const rotate = Math.floor(Math.random() * 40) - 20;

        return {
            top: `${top}px`,
            left: `${left}px`,
            width: `${size}px`,
            transform: `rotate(${rotate}deg)`
        };
    };


    if (showIntro || !replik) {
        return (
            <div className="intro-screen">
                <h2>🎬 Gibi Sunar...</h2>
                <h1>👤 Başrolde: Özge</h1>
            </div>
        );
    }

    return (
        <div className="App">
            <h1>🎉 İyi ki doğdun Özge! 🎉</h1>
            <p>Bugün senin günün! Gibi'den sana özel bir replik 👇</p>

            <div className="kart">
                <p>"{replik.text}"</p>
                {replik.video && (
                    <div className="video-container">
                        <iframe
                            width="360"
                            height="215"
                            src={`${replik.video}?autoplay=1&mute=1&loop=1&playlist=${getVideoId(replik.video)}`}
                            title="Gibi Sahnesi"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            <button onClick={yeniReplik}>Yeni Replik Göster 🔁</button>

            {/* DAĞINIK GÖRSELLER */}
            <div className="gorsel-galeri">
                {[...Array(9)].map((_, i) => (
                    <img
                        key={i}
                        src={require(`./gorsel/${i + 1}.webp`)}
                        alt={`Gibi ${i + 1}`}
                        className="gorsel-kaos"
                        style={generateRandomStyle()}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
