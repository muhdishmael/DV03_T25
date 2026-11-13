/**
 * ============================================================
 * AUSTRALIAN ROAD TRAUMA INSIGHTS (BITRE 2011–2021)
 * COS30045 Data Visualisation Project | Group DV03_T25
 * Main Application Script: js/script.js
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initActiveNavSpy();
  initSmoothScroll();
  initChartCanvasPlaceholders();
});

/**
 * Elevates navbar with enhanced shadow and frosted background on scroll
 */
function initStickyNavbar() {
  const navbar = document.querySelector('nav.sticky-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Highlights the active navigation chip based on current viewport scroll position
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('#story-prologue, .story-chapter, #team');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Smooth scrolling with header offset for anchor jumps
 */
function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('a[href^="#"]');

  scrollTriggers.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Application namespace for future D3.js chart modules
 */
window.RoadTraumaApp = {
  // Chart Initializers - ready for D3.js implementation
  charts: {
    act1: {
      id: 'canvas-act1',
      title: 'National 11-Year Trajectory',
      initialized: false,
      render: function() {
        console.log('[RoadTraumaApp] Act 1 Canvas ready for D3 Multi-Line implementation.');
      }
    },
    act2: {
      id: 'canvas-act2',
      title: 'Road User Vulnerability Shift',
      initialized: false,
      render: function() {
        console.log('[RoadTraumaApp] Act 2 Canvas ready for D3 Diverging Bar / Stacked Stream.');
      }
    },
    act3: {
      id: 'canvas-act3',
      title: 'Demographic & Bed Days Burden',
      initialized: false,
      render: function() {
        console.log('[RoadTraumaApp] Act 3 Canvas ready for D3 Population Butterfly.');
      }
    },
    act4: {
      id: 'canvas-act4',
      title: 'Geographic Per-Capita Realities',
      initialized: false,
      render: function() {
        console.log('[RoadTraumaApp] Act 4 Canvas ready for D3 Choropleth Map.');
      }
    },
    act5: {
      id: 'canvas-act5',
      title: 'Remoteness & Healthcare Equity',
      initialized: false,
      render: function() {
        console.log('[RoadTraumaApp] Act 5 Canvas ready for D3 Remoteness Treemap / Matrix.');
      }
    }
  }
};

function initChartCanvasPlaceholders() {
  console.log('[RoadTraumaApp] Scrollytelling visual application loaded successfully.');
}

