document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(confetti);
    }

    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    let interval;

    function startSlideshow() {
        interval = setInterval(() => {
            if (currentPage < pages.length) {
                pages[currentPage].classList.add('flipped');
                currentPage++;
            } else {
                pages.forEach(page => page.classList.remove('flipped'));
                currentPage = 0;
            }
        }, 3000);
    }

    startSlideshow();

    const photoUpload = document.getElementById('photo-upload');
    photoUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        const book = document.querySelector('.book');
        book.innerHTML = '';

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const page = document.createElement('div');
                page.classList.add('page');
                const img = document.createElement('img');
                img.src = e.target.result;
                page.appendChild(img);
                book.appendChild(page);
            };
            reader.readAsDataURL(file);
        }

        clearInterval(interval);
        setTimeout(() => {
            const newPages = document.querySelectorAll('.page');
            pages = newPages;
            currentPage = 0;
            startSlideshow();
        }, 1000);
    });
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
