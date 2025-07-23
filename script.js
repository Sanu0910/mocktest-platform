document.addEventListener('DOMContentLoaded', () => {
    // Confetti creation
    const container = document.querySelector('.container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(confetti);
    }

    // --- AUTOPLAY MUSIC CODE ADDED HERE ---
    const audio = document.getElementById('birthday-song');
    if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // This error is expected if the browser blocks autoplay
                console.log("Audio autoplay was blocked by the browser.");
            });
        }
    }
    // --- END OF AUTOPLAY MUSIC CODE ---

    // Slideshow logic
    let photos = document.querySelectorAll('.photo-container img');
    let currentPhoto = 0;

    function showNextPhoto() {
        if (photos.length === 0) return;

        photos.forEach(photo => {
            photo.classList.remove('active');
            photo.classList.add('background');
        });

        photos[currentPhoto].classList.remove('background');
        photos[currentPhoto].classList.add('active');

        currentPhoto = (currentPhoto + 1) % photos.length;
    }

    setInterval(showNextPhoto, 3000);

    // Photo upload handler
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', (event) => {
            const files = event.target.files;
            const photoContainer = document.querySelector('.photo-container');
            photoContainer.innerHTML = '';

            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    photoContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }

            setTimeout(() => {
                const newPhotos = document.querySelectorAll('.photo-container img');
                photos = newPhotos;
                currentPhoto = 0;
                if (photos.length > 0) {
                    photos[0].classList.add('active');
                }
            }, 1000);
        });
    }
});

// Add confetti styles dynamically to the CSS
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
    z-index: 1000;
}

@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
