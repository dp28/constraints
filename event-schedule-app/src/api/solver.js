export function solve({ events }) {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ events })
  };

  return fetch("/events", params).then(response => response.json());
}
