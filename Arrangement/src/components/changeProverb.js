import { watch } from 'vue';
export default async function f(nowProverb, footerStyle) {
  fetch('/src/assets/proverb.txt')
    .then(response => {
      if (!response.ok) return 
      return response.text();
    })
    .then(fileContent => {
      if(fileContent.indexOf('<') != -1)
        return new Promise((_, rej) => rej(fileContent));
      const proverbs = fileContent.split(/\r?\n/).filter(val => val);
      const randomNum = Math.floor(Math.random() * proverbs.length);
      nowProverb.value = proverbs[randomNum];
      console.log(fileContent);
    })
    .catch(error => {
      console.error('cannot fetch proverbs:', error);
    });

  watch(nowProverb, newValue => {
    const fontSize = 38 * 30 / newValue.length;
    if (fontSize < 30) footerStyle.value = `font-size: ${fontSize}px; line-height: 37px`;
    // console.log(footerStyle.value);
  })
};



