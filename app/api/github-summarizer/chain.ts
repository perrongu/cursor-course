import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export interface GithubSummaryOutput {
  Sommaire: string;
  Cool_facts: string[];
}

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const TEMPLATE = `Tu es un expert en analyse de repositories GitHub. Analyse le README suivant et fournis :
1. Un résumé concis (entre 50 et 500 caractères)
2. 2 à 5 faits intéressants sur le projet (entre 10 et 200 caractères chacun)

Réponds UNIQUEMENT avec un objet JSON contenant :
- Une clé "Sommaire" avec le résumé comme valeur
- Une clé "Cool_facts" avec un tableau de faits comme valeur

README à analyser :
{readme_content}`;

const parser = new JsonOutputParser<GithubSummaryOutput>();

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(TEMPLATE),
  model,
  parser
]);

export async function summarizeGithub(readmeContent: string): Promise<GithubSummaryOutput> {
  return chain.invoke({ readme_content: readmeContent });
} 