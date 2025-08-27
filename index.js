window.addEventListener('load', function () {
    // --- Juggling Balls Animation Logic ---
    console.log("Canvas is loaded and script is running.");
    const circlesContainer = document.getElementById('circles');
    const images = circlesContainer.querySelectorAll('img');

    const objects = Array.from(images).map(img => {
        const imgSize = img.offsetWidth;
        return {
            img: img,
            x: Math.random() * (circlesContainer.offsetWidth - imgSize),
            y: Math.random() * (circlesContainer.offsetHeight - imgSize),
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2
        };
    });

    objects.forEach((obj) => {
        obj.img.addEventListener('mouseover', (e) => {
            console.log(`Mouseover event detected on image with ID: ${obj.img.id}`);
            const rect = obj.img.getBoundingClientRect();
            const imgX = rect.left + rect.width / 2;
            const imgY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const dx = imgX - mouseX;
            const dy = imgY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = 10;
            obj.vx = (dx / distance) * force;
            obj.vy = (dy / distance) * force;
        });

        obj.img.addEventListener('mouseout', () => {
            obj.vx = (Math.random() - 0.5) * 2.5;
            obj.vy = (Math.random() - 0.5) * 2.5;
        });
    });

    function animate() {
        objects.forEach(obj => {
            obj.x += obj.vx;
            obj.y += obj.vy;
            obj.rotation += obj.rotationSpeed;

            if (obj.x + obj.img.offsetWidth > circlesContainer.offsetWidth || obj.x < 0) {
                obj.vx *= -1;
            }
            if (obj.y + obj.img.offsetHeight > circlesContainer.offsetHeight || obj.y < 0) {
                obj.vy *= -1;
            }

            obj.img.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${obj.rotation}deg)`;
        });
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();

    // --- Navigation Bar and Logo Rotation Logic ---
    const header = document.getElementById('main-header');
    const section1 = document.getElementById('section-1');
    const section1Height = section1.offsetHeight;
    const logo = document.getElementById('logo');
    const navResicon = document.getElementById('nav-res-icon');


    function handleScroll() {
        if (window.scrollY > section1Height / 2) {
            header.classList.add('nav-visible');
            header.classList.remove('nav-hidden');
        } else {
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        }

        const scrollY = window.scrollY;
        const rotation = scrollY * 0.5;
        logo.style.transform = `rotate(${rotation}deg)`;
        navResicon.style.transform = `rotate(${rotation}deg)`;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    const contactButton = document.getElementById('nav-res-icon');
    const contactInfo = document.getElementById('nav-res-menu');
    const overlay = document.getElementById('overlay');
    let isOpen = false; // trạng thái menu

    // Toggle menu khi click vào button
    contactButton.addEventListener('click', (event) => {
        event.stopPropagation(); // chặn click lan ra ngoài

        if (!isOpen) {
            contactInfo.style.display = 'block';
            overlay.style.display = 'block';
            setTimeout(() => {
                contactInfo.style.opacity = '1';
                overlay.style.opacity = '1';
            }, 10);
            isOpen = true;
        } else {
            contactInfo.style.opacity = '0';
            overlay.style.opacity = '0';
            setTimeout(() => {
                contactInfo.style.display = 'none';
                overlay.style.display = 'none';
            }, 300);
            isOpen = false;
        }
    });

    // Click ra ngoài thì đóng
    document.addEventListener('click', (event) => {
        if (
            isOpen &&
            !contactButton.contains(event.target) &&
            !contactInfo.contains(event.target)
        ) {
            contactInfo.style.opacity = '0';
            overlay.style.opacity = '0';
            setTimeout(() => {
                contactInfo.style.display = 'none';
                overlay.style.display = 'none';
            }, 300);
            isOpen = false;
        }
    });

    //---------------------------//
    const ele1 = document.getElementById("elephant-1");
    const ele2 = document.getElementById("elephant-2");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY;

        if (currentScroll > lastScroll) {
            // scrolling down → elephants go in
            ele1.classList.remove("out-elephant-1");
            ele1.classList.add("in-elephant-1");

            ele2.classList.remove("out-elephant-2");
            ele2.classList.add("in-elephant-2");
        } else {
            // scrolling up → elephants go out
            ele1.classList.remove("in-elephant-1");
            ele1.classList.add("out-elephant-1");

            ele2.classList.remove("in-elephant-2");
            ele2.classList.add("out-elephant-2");
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });


});

const homeSection = document.getElementById('section-1');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the section enters the viewport, add the animation class
            entry.target.classList.add('animate-home');
        } else {
            // When the section leaves the viewport, remove the class to reset the animation
            entry.target.classList.remove('animate-home');
        }
    });
}, {
    threshold: 0.5
});

observer.observe(homeSection);

const section2 = document.getElementById('section-2');
const circles = document.getElementById('circles');
const exploreFrame = document.getElementById('explore-frame');

let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    // Get the position of section 2 relative to the viewport
    const section2Position = section2.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // Define the "active zone" for the parallax effect
    const activationPoint = screenHeight * 0.5;

    if (section2Position < activationPoint) {
        // Calculate the scroll progress within the active zone
        const progress = (activationPoint - section2Position) / activationPoint;

        // Move circles
        const circlesOffset = -100 * progress;
        circles.style.transform = `translateY(${circlesOffset}px)`;
        circles.style.opacity = `${progress}`;

        // Move explore-frame after a short delay
        const exploreOffset = -100 * Math.max(0, progress - 0.1); // Start 20% into the scroll
        exploreFrame.style.transform = `translateY(${exploreOffset}px)`;
        exploreFrame.style.opacity = `${Math.max(0, progress - 0.2)}`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
        });
        ticking = true;
    }
});

// Initial update to set positions on page load
updateParallax();

document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('nav-res-icon');
    const contactInfo = document.getElementById('nav-res-menu');
    const overlay = document.getElementById('overlay');

    // Toggle the display of the contact-info element when the button is clicked
    contactButton.addEventListener('click', () => {
        contactInfo.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            contactInfo.style.opacity = '1';
            overlay.style.opacity = '1';
        }, 10);
    });

    // Add a listener to hide the contact-info and overlay if the user clicks anywhere else
    document.addEventListener('click', (event) => {
        if (!contactButton.contains(event.target) && !contactInfo.contains(event.target)) {
            contactInfo.style.opacity = '0';
            overlay.style.opacity = '0';
            setTimeout(() => {
                contactInfo.style.display = 'none';
                overlay.style.display = 'none';
            }, 300); // Match this timeout to your CSS transition duration
        }
    });
});