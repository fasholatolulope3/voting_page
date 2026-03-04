import { ref } from 'vue';

export const categories = ref([
  { id: 1, name: 'Mr Naptson', nominees: [{ name: 'Adeyemi faith', currentVotes: 0 }], icon: '👤' },
  { id: 2, name: 'Miss Naptson', nominees: [{ name: 'ogunleye Ayopelumi', currentVotes: 0 }], icon: '👸' },
  { id: 3, name: 'Miss Ebony', nominees: [{ name: 'Balogun Abibat', currentVotes: 0 }, { name: 'Amosun sinat', currentVotes: 0 }, { name: 'Christopher Elizabeth', currentVotes: 0 }], icon: '🌟' },
  { id: 4, name: 'Most Popular Student (Male)', nominees: [{ name: 'Soyomi Gabriel', currentVotes: 0 }], icon: '🙋‍♂️' },
  { id: 5, name: 'Most Popular Brand', nominees: [{ name: 'sanyaolu Ifeoluwa (Larposh lip & skincare)', currentVotes: 0 }, { name: 'Oloko Adedayo ( Empress Dee cake&treatz)', currentVotes: 0 }], icon: '🛍️' },
  { id: 6, name: 'Sophomore Student of the Year', nominees: [{ name: 'Adeniyi Kehinde', currentVotes: 0 }], icon: '🎓' },
  { id: 7, name: 'Brand of the Year', nominees: [{ name: 'kolawole ayomide (Mide body secret)', currentVotes: 0 }, { name: 'Ofor Ese (The Glam Val)', currentVotes: 0 }, { name: 'Adejumo mopelola (Arinola’s closet)', currentVotes: 0 }], icon: '🏆' },
  { id: 8, name: 'Miss Petite', nominees: [{ name: 'Adeniyi Kehinde', currentVotes: 0 }], icon: '👗' },
  { id: 9, name: 'Icon of the Year', nominees: [{ name: 'Yusuf moriamo', currentVotes: 0 }], icon: '👑' },
  { id: 10, name: 'Most Popular Student (Female)', nominees: [{ name: 'Bello sodirat (Iremide)', currentVotes: 0 }, { name: 'Fashola Oluwaseyi', currentVotes: 0 }], icon: '🙋‍♀️' },
  { id: 11, name: 'Most Sophisticated', nominees: [{ name: 'Ogunyinka Oluwatosin', currentVotes: 0 }], icon: '💎' },
  { id: 12, name: 'Most Expensive', nominees: [{ name: 'Lawrence favour', currentVotes: 0 }], icon: '💰' },
  { id: 13, name: 'Most Endowed', nominees: [{ name: 'Adejumo Mopelola', currentVotes: 0 }], icon: '🔥' },
  { id: 14, name: 'Best Department Fresher (female)', nominees: [{ name: 'Abdulwasi Fathia', currentVotes: 0 }], icon: '🌱' },
  { id: 15, name: 'Entrepreneur of the Year', nominees: [{ name: 'Lawal tofunmi', currentVotes: 0 }, { name: 'Muslim Abibat', currentVotes: 0 }], icon: '💼' }
]);

export const applyApprovedVotes = (approvedVotesArray) => {
  // Reset all current votes to 0 first to prevent double-counting during real-time updates
  categories.value.forEach(category => {
    category.nominees.forEach(nominee => {
      nominee.currentVotes = 0;
    });
  });

  // Apply the approved votes
  approvedVotesArray.forEach(vote => {
    const category = categories.value.find(c => c.id === vote.categoryId);
    if (category) {
      const nominee = category.nominees.find(n => n.name === vote.nomineeName);
      if (nominee) {
        nominee.currentVotes += vote.quantity;
      }
    }
  });
};

