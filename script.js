document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(confetti);
    }
});

// Add confetti styles to the CSS
const style = document.createElement('style');
style.innerHTML = `
.confetti {
    position: absolute;
    top: -10px;
    width: 10px;
    height: 10px;
    background-color: #ff4081;
    opacity: 0.7;
    animation: fall 5s linear infinite;
}

@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
