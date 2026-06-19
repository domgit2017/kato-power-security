/* ==========================================
   KATO POWER SECURITY
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     DARK / LIGHT MODE
  ========================== */

  const themeToggle = document.getElementById("theme-toggle");

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
          '<i class="fas fa-sun"></i>';

      } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
          '<i class="fas fa-moon"></i>';
      }

    });
  }

  /* ==========================
     MOBILE MENU
  ========================== */

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      if (
        nav.style.display === "block"
      ) {

        nav.style.display = "none";

      } else {

        nav.style.display = "block";

        nav.style.position = "absolute";
        nav.style.top = "80px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.background = "#0b4ea2";
        nav.style.padding = "20px";

      }

    });

  }

  /* ==========================
     CLOSE MOBILE MENU
  ========================== */

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 768) {

        nav.style.display = "none";

      }

    });

  });

  /* ==========================
     IMAGE GALLERY MODAL
  ========================== */

  const galleryImages =
    document.querySelectorAll(".gallery-grid img");

  const modal =
    document.getElementById("imageModal");

  const modalImage =
    document.getElementById("modalImage");

  const closeModal =
    document.querySelector(".close");

  galleryImages.forEach(img => {

    img.addEventListener("click", () => {

      modal.style.display = "block";

      modalImage.src = img.src;

      modalImage.alt = img.alt;

    });

  });

  if (closeModal) {

    closeModal.addEventListener("click", () => {

      modal.style.display = "none";

    });

  }

  if (modal) {

    modal.addEventListener("click", (e) => {

      if (e.target === modal) {

        modal.style.display = "none";

      }

    });

  }

  /* ==========================
     ESC KEY CLOSE MODAL
  ========================== */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      if (modal) {

        modal.style.display = "none";

      }

    }

  });

  /* ==========================
     FORM HANDLING
  ========================== */

    const forms = document.querySelectorAll("form");


  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();


      const formData = new FormData(form);


      fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      })
        .then(() => {
          alert("Thank you. Your submission has been received successfully.");
          form.reset();
        })
        .catch(error => {
          console.error("Submission failed:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  });



  /* ==========================
     HEADER SCROLL EFFECT
  ========================== */

  const header =
    document.querySelector("header");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {

      header.style.padding = "10px 6%";
      header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";

    } else {

      header.style.padding = "15px 6%";
      header.style.boxShadow =
        "0 3px 15px rgba(0,0,0,0.15)";

    }

  });

  /* ==========================
     SCROLL ANIMATION
  ========================== */

  const animatedItems =
    document.querySelectorAll(
      ".service-card, .feature, .news-card, .gallery-grid img"
    );

  const observer =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0px)";

        }

      });

    }, {
      threshold: 0.15
    });

  animatedItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform =
      "translateY(40px)";

    item.style.transition =
      "all 0.8s ease";

    observer.observe(item);

  });

  /* ==========================
     BACK TO TOP BUTTON
  ========================== */

  const backToTop =
    document.createElement("button");

  backToTop.innerHTML =
    '<i class="fas fa-arrow-up"></i>';

  backToTop.id = "backToTop";

  document.body.appendChild(backToTop);

  backToTop.style.position = "fixed";
  backToTop.style.bottom = "100px";
  backToTop.style.right = "25px";
  backToTop.style.width = "50px";
  backToTop.style.height = "50px";
  backToTop.style.border = "none";
  backToTop.style.borderRadius = "50%";
  backToTop.style.background = "#0b4ea2";
  backToTop.style.color = "#fff";
  backToTop.style.cursor = "pointer";
  backToTop.style.display = "none";
  backToTop.style.zIndex = "999";

  window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

      backToTop.style.display = "block";

    } else {

      backToTop.style.display = "none";

    }

  });

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});
