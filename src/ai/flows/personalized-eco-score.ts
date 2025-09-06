'use server';

/**
 * @fileOverview Flow for generating a personalized EcoScore and sustainability tips for users.
 *
 * - generateEcoScore -  function that generates EcoScore and tips.
 * - EcoScoreInput - The input type for the generateEcoScore function.
 * - EcoScoreOutput - The return type for the generateEcoScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EcoScoreInputSchema = z.object({
  userProfile: z
    .string()
    .describe('Details about the user profile, including username and any relevant information about their sustainability practices.'),
  productListing: z
    .string()
    .optional()
    .describe('Details about the product listing, including title, description, category, price, and any information about its sustainability.'),
});
export type EcoScoreInput = z.infer<typeof EcoScoreInputSchema>;

const EcoScoreOutputSchema = z.object({
  ecoScore: z
    .number()
    .describe('A numerical score representing the users overall sustainability impact.'),
  tips: z
    .array(z.string())
    .describe('A list of AI-generated tips to help the user improve their sustainability impact as a buyer or seller.'),
  certificationLevel: z
    .string()
    .describe('The certification level achieved by the user based on their EcoScore (e.g., Bronze, Silver, Gold).'),
  shouldDisplayInformation: z
    .boolean()
    .describe('Whether or not information, hints, or a new certification level needs to be displayed.'),
});
export type EcoScoreOutput = z.infer<typeof EcoScoreOutputSchema>;

export async function generateEcoScore(input: EcoScoreInput): Promise<EcoScoreOutput> {
  return ecoScoreFlow(input);
}

const ecoScorePrompt = ai.definePrompt({
  name: 'ecoScorePrompt',
  input: {schema: EcoScoreInputSchema},
  output: {schema: EcoScoreOutputSchema},
  prompt: `You are an AI assistant that helps users understand and improve their sustainability impact on the EcoFinds platform.

You will receive information about the user's profile and their product listings.

Based on this information, you will generate an EcoScore, provide personalized tips, and determine a certification level for the user.

Consider the following:
- The user's profile information, including their username and any details about their sustainability practices.
- The product listing details, including title, description, category, price, and any information about its sustainability.

EcoScore:
A numerical score (out of 100) representing the user's overall sustainability impact. Take into account information provided in userProfile and productListing.
Tips:
A list of actionable tips to help the user improve their sustainability impact as a buyer or seller. Tips should be specific and relevant to the user's profile and listings.
Certification Level:
A certification level (e.g., Bronze, Silver, Gold) based on the user's EcoScore. The higher the score, the higher the certification level.

User Profile: {{{userProfile}}}
Product Listing: {{{productListing}}}

Ensure that the tips are clear, concise, and easy to understand.

Decide if the information, hints, or a new certification level needs to be displayed, and set the shouldDisplayInformation field appropriately.

Output JSON:
{{json}}
`,
});

const ecoScoreFlow = ai.defineFlow(
  {
    name: 'ecoScoreFlow',
    inputSchema: EcoScoreInputSchema,
    outputSchema: EcoScoreOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      prompt: ecoScorePrompt,
      input,
    });
    return output!;
  }
);
