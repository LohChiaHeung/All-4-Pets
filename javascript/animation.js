function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the animation type from the data attribute
            const animationType = entry.target.getAttribute('data-animation');

            // Add the appropriate animate.css class based on the data attribute
            if (animationType) {
                entry.target.classList.add(`animate__${animationType}`);
            }

            // Listen for the animationend event to remove the animation class
            entry.target.addEventListener('animationend', () => {
                entry.target.classList.remove(`animate__${animationType}`);
            }, { once: true }); // Use { once: true } to remove the listener after it's fired

            // Unobserve the element so the animation doesn't repeat
            observer.unobserve(entry.target);
        }
    });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection);

// Observe elements with the animate class and data-animation attribute
const animatedElements = document.querySelectorAll('.animate__animated[data-animation]');
animatedElements.forEach(element => {
    observer.observe(element);
});