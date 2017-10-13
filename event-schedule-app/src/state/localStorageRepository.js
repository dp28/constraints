export function save(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

export function load() {
  return JSON.parse(localStorage.getItem("state"));
}
