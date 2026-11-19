/**
 * ============================================================
 * AUSTRALIAN ROAD TRAUMA INSIGHTS (BITRE 2011–2021)
 * COS30045 Data Visualisation Project | Group DV03_T25
 * Main Application Script: js/script.js
 * Visualizations:
 *   Q1: Line Chart
 *   Q2: Multi-line Chart (Top 5 / Remaining / Show All)
 *   Q3: Choropleth Map (year dropdown 2011–2021)
 *   Q4: Heatmap
 *   Q5: Small Multiples (Area Charts)
 * Accessibility: WCAG 2.1 AA+ Compliant
 * ============================================================
 */

// Embedded Data Fallbacks for instant file:/// & web-server compatibility
const DATA_FALLBACKS = {
  q1: [
    { year: 2011, value: 34033 }, { year: 2012, value: 34024 }, { year: 2013, value: 35001 },
    { year: 2014, value: 35515 }, { year: 2015, value: 37082 }, { year: 2016, value: 38963 },
    { year: 2017, value: 39339 }, { year: 2018, value: 39590 }, { year: 2019, value: 39866 },
    { year: 2020, value: 37966 }, { year: 2021, value: 39505 }
  ],
  q2: [
    { year: 2011, "2- or 3- wheeled motor vehicle": 246, "Car, pick-up truck or van": 14014, "Fixed or stationary object": 4933, "Heavy transport vehicle or bus": 1069, "Non-collision transport accident": 8643, "Other and unspecified transport accidents": 4416, "Other non-motor vehicle": 46, "Pedal cycle": 280, "Pedestrian or animal": 342, "Train": 44 },
    { year: 2012, "2- or 3- wheeled motor vehicle": 217, "Car, pick-up truck or van": 13786, "Fixed or stationary object": 4899, "Heavy transport vehicle or bus": 1021, "Non-collision transport accident": 8815, "Other and unspecified transport accidents": 4515, "Other non-motor vehicle": 43, "Pedal cycle": 321, "Pedestrian or animal": 380, "Train": 27 },
    { year: 2013, "2- or 3- wheeled motor vehicle": 233, "Car, pick-up truck or van": 13999, "Fixed or stationary object": 4978, "Heavy transport vehicle or bus": 1104, "Non-collision transport accident": 9417, "Other and unspecified transport accidents": 4330, "Other non-motor vehicle": 50, "Pedal cycle": 431, "Pedestrian or animal": 434, "Train": 25 },
    { year: 2014, "2- or 3- wheeled motor vehicle": 244, "Car, pick-up truck or van": 14258, "Fixed or stationary object": 5062, "Heavy transport vehicle or bus": 1077, "Non-collision transport accident": 9639, "Other and unspecified transport accidents": 4361, "Other non-motor vehicle": 60, "Pedal cycle": 366, "Pedestrian or animal": 424, "Train": 24 },
    { year: 2015, "2- or 3- wheeled motor vehicle": 267, "Car, pick-up truck or van": 15318, "Fixed or stationary object": 5304, "Heavy transport vehicle or bus": 1074, "Non-collision transport accident": 9870, "Other and unspecified transport accidents": 4347, "Other non-motor vehicle": 46, "Pedal cycle": 418, "Pedestrian or animal": 406, "Train": 32 },
    { year: 2016, "2- or 3- wheeled motor vehicle": 288, "Car, pick-up truck or van": 16551, "Fixed or stationary object": 5607, "Heavy transport vehicle or bus": 1138, "Non-collision transport accident": 9911, "Other and unspecified transport accidents": 4553, "Other non-motor vehicle": 56, "Pedal cycle": 401, "Pedestrian or animal": 420, "Train": 38 },
    { year: 2017, "2- or 3- wheeled motor vehicle": 255, "Car, pick-up truck or van": 16966, "Fixed or stationary object": 5451, "Heavy transport vehicle or bus": 1183, "Non-collision transport accident": 10089, "Other and unspecified transport accidents": 4395, "Other non-motor vehicle": 75, "Pedal cycle": 432, "Pedestrian or animal": 469, "Train": 24 },
    { year: 2018, "2- or 3- wheeled motor vehicle": 236, "Car, pick-up truck or van": 16805, "Fixed or stationary object": 5558, "Heavy transport vehicle or bus": 1112, "Non-collision transport accident": 10368, "Other and unspecified transport accidents": 4452, "Other non-motor vehicle": 102, "Pedal cycle": 416, "Pedestrian or animal": 501, "Train": 40 },
    { year: 2019, "2- or 3- wheeled motor vehicle": 299, "Car, pick-up truck or van": 17109, "Fixed or stationary object": 5539, "Heavy transport vehicle or bus": 1072, "Non-collision transport accident": 10040, "Other and unspecified transport accidents": 4750, "Other non-motor vehicle": 79, "Pedal cycle": 464, "Pedestrian or animal": 488, "Train": 26 },
    { year: 2020, "2- or 3- wheeled motor vehicle": 298, "Car, pick-up truck or van": 14668, "Fixed or stationary object": 5656, "Heavy transport vehicle or bus": 893, "Non-collision transport accident": 10905, "Other and unspecified transport accidents": 4682, "Other non-motor vehicle": 55, "Pedal cycle": 391, "Pedestrian or animal": 395, "Train": 23 },
    { year: 2021, "2- or 3- wheeled motor vehicle": 300, "Car, pick-up truck or van": 16192, "Fixed or stationary object": 5596, "Heavy transport vehicle or bus": 1020, "Non-collision transport accident": 10728, "Other and unspecified transport accidents": 4644, "Other non-motor vehicle": 64, "Pedal cycle": 451, "Pedestrian or animal": 481, "Train": 29 }
  ],
  q3: [
    { year: 2011, ACT: 537, NSW: 10618, NT: 456, QLD: 6322, SA: 2359, TAS: 493, VIC: 9326, WA: 3442 },
    { year: 2012, ACT: 601, NSW: 11121, NT: 496, QLD: 6813, SA: 2311, TAS: 536, VIC: 8098, WA: 3493 },
    { year: 2013, ACT: 573, NSW: 11421, NT: 561, QLD: 7821, SA: 2221, TAS: 570, VIC: 7784, WA: 3475 },
    { year: 2014, ACT: 542, NSW: 11313, NT: 575, QLD: 7725, SA: 2381, TAS: 646, VIC: 8523, WA: 3154 },
    { year: 2015, ACT: 700, NSW: 11084, NT: 691, QLD: 8306, SA: 2467, TAS: 677, VIC: 9198, WA: 3183 },
    { year: 2016, ACT: 654, NSW: 11474, NT: 709, QLD: 8702, SA: 2654, TAS: 657, VIC: 10360, WA: 3031 },
    { year: 2017, ACT: 632, NSW: 11016, NT: 703, QLD: 9134, SA: 2394, TAS: 659, VIC: 10794, WA: 3195 },
    { year: 2018, ACT: 712, NSW: 9794, NT: 832, QLD: 9381, SA: 2489, TAS: 781, VIC: 11453, WA: 3274 },
    { year: 2019, ACT: 665, NSW: 9942, NT: 656, QLD: 9515, SA: 2457, TAS: 708, VIC: 11392, WA: 3534 },
    { year: 2020, ACT: 629, NSW: 9274, NT: 787, QLD: 9801, SA: 2503, TAS: 778, VIC: 9884, WA: 3636 },
    { year: 2021, ACT: 740, NSW: 9003, NT: 710, QLD: 10447, SA: 2632, TAS: 805, VIC: 11130, WA: 3568 }
  ],
  q4: [
    { year: 2011, majorCities: 21870, regional: 10461, remote: 1156 },
    { year: 2012, majorCities: 21812, regional: 10321, remote: 1263 },
    { year: 2013, majorCities: 23134, regional: 9984, remote: 1220 },
    { year: 2014, majorCities: 23481, regional: 10135, remote: 1153 },
    { year: 2015, majorCities: 24557, regional: 10502, remote: 1178 },
    { year: 2016, majorCities: 26344, regional: 10662, remote: 1144 },
    { year: 2017, majorCities: 26279, regional: 11038, remote: 1054 },
    { year: 2018, majorCities: 26168, regional: 11209, remote: 1200 },
    { year: 2019, majorCities: 26555, regional: 11045, remote: 1099 },
    { year: 2020, majorCities: 24925, regional: 11054, remote: 1172 },
    { year: 2021, majorCities: 26355, regional: 11407, remote: 1114 }
  ],
  q5: [
    { year: 2011, "0-7": 92, "8-16": 204, "17-25": 335, "26-39": 286, "40-64": 226, "65+": 24 },
    { year: 2012, "0-7": 81, "8-16": 229, "17-25": 385, "26-39": 372, "40-64": 315, "65+": 22 },
    { year: 2013, "0-7": 78, "8-16": 242, "17-25": 422, "26-39": 366, "40-64": 279, "65+": 27 },
    { year: 2014, "0-7": 49, "8-16": 220, "17-25": 422, "26-39": 388, "40-64": 314, "65+": 14 },
    { year: 2015, "0-7": 79, "8-16": 239, "17-25": 420, "26-39": 449, "40-64": 372, "65+": 41 },
    { year: 2016, "0-7": 89, "8-16": 254, "17-25": 501, "26-39": 422, "40-64": 374, "65+": 29 },
    { year: 2017, "0-7": 81, "8-16": 251, "17-25": 506, "26-39": 435, "40-64": 418, "65+": 42 },
    { year: 2018, "0-7": 70, "8-16": 253, "17-25": 607, "26-39": 542, "40-64": 411, "65+": 47 },
    { year: 2019, "0-7": 78, "8-16": 248, "17-25": 521, "26-39": 539, "40-64": 411, "65+": 59 },
    { year: 2020, "0-7": 82, "8-16": 295, "17-25": 705, "26-39": 659, "40-64": 496, "65+": 53 },
    { year: 2021, "0-7": 86, "8-16": 291, "17-25": 686, "26-39": 597, "40-64": 515, "65+": 45 }
  ]
};

// Simplified Australia Geographic Boundaries GeoJSON for Choropleth Map (Q3)
const AUSTRALIA_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "WA",
      properties: { name: "Western Australia", code: "WA" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [129.0, -14.8], [129.0, -31.7], [124.0, -33.9], [121.9, -33.9],
          [115.1, -34.3], [115.7, -32.0], [114.1, -28.8], [113.1, -25.8],
          [114.1, -21.8], [117.0, -20.6], [118.6, -20.3], [122.2, -18.0],
          [123.0, -16.4], [128.3, -14.8], [129.0, -14.8]
        ]]
      }
    },
    {
      type: "Feature",
      id: "NT",
      properties: { name: "Northern Territory", code: "NT" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [129.0, -14.8], [130.8, -12.4], [133.5, -11.5], [136.8, -12.2],
          [136.0, -14.0], [138.0, -16.5], [138.0, -26.0], [129.0, -26.0],
          [129.0, -14.8]
        ]]
      }
    },
    {
      type: "Feature",
      id: "SA",
      properties: { name: "South Australia", code: "SA" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [129.0, -26.0], [141.0, -26.0], [141.0, -38.0], [138.5, -35.6],
          [137.0, -35.2], [137.8, -32.5], [136.0, -35.0], [133.0, -32.0],
          [129.0, -31.7], [129.0, -26.0]
        ]]
      }
    },
    {
      type: "Feature",
      id: "QLD",
      properties: { name: "Queensland", code: "QLD" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [138.0, -16.5], [141.0, -17.5], [142.5, -10.7], [145.8, -16.9],
          [146.8, -19.2], [149.2, -21.1], [153.3, -25.0], [153.1, -27.5],
          [153.5, -28.2], [141.0, -29.0], [141.0, -26.0], [138.0, -26.0],
          [138.0, -16.5]
        ]]
      }
    },
    {
      type: "Feature",
      id: "NSW",
      properties: { name: "New South Wales", code: "NSW" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [141.0, -29.0], [153.5, -28.2], [151.8, -32.9], [151.2, -33.9],
          [150.0, -37.5], [146.8, -36.0], [141.0, -34.0], [141.0, -29.0]
        ]]
      }
    },
    {
      type: "Feature",
      id: "ACT",
      properties: { name: "Australian Capital Territory", code: "ACT" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [148.8, -35.1], [149.4, -35.1], [149.4, -35.9], [148.8, -35.9], [148.8, -35.1]
        ]]
      }
    },
    {
      type: "Feature",
      id: "VIC",
      properties: { name: "Victoria", code: "VIC" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [141.0, -34.0], [146.8, -36.0], [150.0, -37.5], [146.4, -39.0],
          [144.9, -38.2], [143.5, -38.8], [141.0, -38.1], [141.0, -34.0]
        ]]
      }
    },
    {
      type: "Feature",
      id: "TAS",
      properties: { name: "Tasmania", code: "TAS" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [144.6, -40.6], [148.3, -40.8], [148.3, -42.2], [147.9, -43.2],
          [146.8, -43.6], [145.2, -43.4], [144.7, -42.2], [144.6, -40.6]
        ]]
      }
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initActiveNavSpy();
  initSmoothScroll();
  initAllCharts();
});

/**
 * Main Chart Initializer: connects to CSVs or fallbacks
 */
async function initAllCharts() {
  if (typeof d3 === 'undefined') {
    console.error('D3.js library not loaded.');
    return;
  }

  // 1. Chart Q1: Line chart (National Trend)
  const q1Data = await loadCsvData('data/Q1_National_Trend.csv', row => ({
    year: Number(row['Calendar year']),
    value: Number(row.Hospitalisations)
  }), DATA_FALLBACKS.q1);
  renderQ1LineChart(q1Data);

  // 2. Chart Q2: Multi-line chart (Crash Circumstances)
  const q2Data = await loadCsvData('data/Q2_Crash_Circumstances.csv', row => {
    const parsed = { year: Number(row['Calendar year']) };
    Object.keys(row).forEach(k => {
      if (k !== 'Calendar year') parsed[k] = Number(row[k]) || 0;
    });
    return parsed;
  }, DATA_FALLBACKS.q2);
  renderQ2LineChart(q2Data);

  // 3. Chart Q3: Choropleth Map (Jurisdictional Differences)
  const q3Data = await loadCsvData('data/Q3_Jurisdictions.csv', row => {
    const parsed = { year: Number(row['calendar year'] || row['Calendar year']) };
    ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'].forEach(jur => {
      parsed[jur] = Number(row[jur]) || 0;
    });
    return parsed;
  }, DATA_FALLBACKS.q3);
  renderQ3ChoroplethMap(q3Data);

  // 4. Chart Q4: Heatmap (Remoteness Distribution)
  const q4Data = await loadCsvData('data/Q4_Remoteness.csv', row => ({
    year: Number(row['Calendar year']),
    majorCities: Number(row['Major Cities']) || 0,
    regional: Number(row.Regional) || 0,
    remote: Number(row.Remote) || 0
  }), DATA_FALLBACKS.q4);
  renderQ4Heatmap(q4Data);

  // 5. Chart Q5: Small Multiples Area Charts (First Nations Age Groups)
  const q5Data = await loadCsvData('data/Q5_First_Nations_Age_Groups.csv', row => {
    const parsed = { year: Number(row['Calendar year']) };
    ['0-7', '8-16', '17-25', '26-39', '40-64', '65+'].forEach(ag => {
      parsed[ag] = Number(row[ag]) || 0;
    });
    return parsed;
  }, DATA_FALLBACKS.q5);
  renderQ5SmallMultiples(q5Data);
}

/**
 * Universal CSV Loader with safe CORS/file:/// fallback
 */
async function loadCsvData(url, rowParser, fallbackData) {
  try {
    const data = await d3.csv(url, rowParser);
    if (data && data.length) return data;
  } catch (err) {
    console.warn(`[Data Loader] Live CSV load failed for ${url} (likely local file:// protocol). Using embedded clean dataset fallback.`);
  }
  return fallbackData;
}

function createTooltip(container) {
  let tooltip = container.select('.chart-tooltip');
  if (tooltip.empty()) {
    tooltip = container.append('div').attr('class', 'chart-tooltip').attr('role', 'status');
  }
  return tooltip;
}

/* ============================================================
   CHART 1 (Q1): LINE CHART (National Trend 2011–2021)
   ============================================================ */
function renderQ1LineChart(data) {
  const container = d3.select('#canvas-act1');
  if (container.empty() || !data.length) return;
  container.selectAll('*').remove();

  const width = 850;
  const height = 300;
  const margin = { top: 25, right: 30, bottom: 45, left: 65 };

  const firstVal = data[0].value;
  const lastVal = data[data.length - 1].value;
  const changePercent = (((lastVal - firstVal) / firstVal) * 100).toFixed(1);

  const header = container.append('div').attr('class', 'chart-header-row');
  header.append('div').attr('class', 'chart-heading-group')
    .html('<h3>National Hospitalisations Line Chart (2011–2021)</h3><p>Shows changes in hospitalisation counts over time to identify overall trends</p>');

  const kpiRow = container.append('div').attr('class', 'chart-kpi-row');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').text(`2011: ${firstVal.toLocaleString()}`);
  kpiRow.append('span').attr('class', 'chart-kpi-pill').style('color', '#DC2626').style('font-weight', '800').text('★ Highest Year: 2019 (39,866)');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').text(`2021: ${lastVal.toLocaleString()}`);
  kpiRow.append('span').attr('class', 'chart-kpi-pill').style('color', '#047857').text(`11-Year Growth: +${changePercent}%`);

  const svgWrap = container.append('div').attr('class', 'chart-svg-wrap');
  const tooltip = createTooltip(container);

  const svg = svgWrap.append('svg')
    .attr('class', 'chart-svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', `National hospitalisation line chart rising from ${firstVal} in 2011 to a peak of 39,866 in 2019 and closing at ${lastVal} in 2021`);

  const x = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([30000, 42000]).range([height - margin.bottom, margin.top]);

  // Grid
  svg.append('g').selectAll('line')
    .data(y.ticks(5)).join('line')
    .attr('class', 'chart-grid-line')
    .attr('x1', margin.left).attr('x2', width - margin.right)
    .attr('y1', d => y(d)).attr('y2', d => y(d));

  // Axes
  svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(data.map(d => d.year)).tickFormat(d3.format('d')))
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

  svg.append('g').attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d.toLocaleString()))
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

  // Area & Line
  const area = d3.area().x(d => x(d.year)).y0(height - margin.bottom).y1(d => y(d.value)).curve(d3.curveMonotoneX);
  const line = d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX);

  svg.append('path').datum(data).attr('class', 'chart-area').attr('d', area);
  svg.append('path').datum(data).attr('class', 'chart-line').attr('d', line);

  // Markers
  const peakYear = data.find(d => d.year === 2019);
  if (peakYear) {
    svg.append('text')
      .attr('x', x(2019))
      .attr('y', y(peakYear.value) - 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '800')
      .attr('fill', '#DC2626')
      .text('Highest: 39,866');

    svg.append('line')
      .attr('x1', x(2019)).attr('x2', x(2019))
      .attr('y1', y(peakYear.value) - 10).attr('y2', y(peakYear.value) - 4)
      .attr('stroke', '#DC2626')
      .attr('stroke-width', 2);
  }

  const covidYear = data.find(d => d.year === 2020);
  if (covidYear) {
    svg.append('text')
      .attr('x', x(2020))
      .attr('y', y(covidYear.value) + 26)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('fill', '#B45309')
      .text('COVID-19 Dip');
  }

  // Dots
  svg.selectAll('circle')
    .data(data).join('circle')
    .attr('class', d => {
      if (d.year === 2019) return 'chart-point chart-point--peak';
      if (d.year === 2011 || d.year === 2021 || d.year === 2020) return 'chart-point chart-point--highlight';
      return 'chart-point';
    })
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.value))
    .attr('r', d => d.year === 2019 ? 7 : 5)
    .attr('tabindex', '0')
    .attr('aria-label', d => `Year ${d.year}: ${d.value.toLocaleString()} hospitalisations${d.year === 2019 ? ' (Highest Year)' : ''}`)
    .on('mouseenter focus', (event, d) => {
      tooltip.style('opacity', 1)
        .html(`<strong>${d.year}</strong>: ${d.value.toLocaleString()} hospitalisations${d.year === 2019 ? '<br/><span style="color:#FCA5A5;font-weight:700;">★ Highest Year (Peak)</span>' : ''}`)
        .style('left', `${x(d.year) - 20}px`)
        .style('top', `${y(d.value) + 20}px`);
    })
    .on('mouseleave blur', () => tooltip.style('opacity', 0));
}


/* ============================================================
   CHART 2 (Q2): MULTI-LINE CHART
   COUNTERPARTY PATTERNS (2011–2021)
   X axis = year | Buttons: Top 5 / Remaining / Show All
   ============================================================ */
function renderQ2LineChart(data) {
  const container = d3.select('#canvas-act2');
  if (container.empty() || !data.length) return;
  container.selectAll('*').remove();

  const TOP5 = [
    'Car, pick-up truck or van',
    'Non-collision transport accident',
    'Fixed or stationary object',
    'Other and unspecified transport accidents',
    'Heavy transport vehicle or bus'
  ];
  const allCats = Object.keys(data[0]).filter(k => k !== 'year');
  const REMAINING = allCats.filter(c => !TOP5.includes(c));

  // One fixed colour per category so colours stay the same across views
  const PALETTE = ['#0369A1', '#DC2626', '#047857', '#B45309', '#7C3AED',
                   '#DB2777', '#0D9488', '#4F46E5', '#65A30D', '#475569'];
  const ORDER = TOP5.concat(REMAINING);
  const color = name => PALETTE[ORDER.indexOf(name) % PALETTE.length];

  const VIEWS = {
    top5:      { label: 'Top 5',     cats: TOP5 },
    remaining: { label: 'Remaining', cats: REMAINING },
    all:       { label: 'Show All',  cats: ORDER }
  };
  let selectedView = 'top5';

  // Header + buttons
  const header = container.append('div').attr('class', 'chart-header-row');
  header.append('div').attr('class', 'chart-heading-group')
    .html('<h3>Counterparty Patterns: Hospitalisations by Year</h3><p>Compare how each vehicle, road user and object category changed from 2011 to 2021.</p>');

  const controls = header.append('div').attr('class', 'chart-controls')
    .attr('role', 'group').attr('aria-label', 'Choose which categories to display');

  Object.entries(VIEWS).forEach(([key, v]) => {
    controls.append('button')
      .attr('class', `chart-btn ${key === selectedView ? 'active' : ''}`)
      .attr('data-view', key)
      .attr('aria-pressed', key === selectedView)
      .text(v.label)
      .on('click', function () {
        selectedView = key;
        controls.selectAll('.chart-btn')
          .classed('active', false).attr('aria-pressed', 'false');
        d3.select(this).classed('active', true).attr('aria-pressed', 'true');
        tooltip.style('opacity', 0);
        update();
      });
  });

  const kpiRow = container.append('div').attr('class', 'chart-kpi-row');
  const countKpi = kpiRow.append('span').attr('class', 'chart-kpi-pill');
  const topKpi = kpiRow.append('span').attr('class', 'chart-kpi-pill');

  const chartBody = container.append('div');
  const legend = container.append('div').attr('class', 'q2-legend').attr('aria-label', 'Chart legend');
  const tooltip = createTooltip(container);

  const width = 850, height = 400;
  const margin = { top: 20, right: 30, bottom: 45, left: 70 };

  function showTip(event, el, html) {
    const box = container.node().getBoundingClientRect();
    let mx, my;
    if (event.type === 'focus') {
      const r = el.getBoundingClientRect();
      mx = r.left - box.left + r.width / 2;
      my = r.top - box.top;
    } else {
      [mx, my] = d3.pointer(event, container.node());
    }
    tooltip.style('opacity', 1).html(html)
      .style('left', `${mx + 12}px`)
      .style('top', `${my - 40}px`);
  }

  function update() {
    const cats = VIEWS[selectedView].cats;
    chartBody.selectAll('*').remove();
    legend.selectAll('*').remove();

    // KPI pills
    const totals = cats.map(c => ({ name: c, total: d3.sum(data, d => d[c]) }))
      .sort((a, b) => b.total - a.total);
    countKpi.text(`Showing ${cats.length} categories`);
    topKpi.text(`Largest over 2011–2021: ${totals[0].name} (${totals[0].total.toLocaleString()})`);

    const series = cats.map(c => ({
      name: c,
      values: data.map(d => ({ year: d.year, value: d[c] }))
    }));

    const maxVal = d3.max(series, s => d3.max(s.values, v => v.value));
    const x = d3.scaleLinear().domain(d3.extent(data, d => d.year))
      .range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, maxVal * 1.1]).nice()
      .range([height - margin.bottom, margin.top]);

    const svg = chartBody.append('div').attr('class', 'chart-svg-wrap')
      .append('svg').attr('class', 'chart-svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', `Line chart of hospitalisations by year for ${VIEWS[selectedView].label} categories`);

    // Grid
    svg.append('g').selectAll('line').data(y.ticks(5)).join('line')
      .attr('class', 'chart-grid-line')
      .attr('x1', margin.left).attr('x2', width - margin.right)
      .attr('y1', d => y(d)).attr('y2', d => y(d));

    // Axes
    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickValues(data.map(d => d.year)).tickFormat(d3.format('d')))
      .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(',')))
      .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

    svg.append('text').attr('class', 'chart-axis-label')
      .attr('x', 14).attr('y', margin.top - 6).text('Hospitalisations');

    // Lines
    const line = d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX);
    const groups = svg.selectAll('.q2-series').data(series).join('g')
      .attr('class', 'q2-series').attr('data-name', d => d.name);

    groups.append('path')
      .attr('fill', 'none')
      .attr('stroke', d => color(d.name))
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', d => line(d.values));

    // Points
    groups.each(function (s) {
      d3.select(this).selectAll('circle').data(s.values).join('circle')
        .attr('class', 'q2-point')
        .attr('cx', d => x(d.year)).attr('cy', d => y(d.value))
        .attr('r', 4)
        .attr('fill', '#FFFFFF')
        .attr('stroke', color(s.name))
        .attr('stroke-width', 2.5)
        .attr('tabindex', '0')
        .attr('aria-label', d => `${s.name}, ${d.year}: ${d.value.toLocaleString()} hospitalisations`)
        .on('mouseenter focus', function (event, d) {
          d3.select(this).attr('r', 7);
          showTip(event, this, `<strong>${s.name}</strong><br/>Year <strong>${d.year}</strong>: <strong>${d.value.toLocaleString()}</strong> hospitalisations`);
        })
        .on('mouseleave blur', function () {
          d3.select(this).attr('r', 4);
          tooltip.style('opacity', 0);
        });
    });

    // Legend: HTML, wraps onto as many rows as needed, so no label is ever cut off
    const items = legend.selectAll('.q2-legend-item').data(series).join('div')
      .attr('class', 'q2-legend-item')
      .on('mouseenter', (e, s) => highlight(s.name))
      .on('mouseleave', () => highlight(null));

    items.append('span').attr('class', 'q2-legend-swatch')
      .style('background', s => color(s.name));
    items.append('span').text(s => s.name);

    function highlight(name) {
      groups.style('opacity', s => (!name || s.name === name) ? 1 : 0.15);
    }
  }

  update();
}


/* ============================================================
   CHART 3 (Q3): CHOROPLETH MAP (Jurisdictions Across Australia)
   Year dropdown: 2011–2021
   ============================================================ */
function renderQ3ChoroplethMap(data) {
  const container = d3.select('#canvas-act3');
  if (container.empty() || !data.length) return;
  container.selectAll('*').remove();

  let selectedYear = 2021;
  const header = container.append('div').attr('class', 'chart-header-row');
  header.append('div').attr('class', 'chart-heading-group')
    .html('<h3>Australia Jurisdictions Choropleth Map</h3><p>Sequential blue shading: Darker blue indicates higher hospitalisation counts. Hover over states for exact details.</p>');

  // Year Selection (dropdown, 2011–2021)
  const controls = header.append('div').attr('class', 'chart-controls');
  controls.append('label').attr('class', 'control-label')
    .attr('for', 'q3-year-select').text('Select Year:');

  const yearSelect = controls.append('select')
    .attr('id', 'q3-year-select')
    .attr('class', 'chart-select')
    .attr('aria-label', 'Select year for the jurisdictions map');

  const years = data.map(d => d.year).sort((a, b) => a - b);
  yearSelect.selectAll('option').data(years).join('option')
    .attr('value', d => d)
    .property('selected', d => d === selectedYear)
    .text(d => d);

  yearSelect.on('change', function () {
    selectedYear = Number(this.value);
    tooltip.style('opacity', 0);
    updateMap();
  });

  const chartBody = container.append('div');
  const tooltip = createTooltip(container);

  // 5-Tier Sequential Blue Scale with Clear Contrast:
  // Low (<1,000) = Very light blue (#BAE6FD)
  // Moderate-Low (1,000–3,500) = Soft blue (#60A5FA)
  // Moderate (3,500–7,500) = Medium blue (#2563EB)
  // High (7,500–10,000) = Dark blue (#1D4ED8)
  // Highest (10,000+) = Deep Dark Blue (#092347)
  const COLOR_TIERS = [
    { max: 1000, label: '< 1,000', tier: 'Lowest', color: '#BAE6FD', darkText: true },
    { max: 3500, label: '1,000 – 3,500', tier: 'Moderate-Low', color: '#60A5FA', darkText: true },
    { max: 7500, label: '3,500 – 7,500', tier: 'Moderate', color: '#2563EB', darkText: false },
    { max: 10000, label: '7,500 – 10,000', tier: 'High', color: '#1D4ED8', darkText: false },
    { max: Infinity, label: '10,000+', tier: 'Highest', color: '#092347', darkText: false }
  ];

  function getTier(val) {
    for (let i = 0; i < COLOR_TIERS.length; i++) {
      if (val < COLOR_TIERS[i].max) return COLOR_TIERS[i];
    }
    return COLOR_TIERS[COLOR_TIERS.length - 1];
  }

  function updateMap() {
    chartBody.selectAll('*').remove();
    const currRow = data.find(d => d.year === selectedYear) || data[data.length - 1];

    const width = 850;
    const height = 450;

    const svgWrap = chartBody.append('div').attr('class', 'chart-svg-wrap');
    const svg = svgWrap.append('svg')
      .attr('class', 'chart-svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', `Choropleth map of Australia road-crash hospitalisations in ${selectedYear}`);

    // Map Canvas Light Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#F8FAFC')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-width', 1)
      .attr('rx', 8);

    // D3 Projection
    const projection = d3.geoMercator()
      .fitSize([width - 80, height - 70], AUSTRALIA_GEOJSON);

    const pathGenerator = d3.geoPath().projection(projection);

    const stateGroup = svg.append('g').attr('transform', 'translate(40, 15)');

    // Map Paths
    stateGroup.selectAll('.state-path')
      .data(AUSTRALIA_GEOJSON.features).join('path')
      .attr('class', 'state-path')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const val = currRow[d.id] || 0;
        return getTier(val).color;
      })
      .attr('tabindex', '0')
      .attr('aria-label', d => `${d.properties.name} (${d.id}): ${(currRow[d.id] || 0).toLocaleString()} hospitalisations in ${selectedYear}`)
      .on('mouseenter focus', (event, d) => {
        const val = currRow[d.id] || 0;
        const total = d3.sum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], j => currRow[j] || 0);
        const share = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
        const tier = getTier(val);
        tooltip.style('opacity', 1)
          .html(`<strong>${d.properties.name} (${d.id})</strong><br/>
                 Year ${selectedYear}: <strong>${val.toLocaleString()}</strong> admissions<br/>
                 Tier: <strong>${tier.tier} (${tier.label})</strong><br/>
                 National Share: <strong>${share}%</strong>`)
          .style('left', `${event.pageX ? event.offsetX + 15 : 300}px`)
          .style('top', `${event.pageY ? event.offsetY - 20 : 150}px`);
      })
      .on('mouseleave blur', () => tooltip.style('opacity', 0));

    // Centroid Labels with Dynamic High Contrast
    stateGroup.selectAll('.state-label-text')
      .data(AUSTRALIA_GEOJSON.features).join('text')
      .attr('class', 'state-label-text')
      .attr('transform', d => {
        const centroid = pathGenerator.centroid(d);
        if (d.id === 'ACT') return `translate(${centroid[0] + 20}, ${centroid[1] - 4})`;
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('fill', d => {
        const val = currRow[d.id] || 0;
        return getTier(val).darkText ? '#0F172A' : '#FFFFFF';
      })
      .style('text-shadow', d => {
        const val = currRow[d.id] || 0;
        return getTier(val).darkText
          ? '0 1px 2px rgba(255, 255, 255, 0.95), 0 -1px 2px rgba(255, 255, 255, 0.95)'
          : '0 1px 3px rgba(0, 0, 0, 0.85), 0 -1px 2px rgba(0, 0, 0, 0.5)';
      })
      .text(d => d.id);

    // ACT Leader Line & Pin so ACT is easily visible inside NSW
    const actFeature = AUSTRALIA_GEOJSON.features.find(f => f.id === 'ACT');
    if (actFeature) {
      const actCentroid = pathGenerator.centroid(actFeature);
      stateGroup.append('circle')
        .attr('cx', actCentroid[0])
        .attr('cy', actCentroid[1])
        .attr('r', 3.5)
        .attr('fill', '#0F172A')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1.5)
        .attr('pointer-events', 'none');

      stateGroup.append('line')
        .attr('x1', actCentroid[0])
        .attr('y1', actCentroid[1])
        .attr('x2', actCentroid[0] + 13)
        .attr('y2', actCentroid[1] - 3)
        .attr('stroke', '#0F172A')
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '2,2')
        .attr('pointer-events', 'none');
    }

    // Comprehensive Numerical Range Legend (5 Sequential Steps)
    const legendG = svg.append('g').attr('transform', `translate(35, ${height - 68})`);

    // Legend Title
    legendG.append('text')
      .attr('x', 0)
      .attr('y', -8)
      .attr('font-size', '11px')
      .attr('font-weight', '800')
      .attr('fill', '#0F172A')
      .attr('letter-spacing', '0.04em')
      .text('HOSPITALISATION COUNT (ADMISSIONS):');

    const swatchWidth = 58;
    const swatchHeight = 13;
    COLOR_TIERS.forEach((tier, i) => {
      const block = legendG.append('g').attr('transform', `translate(${i * (swatchWidth + 2)}, 0)`);

      block.append('rect')
        .attr('width', swatchWidth)
        .attr('height', swatchHeight)
        .attr('fill', tier.color)
        .attr('stroke', '#94A3B8')
        .attr('stroke-width', 0.8)
        .attr('rx', 2);

      block.append('text')
        .attr('x', swatchWidth / 2)
        .attr('y', swatchHeight + 13)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9.5px')
        .attr('font-weight', '700')
        .attr('fill', '#1E293B')
        .text(tier.label);

      block.append('text')
        .attr('x', swatchWidth / 2)
        .attr('y', swatchHeight + 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8.5px')
        .attr('font-weight', '600')
        .attr('fill', '#64748B')
        .text(tier.tier);
    });
  }

  updateMap();
}

/* ============================================================
   CHART 4 (Q4): HEATMAP (Remoteness Distribution)
   ============================================================ */
function renderQ4Heatmap(data) {
  const container = d3.select('#canvas-act4');
  if (container.empty() || !data.length) return;
  container.selectAll('*').remove();

  const header = container.append('div').attr('class', 'chart-header-row');
  header.append('div').attr('class', 'chart-heading-group')
    .html('<h3>Remoteness Distribution Heatmap (2011–2021)</h3><p>Uses colour shades to compare hospitalisation counts across areas and years</p>');

  const kpiRow = container.append('div').attr('class', 'chart-kpi-row');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').text('Major Cities: Deep Blue (21k–26k)');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').text('Regional: Medium Teal (9.9k–11.4k)');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').style('color', '#B45309').text('Remote: Soft Amber (1.0k–1.2k)');

  const width = 850;
  const height = 240;
  const margin = { top: 20, right: 30, bottom: 45, left: 140 };

  const svgWrap = container.append('div').attr('class', 'chart-svg-wrap');
  const tooltip = createTooltip(container);

  const svg = svgWrap.append('svg')
    .attr('class', 'chart-svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', 'Heatmap comparing road crash hospitalisations across Major Cities, Regional, and Remote areas from 2011 to 2021');

  const areas = ['Major Cities', 'Regional', 'Remote'];
  const years = data.map(d => d.year);

  // Flatten data for heatmap cells
  const cells = [];
  data.forEach(d => {
    cells.push({ year: d.year, area: 'Major Cities', value: d.majorCities });
    cells.push({ year: d.year, area: 'Regional', value: d.regional });
    cells.push({ year: d.year, area: 'Remote', value: d.remote });
  });

  const x = d3.scaleBand().domain(years).range([margin.left, width - margin.right]).padding(0.06);
  const y = d3.scaleBand().domain(areas).range([margin.top, height - margin.bottom]).padding(0.12);

  // Heatmap Color Scale
  const colorScale = d3.scaleSequential()
    .domain([1000, 27000])
    .interpolator(d3.interpolateBlues);

  // X Axis
  svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')))
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

  // Y Axis
  svg.append('g').attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(0))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text').attr('class', 'chart-axis-label').style('font-size', '13px').style('font-weight', '700'));

  // Cells
  svg.selectAll('.heatmap-cell')
    .data(cells).join('rect')
    .attr('class', 'heatmap-cell')
    .attr('x', d => x(d.year))
    .attr('y', d => y(d.area))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', d => colorScale(d.value))
    .attr('rx', 4)
    .attr('tabindex', '0')
    .attr('aria-label', d => `${d.area} (${d.year}): ${d.value.toLocaleString()} hospitalisations`)
    .on('mouseenter focus', (event, d) => {
      tooltip.style('opacity', 1)
        .html(`<strong>${d.area} - ${d.year}</strong><br/>Hospitalised: <strong>${d.value.toLocaleString()}</strong>`)
        .style('left', `${x(d.year) + 10}px`)
        .style('top', `${y(d.area) + 40}px`);
    })
    .on('mouseleave blur', () => tooltip.style('opacity', 0));

  // Cell Text Values
  svg.selectAll('.heatmap-cell-text')
    .data(cells).join('text')
    .attr('class', 'heatmap-cell-text')
    .attr('x', d => x(d.year) + x.bandwidth() / 2)
    .attr('y', d => y(d.area) + y.bandwidth() / 2)
    .attr('fill', d => d.value > 15000 ? '#FFFFFF' : '#0F172A')
    .text(d => {
      if (d.value >= 1000) return `${(d.value / 1000).toFixed(1)}k`;
      return d.value;
    });
}

/* ============================================================
   CHART 5 (Q5): SMALL MULTIPLES AREA CHARTS (First Nations Age Groups)
   ============================================================ */
function renderQ5SmallMultiples(data) {
  const container = d3.select('#canvas-act5');
  if (container.empty() || !data.length) return;
  container.selectAll('*').remove();

  const ageGroups = ['0-7', '8-16', '17-25', '26-39', '40-64', '65+'];

  const header = container.append('div').attr('class', 'chart-header-row');
  header.append('div').attr('class', 'chart-heading-group')
    .html('<h3>First Nations Age Groups: Small Multiples (Area Charts)</h3><p>Shows each age group on a separate chart using the same scale (0–750) for direct visual comparison</p>');

  const kpiRow = container.append('div').attr('class', 'chart-kpi-row');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').style('color', '#991B1B').text('Age 17–25: Peak Cohort (Peaked at 705)');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').style('color', '#991B1B').text('Age 26–39: Rapid Surge (+108.7%)');
  kpiRow.append('span').attr('class', 'chart-kpi-pill').text('Shared Y-Axis Scale: 0 to 750 Admissions');

  // Small Multiples Grid
  const grid = container.append('div').attr('class', 'small-multiples-grid');
  const tooltip = createTooltip(container);

  const cardWidth = 260;
  const cardHeight = 140;
  const margin = { top: 15, right: 15, bottom: 25, left: 35 };

  ageGroups.forEach(ag => {
    const card = grid.append('div').attr('class', 'multiple-card');

    const series = data.map(d => ({ year: d.year, value: d[ag] }));
    const vBase = series[0].value;
    const vEnd = series[series.length - 1].value;
    const growth = (((vEnd - vBase) / vBase) * 100).toFixed(1);
    const isPeak = ag === '17-25' || ag === '26-39';

    const cardHeader = card.append('div').attr('class', 'multiple-card-header');
    cardHeader.append('span').attr('class', 'multiple-age-title').text(`Age ${ag}`);
    cardHeader.append('span')
      .attr('class', `multiple-badge ${isPeak ? 'multiple-badge--surge' : 'multiple-badge--neutral'}`)
      .text(`${growth > 0 ? '+' : ''}${growth}% (10-Yr)`);

    card.append('div').attr('class', 'multiple-kpi-sub')
      .text(`2011: ${vBase} → 2021: ${vEnd} admissions`);

    const svg = card.append('svg')
      .attr('viewBox', `0 0 ${cardWidth} ${cardHeight}`)
      .attr('role', 'img')
      .attr('aria-label', `Area chart for age group ${ag} from 2011 to 2021`);

    const x = d3.scaleLinear().domain([2011, 2021]).range([margin.left, cardWidth - margin.right]);
    // Unified Y scale 0 to 750 for accurate small multiples comparison
    const y = d3.scaleLinear().domain([0, 750]).range([cardHeight - margin.bottom, margin.top]);

    // X Axis
    svg.append('g').attr('transform', `translate(0,${cardHeight - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('d')))
      .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

    // Y Axis
    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(3))
      .call(g => g.selectAll('text').attr('class', 'chart-axis-label'));

    // Area & Line
    const area = d3.area().x(d => x(d.year)).y0(cardHeight - margin.bottom).y1(d => y(d.value)).curve(d3.curveMonotoneX);
    const line = d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX);

    svg.append('path').datum(series)
      .attr('fill', isPeak ? 'rgba(225, 29, 72, 0.15)' : 'rgba(2, 132, 199, 0.15)')
      .attr('d', area);

    svg.append('path').datum(series)
      .attr('fill', 'none')
      .attr('stroke', isPeak ? '#E11D48' : '#0284C7')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    // Interactive Points for All Years (2011–2021)
    svg.selectAll('circle')
      .data(series).join('circle')
      .attr('class', 'multiple-point')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.value))
      .attr('r', d => (d.year === 2011 || d.year === 2021) ? 4.5 : 3.2)
      .attr('fill', isPeak ? '#E11D48' : '#0284C7')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', d => (d.year === 2011 || d.year === 2021) ? 1.8 : 1)
      .attr('tabindex', '0')
      .attr('aria-label', d => `Age ${ag}, Year ${d.year}: ${d.value} hospitalisations`)
      .on('mouseenter focus', function (event, d) {
        d3.select(this)
          .attr('r', 6)
          .attr('stroke-width', 2.5);

        const [mx, my] = d3.pointer(event, container.node());
        tooltip.style('opacity', 1)
          .html(`<strong>Age ${ag}</strong> • Year <strong>${d.year}</strong><br/>Hospitalised: <strong>${d.value.toLocaleString()}</strong> admissions`)
          .style('left', `${mx + 12}px`)
          .style('top', `${my - 28}px`);
      })
      .on('mouseleave blur', function (event, d) {
        d3.select(this)
          .attr('r', (d.year === 2011 || d.year === 2021) ? 4.5 : 3.2)
          .attr('stroke-width', (d.year === 2011 || d.year === 2021) ? 1.8 : 1);
        tooltip.style('opacity', 0);
      });
  });
}

/* ============================================================
   NAVIGATION & SCROLL
   ============================================================ */
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
  handleScroll();
}

function initActiveNavSpy() {
  const sections = document.querySelectorAll('#story-prologue, .story-chapter, #about-us, #team');
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

function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('a[href^="#"]');

  scrollTriggers.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}