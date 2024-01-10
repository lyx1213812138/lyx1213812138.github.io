import { watch, ref } from 'vue';
export default function saveAllTime(keyStr) {
  const value = ref(localStorage.getItem(keyStr));
  watch(value, (newValue) => {
    localStorage.setItem(keyStr, newValue);
  });
  return value;
};