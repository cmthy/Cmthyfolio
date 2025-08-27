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
//---------------------
document.addEventListener('DOMContentLoaded', () => {
  // Get all 'look' containers
  const lookContainers = document.querySelectorAll('.look');

  // Add a single mousemove event listener to the entire document
  document.addEventListener('mousemove', (e) => {
    // Loop through each 'look' container to update its corresponding eye
    lookContainers.forEach(container => {
      const innerEye = container.querySelector('.inside-eye');

      // Check if the inner eye exists
      if (innerEye) {
        // Get the position and size of the container relative to the viewport
        const rect = container.getBoundingClientRect();

        // Calculate the center coordinates of the container
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Get the mouse position on the page
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the distance from the eye's center to the mouse
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Set the maximum movement limit for the pupil
        const maxMovement = 15; // You can adjust this value

        // Calculate the new position for the pupil
        // Math.max and Math.min ensure the values stay within the limit
        const moveX = Math.max(-maxMovement, Math.min(maxMovement, deltaX * 0.005));
        const moveY = Math.max(-maxMovement, Math.min(maxMovement, deltaY * 0.003));

        // Apply the transform to move the pupil
        innerEye.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
      }
    });
  });
});


$('.autoplay').slick({
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 800,
  arrows: false
});
$('.autoplay-2').slick({
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 800,
  arrows: false
});


gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const works = gsap.utils.toArray('.work');

  // Tạo một timeline chính để điều khiển chuyển động dọc của carousel
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".works-container",
      start: "top center",
      end: "bottom center",
      scrub: true,
      pin: carousel, // Giữ carousel cố định trên màn hình
      pinSpacing: false,
    }
  });

  // Chỉ thêm các bước animation di chuyển dọc vào timeline
  timeline.to(carousel, {
    y: () => document.body.scrollHeight - window.innerHeight - 200,
    ease: "none",
  });
});
$('.project-text').each(function () {
  new Waypoint.Inview({
    element: this,
    enter: function (direction) {
      // Add a class or do something when .project-text enters the viewport
      $(this.element).addClass('inview-active');
      // You can also use direction if needed
    },
    exited: function (direction) {
      // Remove the class or do something when it leaves
      $(this.element).removeClass('inview-active');
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Rotate element-1 clockwise, element-2 counterclockwise
  const rotation1 = scrollY * 0.3; // adjust multiplier for speed
  const rotation2 = -scrollY * 0.3;
  document.getElementById('element-1').style.transform = `rotate(${rotation1}deg)`;
  document.getElementById('element-2').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-3').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-4').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-5').style.transform = `rotate(${rotation2}deg)`;
});