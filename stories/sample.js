export default {
  ac: 51,
  advantage: true,
  acrobatics: 10,
  acrobatics_prof: false,
  attacks: [
    {
      name: 'Bite',
      description: 'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.',
      attack: {
        base: '1d20',
        type: 'melee',
        proficiency: false,
        crit_range: { success: 20, fail: 1 },
        range: { normal: '10 ft', far: '' },
      },
      damage: [{
        base: '2d10',
        modifier: { stat: 'Dexterity', mod: 3 },
        type: 'piercing',
        title: 'Bite',
      }],
    },
  ],
  additional_features: 'More about me!',
  age: 42,
  alignment: 'Chaotic Good',
  allies_and_orgs: 'Right of map, dark forest\n\nCult of Good People',
  animal_handling_prof: true,
  appearance: 'Medium-height, pretty average looking fella\'',
  arcana_prof: false,
  area: 0,
  athletics_prof: false,
  background: 'Criminal',
  backstory: 'I was born here ...',
  bonds: 'bonds',
  cantrips: [ 'Minor Illusion' ],
  character_class: 'Cleric',
  charisma: 13,
  charisma_mod: 1,
  charisma_prof: true,
  color: { r: 100, g: 200, b: 300, a: 1 },
  constitution: 1,
  constitution_mod: 1,
  constitution_prof: true,
  death_save_failures: [ true, false, false ],
  death_save_successes: [ true, true, false ],
  deception_prof: false,
  dexterity: 5,
  dexterity_mod: -2,
  dexterity_prof: false,
  eyes: 'Blue',
  features_and_traits: [],
  flaws: 'My one-upsmanship is going to get me in big trouble one of these days.',
  gender: 'Male',
  gm_notes: 'GM Notes',
  hair: 'Brown',
  height: '5\' 8"',
  history_prof: false,
  hit_dice: '1d8',
  hit_dice_total: 1,
  hp: 50,
  hp_formula: '1d8',
  hp_max: 60,
  hp_tmp: 4,
  id: 'test-id',
  ideals: 'Respect: I’ve been misjudged before, and treat others with respect so I don’t make the same mistake. (Good)',
  insight_prof: false,
  intelligence: 11,
  intelligence_mod: -1,
  intelligence_prof: true,
  intimidation_prof: false,
  investigation_prof: false,
  is_npc: false,
  languages: ['Gnoll', 'Giant Owl'],
  legendary_actions: [],
  level: 4,
  medicine_prof: false,
  name: 'Gimble "Jim" Nackle-Timbers-Turen-Beren-Daergel',
  nature_prof: false,
  npc_type: 'Gnome, Chaotic Good',
  perception_prof: true,
  performance_prof: true,
  personality_traits: 'There\’s no tale so heroic that I won’t embellish it a little further.\n\nI have all kinds of half-finished projects in my room, my backpack, and my pockets.',
  persuasion_prof: false,
  proficiency_bonus: 2,
  race: 'Forest Gnome',
  religion_prof: false,
  size: 'Small',
  skin: 'Tan',
  slight_of_hand_prof: false,
  speed_walk: 25,
  stealth_prof: false,
  strength: 10,
  strength_mod: 4,
  strength_prof: true,
  survival_prof: true,
  treasure: 'A list of me items gets stored here',
  weight: 8,
  wisdom: 8,
  wisdom_mod: 4,
  wisdom_prof: true,
  xp: 1200,
  equipment: [
    { name: '50 gp', weight: 0.5 },
    { name: 'Warhammer', weight: 10 },
  ],
  other_profs_and_langs: [
    {
      isEditing: true,
      proficiency: 'Test',
      type: 'Language',
    },
  ],
  tools_and_skills: [
    {
      attribute: 'Strength',
      bonus: 2,
      isEditing: false,
      mod: 1,
      name: 'Test Tool',
    },
  ],
  assets: [
    {
      name: 'Arrows',
      current: 45,
      maximum: 60,
      isEditing: false,
    },
  ],
}
