export interface Recommendation {
  cleanser: string;
  serum: string;
  moisturizer: string;
  rationale: string;
}

export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Sensitive';
export type Concern = 'Acne' | 'Aging' | 'Hydration' | 'Brightening';
export type Region = 'North America' | 'Europe' | 'Asia' | 'Middle East';
export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

/** Lookup keyed by skin type and concern — the two axes that drive product selection. */
const recommendations: Record<SkinType, Record<Concern, Recommendation>> = {
  Oily: {
    Acne: {
      cleanser: "L'Oréal Pure Clay Purifying Cleanser",
      serum: "L'Oréal Revitalift 1.5% Pure Hyaluronic Acid Serum",
      moisturizer: "L'Oréal Hydra Genius Daily Liquid Care (Oil-Free)",
      rationale: 'Targets excess sebum and blemishes without stripping the skin barrier.',
    },
    Aging: {
      cleanser: "L'Oréal Age Perfect Hydrating Gel Cleanser",
      serum: "L'Oréal Revitalift Triple Power Concentrated Serum",
      moisturizer: "L'Oréal Age Perfect Cell Renewal Moisturizer",
      rationale: 'Controls shine while delivering pro-retinol and centella to address fine lines.',
    },
    Hydration: {
      cleanser: "L'Oréal Pure Clay Gentle Cleanser",
      serum: "L'Oréal Revitalift Hyaluronic Acid Plumping Serum",
      moisturizer: "L'Oréal Hydra Genius Aloe Water Gel",
      rationale: 'Replenishes hydration with a weightless gel that never clogs pores.',
    },
    Brightening: {
      cleanser: "L'Oréal Glycolic Bright Foaming Cleanser",
      serum: "L'Oréal Revitalift 12% Vitamin C Brightening Serum",
      moisturizer: "L'Oréal Bright Reveal SPF 50 Moisturizer",
      rationale: 'Exfoliates and illuminates while keeping the T-zone matte.',
    },
  },
  Dry: {
    Acne: {
      cleanser: "L'Oréal Revitalift Creamy Foam Cleanser",
      serum: "L'Oréal Revitalift 1.5% Pure Hyaluronic Acid Serum",
      moisturizer: "L'Oréal Age Perfect Nourishing Night Cream",
      rationale: 'Treats blemishes while restoring the lipid barrier on moisture-deprived skin.',
    },
    Aging: {
      cleanser: "L'Oréal Age Perfect Hydrating Cleanser",
      serum: "L'Oréal Revitalift Triple Power Serum",
      moisturizer: "L'Oréal Age Perfect Cell Renewal Night Cream",
      rationale: 'Rich nourishment paired with concentrated anti-aging actives for mature, dry skin.',
    },
    Hydration: {
      cleanser: "L'Oréal Gentle Nourishing Cleansing Cream",
      serum: "L'Oréal Revitalift Hyaluronic Acid + Vitamin C Serum",
      moisturizer: "L'Oréal Hydra Genius Extra Dry Skin Moisturizer",
      rationale: 'Maximum hydration delivery across all layers of the stratum corneum.',
    },
    Brightening: {
      cleanser: "L'Oréal Glycolic Bright Cream Cleanser",
      serum: "L'Oréal Revitalift Vitamin C Brightening Serum",
      moisturizer: "L'Oréal Age Perfect Radiance Moisturizer",
      rationale: 'Brightens while protecting the moisture barrier from further dehydration.',
    },
  },
  Combination: {
    Acne: {
      cleanser: "L'Oréal Pure Clay Detox Cleanser",
      serum: "L'Oréal Revitalift 1.5% Hyaluronic Acid Serum",
      moisturizer: "L'Oréal Hydra Genius Daily Liquid Care",
      rationale: 'Targets T-zone congestion while keeping drier cheek zones balanced.',
    },
    Aging: {
      cleanser: "L'Oréal Age Perfect Gentle Balancing Cleanser",
      serum: "L'Oréal Revitalift Triple Power Serum",
      moisturizer: "L'Oréal Age Perfect Rosy Tone Moisturizer",
      rationale: 'Balances mixed zones while delivering concentrated anti-aging actives.',
    },
    Hydration: {
      cleanser: "L'Oréal Micellar Cleansing Water (All Skin Types)",
      serum: "L'Oréal Revitalift Hyaluronic Acid Serum",
      moisturizer: "L'Oréal Hydra Genius Moisturizer",
      rationale: 'Lightweight hydration that adapts to both oily and dry facial zones.',
    },
    Brightening: {
      cleanser: "L'Oréal Glycolic Bright Foaming Cleanser",
      serum: "L'Oréal Revitalift Vitamin C Serum",
      moisturizer: "L'Oréal Bright Reveal SPF 30 Moisturizer",
      rationale: 'Evens skin tone across mixed zones without over-stimulating the T-zone.',
    },
  },
  Sensitive: {
    Acne: {
      cleanser: "L'Oréal Toleriane Hydrating Gentle Cleanser",
      serum: "L'Oréal Revitalift Hyaluronic Acid Serum (Fragrance-Free)",
      moisturizer: "L'Oréal Toleriane Double Repair Moisturizer",
      rationale: 'Calms reactive skin while gently managing blemishes without harsh actives.',
    },
    Aging: {
      cleanser: "L'Oréal Age Perfect Soothing Cleanser",
      serum: "L'Oréal Revitalift Triple Power Gentle Serum",
      moisturizer: "L'Oréal Age Perfect Sensitive Skin Cream",
      rationale: 'Gentle anti-aging actives formulated to avoid triggering skin reactivity.',
    },
    Hydration: {
      cleanser: "L'Oréal Toleriane Gentle Nourishing Cleanser",
      serum: "L'Oréal Revitalift Hyaluronic Acid Calming Serum",
      moisturizer: "L'Oréal Hydra Genius Sensitive Skin Moisturizer",
      rationale: 'Soothes and replenishes moisture without disrupting the reactive skin barrier.',
    },
    Brightening: {
      cleanser: "L'Oréal Glycolic Bright Gentle Cleanser",
      serum: "L'Oréal Revitalift Vitamin C Sensitive Formula Serum",
      moisturizer: "L'Oréal Bright Reveal Gentle SPF Moisturizer",
      rationale: 'Mild brightening actives calibrated for easily irritated skin.',
    },
  },
};

export function getRecommendation(skinType: SkinType, concern: Concern): Recommendation {
  return recommendations[skinType][concern];
}
