export const forecastData = [

  {
    day: "Now",
    value: 2161,
    low: 2050,
    high: 2250
  },

  {
    day: "D+7",
    value: 2232,
    low: 2080,
    high: 2390
  },

  {
    day: "D+15",
    value: 2327,
    low: 2150,
    high: 2490
  },

  {
    day: "D+30",
    value: 2429,
    low: 2200,
    high: 2660
  },

  {
    day: "D+45",
    value: 2493,
    low: 2260,
    high: 2750
  },

  {
    day: "D+60",
    value: 2556,
    low: 2280,
    high: 2840
  }

];


export const historyData = [

  {
    month: "Apr",
    rate: 1980
  },

  {
    month: "May",
    rate: 2050
  },

  {
    month: "Jun",
    rate: 2010
  },

  {
    month: "Jul",
    rate: 2090
  },

  {
    month: "Aug",
    rate: 2120
  },

  {
    month: "Sep",
    rate: 2161
  }

];


export const vessels = [

  {
    name: "Ocean Pioneer",
    type: "Capesize",
    dwt: "178,000",
    eta: "4 days",
    rate: "$27.8/t",
    score: 94
  },

  {
    name: "Eastern Horizon",
    type: "Panamax",
    dwt: "82,500",
    eta: "7 days",
    rate: "$31.2/t",
    score: 89
  },

  {
    name: "Blue Meridian",
    type: "Capesize",
    dwt: "181,200",
    eta: "9 days",
    rate: "$28.1/t",
    score: 87
  },

  {
    name: "Pacific Crest",
    type: "Supramax",
    dwt: "61,000",
    eta: "12 days",
    rate: "$34.6/t",
    score: 81
  }

];


export const ports = [

  {
    name: "Visakhapatnam",
    code: "INVTZ",
    congestion: 31,
    dwell: "2.1d",
    status: "Healthy"
  },

  {
    name: "Paradip",
    code: "INPRT",
    congestion: 44,
    dwell: "2.8d",
    status: "Watch"
  },

  {
    name: "Chennai",
    code: "INMAA",
    congestion: 22,
    dwell: "1.8d",
    status: "Healthy"
  },

  {
    name: "Kamarajar",
    code: "INENN",
    congestion: 18,
    dwell: "1.4d",
    status: "Healthy"
  },

  {
    name: "Kolkata/Haldia",
    code: "INCCU",
    congestion: 57,
    dwell: "3.6d",
    status: "Busy"
  }

];


export const alerts = [

  {
    title:
      "BDI forecast rising",

    text:
      "Model projects an 18.3% increase in the selected scenario.",

    time:
      "12 min ago",

    level:
      "warning"
  },

  {
    title:
      "Paradip congestion",

    text:
      "Expected dwell time is above the 7-day average.",

    time:
      "38 min ago",

    level:
      "danger"
  },

  {
    title:
      "Charter opportunity",

    text:
      "Supramax capacity currently matches the selected cargo scenario.",

    time:
      "1 hr ago",

    level:
      "success"
  }

];