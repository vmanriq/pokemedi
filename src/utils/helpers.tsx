export const getImageUrl = (id: number) =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("00" + id).slice(
    -3
  )}.png`;
  
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
