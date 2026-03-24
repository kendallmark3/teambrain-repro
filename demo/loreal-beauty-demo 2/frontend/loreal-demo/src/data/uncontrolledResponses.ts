/** Intentionally inconsistent responses — no structure, no constraints, no governance. */
const responses: string[] = [
  "Sure! For skincare I'd suggest washing your face and using a good moisturizer. Maybe try a serum too? Everyone's skin is different so results may vary. You might want to see a dermatologist.",

  "Here are some tips:\n• Use sunscreen daily\n• Vitamin C is great\n• Don't forget to hydrate\n• Sleep 8 hours\n• Drink more water\n\nNote: These are general tips and not medical advice.",

  "SKINCARE ROUTINE:\nStep 1: Cleanser — any gentle one works\nStep 2: Toner (optional)\nStep 3: Essence\nStep 4: Serum\nStep 5: Eye cream\nStep 6: Moisturizer\nStep 7: SPF (AM only)\n\nConsistency is key!",

  "Moisturizer: CeraVe. Also consider retinol, niacinamide, AHA/BHA, vitamin C, hyaluronic acid, peptides, ceramides, bakuchiol, azelaic acid...",

  "Great question! The beauty industry is vast. L'Oréal, Neutrogena, La Roche-Posay, Cetaphil, Drunk Elephant, The Ordinary, Paula's Choice — all great. Depends on your budget. Have you checked Reddit's r/SkincareAddiction?",

  "For oily skin use gel cleanser. For dry skin use cream cleanser. For sensitive skin avoid fragrance. For combination skin zone treat. Serum options vary. Consult a professional for best results.",

  "I recommend a 3-step routine. Step one involves cleansing. The second step covers treatment. The third step should include something moisturizing. Adjust based on how your skin feels each day.",

  "Honestly it depends on so many factors — your diet, stress levels, climate, hormones, genetics, sleep quality, water intake, and of course your skin type. There's no one-size-fits-all answer here.",
];

export function getUncontrolledResponse(): string {
  return responses[Math.floor(Math.random() * responses.length)];
}
