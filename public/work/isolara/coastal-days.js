"use strict";

const coastalDays = (nights, priority) => {
  const photos = {
    villa: {image: "villa.webp", alt: "The villa's pool terrace overlooking the sea", caption: "The villa terrace"},
    coast: {image: "coast-hero.webp", alt: "A white villa above a green headland and a turquoise bay", caption: "Above the bay"},
    harbor: {image: "harbor.webp", alt: "A ceramic cup on a café table beside a stone harbor with moored fishing boats", caption: "At a waterfront café"},
    folio: {image: "folio.webp", alt: "A violet ISOLARA folio and a passport on a terrace table", caption: "Planning the day"},
    sunset: {image: "sunset.webp", alt: "The ISOLARA advisor on a coastal terrace at sunset", caption: "Last light on the terrace"}
  };
  const day = (title, plan, photo) => ({title, plan, ...photos[photo]});

  const outings = {
    water: [
      day("Spend the morning by the water", "Take the coastal road to the harbor for coffee, then walk the waterfront. Come back to the villa for a swim and a late lunch by the pool.", "harbor"),
      day("Take lunch to the shore", "Pack something simple for lunch and choose a stretch of shoreline for the afternoon. Head back when the shade moves off your spot.", "coast"),
      day("Catch the early light", "Set out for a walk along the bay before breakfast. Leave the afternoon open for one more swim at the villa.", "villa")
    ],
    food: [
      day("Make lunch the outing", "Follow the coastal road to the harbor and take a waterfront table for lunch. Ask what the kitchen is cooking that day and leave the afternoon free.", "harbor"),
      day("Shop for supper", "Visit a produce market in the morning for ripe fruit, bread and something to share. Set everything out on the villa terrace for an early supper.", "folio"),
      day("Go back for a favorite", "Return to the dish you have been talking about all week. Build the day around that one meal and leave time for a walk afterward.", "harbor")
    ],
    drives: [
      day("Follow the coastal road", "Head out with a driver after breakfast. Stop for coffee at the harbor and pick a turnout above the bay for the ride home.", "harbor"),
      day("Take the road inland", "Turn away from the shore for a village lunch. Choose a different route back so the sea comes into view on the way down.", "folio"),
      day("Walk the last stretch", "Have your driver drop you at one end of a coastal walking route and meet you at the other. Choose the pickup point over breakfast so the walk fits your morning.", "coast")
    ]
  };
  const length = Number(nights);
  if (![3, 5, 7].includes(length) || !Object.hasOwn(outings, priority)) return [];

  const route = [
    day("Settle into the villa", "Meet your driver on arrival and follow the coastal road to the villa. Unpack, step onto the terrace and keep supper close to home.", "villa"),
    outings[priority][0]
  ];
  if (length >= 5) {
    route.push(
      day("Keep a day at the villa", "Have breakfast outside and leave the car parked. Take a book down to the terrace and decide on lunch when you get hungry.", "villa"),
      outings[priority][1]
    );
  }
  if (length === 7) {
    route.push(
      day("Spend a morning in town", "Choose a café away from the waterfront and explore the streets around it on foot. Head back to the villa for the afternoon.", "folio"),
      outings[priority][2]
    );
  }
  route.push(
    day("Save the evening for dinner", "Keep the morning free. In the evening, stop above the bay for the sunset before heading to dinner.", "sunset"),
    day("One last morning by the sea", "Plan breakfast around your departure time. If you have a later flight, take one last dip before your driver arrives.", "villa")
  );
  return route;
};
