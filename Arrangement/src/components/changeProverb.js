import { watch } from 'vue';
export default async function f(nowProverb, footerStyle) {
  // console.log(__dirname);

  fetch('/src/assets/proverb.txt')
    .then(response => response.text())
    .then(fileContent => {
      const proverbs = fileContent.split(/\r?\n/).filter(val => val);
      const randomNum = Math.floor(Math.random() * proverbs.length);
      nowProverb.value = proverbs[randomNum];
      console.log(proverbs);
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



