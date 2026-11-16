/**
 * ============================================================
 * AUSTRALIAN ROAD TRAUMA INSIGHTS (BITRE 2011–2021)
 * COS30045 Data Visualisation Project | Group DV03_T25
 * Main Application Script: js/script.js
 * ============================================================
 */

const nationalTrendCsv = `Calendar year,Hospitalisations
2011,34033
2012,34024
2013,35001
2014,35515
2015,37082
2016,38963
2017,39339
2018,39590
2019,39866
2020,37966
2021,39505`;

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initActiveNavSpy();
  initSmoothScroll();
  initNationalTrendChart();
  initChartCanvasPlaceholders();
});

function initNationalTrendChart() {
  const target = document.querySelector('#canvas-act1');
  if (!target || typeof d3 === 'undefined') return;

  const rows = d3.csvParse(nationalTrendCsv, d => ({
    year: Number(d['Calendar year']),
    value: Number(d.Hospitalisations)
  }));

  if (!rows.length) return;

  const firstYear = rows[0];
  const lastYear = rows[rows.length - 1];
  const yearDelta = lastYear.value - firstYear.value;
  const percentChange = ((yearDelta / firstYear.value) * 100).toFixed(1);

  const targetNode = d3.select(target);
  targetNode.selectAll('*').remove();

  targetNode.append('span')
    .attr('class', 'canvas-badge')
    .text('Visualization Canvas • Section 1');

  targetNode.append('h3')
    .attr('class', 'canvas-heading')
    .text('National Trend & Policy Reporting Breaks');

  targetNode.append('p')
    .attr('class', 'canvas-sub')
    .text('Hospitalisations from 2011 to 2021, with the 2012 and 2017 reporting changes and the 2020 pandemic interruption reflected in the time-series pattern.');

  const chartShell = targetNode.append('div').attr('class', 'chart-shell');

  chartShell.append('div')
    .attr('class', 'chart-summary')
    .selectAll('span')
    .data([
      `2011: ${firstYear.value.toLocaleString()}`,
      `2021: ${lastYear.value.toLocaleString()}`,
      `Change: ${percentChange}%`
    ])
    .join('span')
    .attr('class', 'chart-kpi')
    .text(d => d);

  const width = 900;
  const height = 280;
  const margin = { top: 20, right: 20, bottom: 36, left: 56 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const x = d3.scaleLinear()
    .domain(d3.extent(rows, d => d.year))
    .range([margin.left, width - margin.right]);

  const minValue = d3.min(rows, d => d.value);
  const maxValue = d3.max(rows, d => d.value);
  const y = d3.scaleLinear()
    .domain([Math.min(minValue, 0), maxValue + 1500])
    .range([height - margin.bottom, margin.top]);

  const svg = chartShell.append('svg')
    .attr('class', 'chart-svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', 'Hospitalisation trend chart from 2011 to 2021');

  svg.append('g')
    .selectAll('line')
    .data(y.ticks(5))
    .join('line')
    .attr('class', 'chart-grid-line')
    .attr('x1', margin.left)
    .attr('x2', width - margin.right)
    .attr('y1', d => y(d))
    .attr('y2', d => y(d));

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d3.format(',')(d)))
    .call(g => g.select('.domain').attr('stroke', 'rgba(100, 116, 139, 0.35)'))
    .call(g => g.selectAll('line').attr('stroke', 'rgba(100, 116, 139, 0.3)'))
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(rows.map(d => d.year)).tickFormat(d3.format('d')))
    .call(g => g.select('.domain').attr('stroke', 'rgba(100, 116, 139, 0.35)'))
    .call(g => g.selectAll('line').attr('stroke', 'rgba(100, 116, 139, 0.3)'))
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

  svg.append('path')
    .datum(rows)
    .attr('class', 'chart-line')
    .attr('d', line);

  svg.selectAll('circle')
    .data(rows)
    .join('circle')
    .attr('class', d => d.year === 2011 || d.year === 2021 ? 'chart-point chart-point--highlight' : 'chart-point')
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.value))
    .attr('r', 5);

  const table = chartShell.append('table').attr('class', 'chart-data-table');
  table.append('thead').append('tr')
    .selectAll('th')
    .data(['Year', 'Hospitalisations'])
    .join('th')
    .text(d => d);

  table.append('tbody')
    .selectAll('tr')
    .data(rows)
    .join('tr')
    .selectAll('td')
    .data(d => [d.year, d.value.toLocaleString()])
    .join('td')
    .text(d => d);

  targetNode.append('div')
    .attr('class', 'canvas-candidate-pills')
    .selectAll('span')
    .data([
      'Candidate: Annotated Multi-Line Chart',
      'Candidate: Longitudinal Stepped Area',
      'Candidate: Horizon Chart'
    ])
    .join('span')
    .attr('class', 'candidate-pill')
    .text(d => d);
}

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

