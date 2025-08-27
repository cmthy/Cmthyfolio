// Get the logo element
const logo = document.getElementById('logo');
const navResicon = document.getElementById('nav-res-icon');

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
    // Get the current vertical scroll position
    const scrollY = window.scrollY;
    // Calculate the rotation angle (e.g., 0.5 degrees per pixel scrolled)
    const rotation = scrollY * 0.5;
    // Apply the rotation to the logo element
    logo.style.transform = `rotate(${rotation}deg)`;
    navResicon.style.transform = `rotate(${rotation}deg)`;
});
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

// Chạy hiệu ứng lần đầu khi trang tải xong
gsap.registerPlugin(SplitText);

console.clear();

document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });

    let split;
    SplitText.create(".split", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
            split = gsap.from(self.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
            });
            return split;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('contact');
    const contactInfo = document.getElementById('contact-info');
    const overlay = document.getElementById('overlay-2');

    // Toggle the display of the contact-info element when the button is clicked
    contactButton.addEventListener('click', (event) => {
        // Stop the event from propagating to the overlay
        event.stopPropagation(); 
        contactInfo.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            contactInfo.style.opacity = '1';
            overlay.style.opacity = '1';
        }, 10);
    });

    // Close the contact-info and overlay when the overlay is clicked
    overlay.addEventListener('click', () => {
        contactInfo.style.opacity = '0';
        overlay.style.opacity = '0';
        // Hide the elements after the transition
        setTimeout(() => {
            contactInfo.style.display = 'none';
            overlay.style.display = 'none';
        }, 300); // This should match the CSS transition duration
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const frFace = document.getElementById('fr-face');
    const selfVideo = document.getElementById('self-video');

    // Function to show the video and hide the face
    const showVideo = () => {
        selfVideo.classList.add('visible-video');
        frFace.classList.add('hidden-face');
    };

    // Function to hide the video and show the face
    const hideVideo = () => {
        selfVideo.classList.remove('visible-video');
        frFace.classList.remove('hidden-face');
    };

    // Event listener for hovering over the face
    frFace.addEventListener('mouseenter', showVideo);

    // Event listener for moving the mouse away from the face
    frFace.addEventListener('mouseleave', hideVideo);

    // Event listener for clicking the face
    frFace.addEventListener('click', () => {
        // If the video is currently visible, hide it on click. Otherwise, show it.
        if (selfVideo.classList.contains('visible-video')) {
            hideVideo();
        } else {
            showVideo();
        }
    });
});