export async function trackButtonClick(buttonId: string, buttonLabel: string, section: string, page: string = "home") {
  try {
    await fetch("/api/track-button-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buttonId, buttonLabel, section, page }),
    });
  } catch (error) {
    console.error("Failed to track button click:", error);
  }
}
