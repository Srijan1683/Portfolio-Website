const header = document.querySelector(".header");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const contactForm = document.querySelector(".contact-form");
const revealTargets = document.querySelectorAll(
  ".section-heading, .hero-text > *, .hero-image, .highlight-card, .about-card, .skill-group, .project-card, .experience-card, .blog-card, .contact-card, .contact-form, .footer-content"
);

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");

  if (index % 3 === 0) {
    element.classList.add("from-left");
  } else if (index % 3 === 1) {
    element.classList.add("from-right");
  }

  if (index % 4 === 1) {
    element.classList.add("reveal-delay-1");
  } else if (index % 4 === 2) {
    element.classList.add("reveal-delay-2");
  } else if (index % 4 === 3) {
    element.classList.add("reveal-delay-3");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

const updateOnScroll = () => {
  let currentSection = "";

  document.querySelectorAll("main section").forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });

  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
};

window.addEventListener("scroll", updateOnScroll);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("in-view");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealTargets.forEach((element) => {
  revealObserver.observe(element);
});

updateOnScroll();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for reaching out! This form is currently a demo.");
    contactForm.reset();
  });
}
