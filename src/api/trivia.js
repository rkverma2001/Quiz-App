export async function fetchQuestions(attempt = 1) {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429 && attempt < 5) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 100)
        );
        return fetchQuestions(attempt + 1);
      }
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
