'use server';

/**
 * @fileOverview A love letter generator AI agent.
 *
 * - generateLoveLetter - A function that handles the love letter generation process.
 * - GenerateLoveLetterInput - The input type for the generateLoveLetter function.
 * - GenerateLoveLetterOutput - The return type for the generateLoveLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveLetterInputSchema = z.object({
  tone: z
    .string()
    .describe("The tone of the love letter, e.g. 'romantic', 'funny', 'sweet'."),
  additionalDetails: z
    .string()
    .describe('Any additional details to include in the love letter.'),
});
export type GenerateLoveLetterInput = z.infer<typeof GenerateLoveLetterInputSchema>;

const GenerateLoveLetterOutputSchema = z.object({
  loveLetter: z.string().describe('The generated love letter.'),
});
export type GenerateLoveLetterOutput = z.infer<typeof GenerateLoveLetterOutputSchema>;

export async function generateLoveLetter(input: GenerateLoveLetterInput): Promise<GenerateLoveLetterOutput> {
  return generateLoveLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLoveLetterPrompt',
  input: {schema: GenerateLoveLetterInputSchema},
  output: {schema: GenerateLoveLetterOutputSchema},
  prompt: `You are a professional love letter writer. Please generate a heartfelt and personalized love letter based on the following instructions:

Tone: {{{tone}}}
Additional Details: {{{additionalDetails}}}

Love Letter:`,
});

const generateLoveLetterFlow = ai.defineFlow(
  {
    name: 'generateLoveLetterFlow',
    inputSchema: GenerateLoveLetterInputSchema,
    outputSchema: GenerateLoveLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
