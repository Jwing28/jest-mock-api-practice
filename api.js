export function APIRequest(who) {
  if (who === 'google') {
    return fetch('').then((res) => res.json());
  } else {
    return 'no argument provided';
  }
}
