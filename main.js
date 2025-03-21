// Star animation script
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random duration between 3-7 seconds
        const duration = 3 + Math.random() * 4;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Cursor trail effect
function createCursorTrail() {
    const cursorTrail = document.getElementById('cursorTrail');
    const heroSection = document.getElementById('home');
    const maxStars = 20;
    const stars = [];
    let mouseX = 0;
    let mouseY = 0;

    // Create initial stars for cursor trail
    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.opacity = 0;
        cursorTrail.appendChild(star);
        stars.push({
            element: star,
            x: 0,
            y: 0,
            scale: Math.random() * 0.5 + 0.5
        });
    }

    // Update star positions
    function updateStars() {
        stars.forEach((star, index) => {
            const lag = (index + 1) * 0.1;
            star.x += (mouseX - star.x) * lag;
            star.y += (mouseY - star.y) * lag;
            star.element.style.transform = `translate(${star.x}px, ${star.y}px) scale(${star.scale})`;
            star.element.style.opacity = 1 - (index / maxStars);
        });
        requestAnimationFrame(updateStars);
    }

    // Track mouse movement
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Start animation
    updateStars();
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Reset previous error states
    clearErrors();
    
    // Validate name
    if (!name.value.trim() || name.value.length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim() || message.value.length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        form.submit();
    }
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
    element.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createCursorTrail();
    
    // Add form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
}); 