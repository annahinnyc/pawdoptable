export default const users = [
  {
    username: "kcloud99",
    email: "kylemcleod1@gmail.com",
    password: "password",
    name: "Kyle McLeod",
    phone: "2534684102",
    profilePhotoUrl: "https://somepic.com/kyle",
    type: "awesome dude",
    location: "97701",
    description: "lover of all animals, especially dogs. Looking for a great rescue dog I can run and have fun with. Needs a great personality and loving attitude.",
    photos: [],
    homeType: "house",
    yard: true,
    childrenAtHome: 0,
    petsAtHome: 2,
    favoritedPets: [],
    petPreferences: [],
    backgroundCheck: []
  },
  {
    username: "annahofthewest",
    email: "annahofthewest@gmail.com",
    password: "password",
    name: "Annah Patterson",
    phone: "9715559292",
    profilePhotoUrl: "https://somepic.com/annah",
    type: "awesome lady",
    location: "56783",
    description: "great home life that needs another pet. Could be either a cat or a dog, but looking to provide a loving home for an animal in need",
    photos: [],
    homeType: "apartment",
    yard: false,
    childrenAtHome: 1,
    petsAtHome: 1,
    favoritedPets: [],
    petPreferences: [],
    backgroundCheck: []
  }
];

const pets = [
  {
    species: '',
    mainBreed: '',
    subBreeds: [],
    name: '',
    description: '',
    age: '',
    height: Number,
    weight: Number,
    energy: Number,
    personalityTraits: [],
    goodWith: [],
    badWith: [],
    specialNeeds: {
      specialNeeds: Boolean,
      needs: [],
      description: ''
    },
    shelter: ''
  }
];