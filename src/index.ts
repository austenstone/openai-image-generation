import * as core from '@actions/core';
const { Configuration, OpenAIApi } = require("openai");

interface Input {
  openaiApiKey: string;
  prompt: string;
  size: string;
  n: number;
}

export function getInputs(): Input {
  const result = {} as Input;
  result.openaiApiKey = core.getInput('openai-api-key');
  result.prompt = core.getInput('prompt');
  result.size = core.getInput('size') || "1024x1024";
  result.n = 1;
  return result;
}

const run = async (): Promise<void> => {
  const input = getInputs();

  const configuration = new Configuration({ apiKey: input.openaiApiKey });
  const openai = new OpenAIApi(configuration);
    
  const response = await openai.createImage({
    prompt: input.prompt,
    n: input.n,
    size: input.size,
  });

  const imageUrl = response.data.data.find(i => i).url;
  core.setOutput('created', response.created);
  core.setOutput('image', imageUrl);
  core.notice(`Image generated: ${imageUrl}`);
};

run();