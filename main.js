// Initialize lenis and requestAnimationFrame
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Progress Bars
document.addEventListener("DOMContentLoaded", () => {
  const ProgressBars = document.querySelectorAll(".progress");
  ProgressBars.forEach(progress => {
    progress.style.width = progress.dataset.level + "%";
  });
});

// Preloader Animation
window.addEventListener("load", () => {
  const tl = gsap.timeline();
  tl.to(".preloader", { opacity: 0, delay: 0.5, duration: 0.5 });
  tl.set(".preloader", { display: "none" }); // Use set() for non-animated properties
  // Animation for titles
  tl.from(".title1", { opacity: 0, x: 300, duration: 0.8 });
  tl.from(".title2", { opacity: 0, x: -300, duration: 0.8 });
  tl.from(".title3", { opacity: 0, x: 300, duration: 0.8 });
  // Animation for headings
  const headings = gsap.utils.toArray(".headings h1");
  headings.forEach(h => {
    gsap.from(h, {
      opacity: 0,
      y: 200,
      ease: "power3.out",
      scrollTrigger: {
        start: "top 70%",
        trigger: h,
        toggleActions: "play none none reverse" // Add reverse on scroll back
      }
    });
  });
  // Animation for progress bars
  const progress = gsap.utils.toArray(".progress");
  progress.forEach(prog => {
    gsap.from(prog, {
      width: 0,
      ease: "power3.out",
      scrollTrigger: {
        start: "top 70%",
        trigger: prog,
        toggleActions: "play none none reverse" // Add reverse on scroll back
      }
    });
  });
});

// Filtering Functionality
const btns = document.querySelectorAll('.gallery-controls button');
const imgs = document.querySelectorAll('.images img');

btns.forEach(btn => {
  btn.addEventListener('click', filterImg);
});

function setActiveBtn(e) {
  btns.forEach(btn => {
    btn.classList.remove('btn-active');
  });
  e.target.classList.add('btn-active');
}

function filterImg(e) {
  const btnType = e.target.dataset.btn;

  // Reset all images to default state
  imgs.forEach(img => {
    img.classList.remove('img-shrink', 'img-expanded');
    img.style.display = ""; // Clear inline styles
  });

  // Apply filtering logic
  if (btnType === "all") {
    // Show all images with animations
    imgs.forEach(img => {
      img.classList.add('img-expanded'); // Add expanded class for animation
    });
  } else {
    // Show only matching images with animations
    imgs.forEach(img => {
      if (img.dataset.img === btnType) {
        img.classList.add('img-expanded'); // Add expanded class for animation
      } else {
        img.classList.add('img-shrink'); // Add shrink class for animation
      }
    });
  }

  // Set active button state
  setActiveBtn(e);
}

// Navbar Scroll Behavior
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelectorAll(".navbar a");
const checkpoints = document.querySelectorAll(".scroll-checkpoint");

navbarLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const target = checkpoints[index];
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  });
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (scrollY > 100) {
    navbar.classList.add("navbar-active");
  } else {
    navbar.classList.remove("navbar-active");
  }

  // Highlight active link based on scroll position
  navbarLinks.forEach((link, index) => {
    if (scrollY >= checkpoints[index].offsetTop - 50) {
      navbarLinks.forEach(l => l.classList.remove("link-active"));
      link.classList.add("link-active");
    }
  });

  if (scrollY < checkpoints[0].offsetTop - 50) {
    navbarLinks.forEach(link => link.classList.remove("link-active"));
  }
});

// Mouse Tracker
const tracker = document.querySelector(".tracker");
function smoothMouseTracker(e) {
  gsap.to(tracker, {
    x: e.clientX - tracker.offsetWidth / 2,
    y: e.clientY - tracker.offsetHeight / 2,
    duration: 0.2, // Adjust duration for smoother movement
    ease: "power2.out"
  });
}

window.addEventListener("mousemove", smoothMouseTracker);

// Hide tracker on hover over links
const links = document.querySelectorAll("a, button");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    tracker.style.display = "none";
  });
  link.addEventListener("mouseleave", () => {
    tracker.style.display = "block";
  });
});

// Check for touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  tracker.style.display = "none";
}