
async function callPuterAI(prompt, model, updateTokenUsage) {
  const api = window.puter || window.Puter || window.p || {};
  if (api.ai && api.ai.chat) {
    const chatMessages = [{ role: "user", content: prompt }];
    const response = await api.ai.chat(chatMessages, { model });

    const responseText = response.message?.content || response.content || response;

    if (response.usage) {
      const inputTokens = response.usage.input_tokens || 0;
      const outputTokens = response.usage.output_tokens || 0;
      const totalTokens = inputTokens + outputTokens;
      const costPerToken = 0.000001;
      const estimatedCost = totalTokens * costPerToken;
      updateTokenUsage(estimatedCost);
    }

    return responseText;
  }
  throw new Error("Puter AI not available");
}

async function callPollinationsAI(prompt, model, updateTokenUsage) {
  try {
    const url = `https://text.pollinations.ai/openai`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are an expert web developer. Return ONLY valid JSON with keys: html, css, js, explanation." },
          { role: "user", content: prompt }
        ],
        stream: false,
        jsonMode: true
      })
    });

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.message?.content || "";

    const inputTokens = data.usage?.prompt_tokens || 0;
    const outputTokens = data.usage?.completion_tokens || 0;
    const totalTokens = inputTokens + outputTokens;

    const estimatedTokens = totalTokens || Math.ceil((prompt.length + content.length) / 4);
    const costPerToken = 0.000001;
    const estimatedCost = estimatedTokens * costPerToken;

    updateTokenUsage(estimatedCost);

    return content;
  } catch (error) {
    console.error("Pollinations API error:", error);
    throw error;
  }
}

async function callStandardAI(prompt, model, updateTokenUsage) {
  const { callAI } = await import("call-ai");
  const response = await callAI(prompt, { model });

  const estimatedTokens = (prompt.length + response.length) / 4;
  const costPerToken = 0.000001;
  const estimatedCost = estimatedTokens * costPerToken;
  updateTokenUsage(estimatedCost);

  return response;
}

export { callPuterAI, callPollinationsAI, callStandardAI };
