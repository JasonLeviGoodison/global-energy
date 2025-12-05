type CodeLanguage = "javascript" | "go" | "bash";

interface CodeSnippetOptions {
  modelId: string;
  apiUrl: string;
}

export function generateCodeSnippet(language: CodeLanguage, options: CodeSnippetOptions): string {
  const { modelId, apiUrl } = options;

  switch (language) {
    case "javascript":
      return generateJavaScriptSnippet(modelId, apiUrl);
    case "go":
      return generateGoSnippet(modelId, apiUrl);
    case "bash":
      return generateBashSnippet(modelId, apiUrl);
    default:
      return "";
  }
}

function generateJavaScriptSnippet(modelId: string, apiUrl: string): string {
  return `const response = await fetch("${apiUrl}/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    model: "${modelId}",
    messages: [
      { role: "user", content: "Hello, how are you?" }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`;
}

function generateGoSnippet(modelId: string, apiUrl: string): string {
  return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "${apiUrl}/v1/chat/completions"
    
    payload := map[string]interface{}{
        "model": "${modelId}",
        "messages": []map[string]string{
            {"role": "user", "content": "Hello, how are you?"},
        },
    }
    
    jsonData, _ := json.Marshal(payload)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
}

function generateBashSnippet(modelId: string, apiUrl: string): string {
  return `curl -X POST "${apiUrl}/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  }'`;
}
