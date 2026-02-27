import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function getSnarkDescription(level) {
  if (level <= 20) {
    return `PROFESSIONAL and polite. This is a standard, courteous out-of-office reply. Warm but businesslike. No snark whatsoever.`;
  }
  if (level <= 40) {
    return `CHEEKY and playful. Mostly professional but with a wink. Subtle humor that a boss wouldn't flag but a coworker would smirk at. Think "I'm out, and I'm not sorry about it" energy, delivered with a smile.`;
  }
  if (level <= 60) {
    return `SNARKY and passive-aggressive. The person is clearly a little annoyed they're even getting emailed. Backhanded politeness. The kind of message where you read it twice and go "wait, did they just...?" Dripping with "per my last email" energy.`;
  }
  if (level <= 80) {
    return `UNHINGED and brazenly rude. The person has clearly stopped caring about professional norms. They're out of office and they want you to KNOW they don't want to hear from you. Dramatic, over-the-top, almost theatrical in their disdain for the very concept of work email.`;
  }
  return `SCORCHED EARTH. Maximum hostility dressed up as an auto-reply. This person is furious that email exists, furious that YOU exist in their inbox, and wants to make absolutely sure you regret pressing send. Insults should be creative, devastating, and darkly hilarious. Think "if a comedian wrote a resignation letter as an OOO." Absolutely unhinged but brilliantly written.`;
}

const STYLE_SEEDS = [
  "Write it like a dramatic monologue from a Shakespearean villain who just discovered email.",
  "Write it in the style of a nature documentary narrator observing office culture.",
  "Write it like a passive-aggressive neighbor's HOA complaint letter.",
  "Write it as if dictating from a yacht while sipping champagne.",
  "Write it like a hostage negotiator trying to de-escalate... except YOU are the hostage and work is the captor.",
  "Write it in the style of a movie trailer voiceover.",
  "Write it like a breakup letter to the concept of productivity.",
  "Write it as if you're a medieval knight explaining your quest to peasants.",
  "Write it like a tech startup founder pivoting away from email.",
  "Write it in the voice of someone who just won the lottery but hasn't quit yet.",
  "Write it like a therapist gently explaining boundaries to a codependent emailer.",
  "Write it as a weather forecast for your inbox.",
  "Write it like an airline captain making an in-flight announcement.",
  "Write it in the style of a true crime podcast narrator.",
  "Write it like a restaurant maître d' turning away guests without a reservation.",
];

app.post('/api/generate', async (req, res) => {
  const { name, startDate, endDate, reason, destination, emergencyContact, emergencyEmail, specialInstructions, snarkLevel } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).json({ error: 'Name, start date, and end date are required.' });
  }

  const snarkDescription = getSnarkDescription(snarkLevel ?? 50);
  const styleSeed = STYLE_SEEDS[Math.floor(Math.random() * STYLE_SEEDS.length)];
  const randomSeed = Math.random().toString(36).substring(2, 10);

  const prompt = `Generate a unique out-of-office auto-reply email message. Here are the details:

NAME: ${name}
OUT FROM: ${startDate}
RETURNING: ${endDate}
${reason ? `REASON: ${reason}` : ''}
${destination ? `DESTINATION/ACTIVITY: ${destination}` : ''}
${emergencyContact ? `EMERGENCY CONTACT: ${emergencyContact}${emergencyEmail ? ` (${emergencyEmail})` : ''}` : ''}
${specialInstructions ? `SPECIAL INSTRUCTIONS: ${specialInstructions}` : ''}

TONE & SNARK LEVEL (${snarkLevel}/100): ${snarkDescription}

STYLE HINT: ${styleSeed}

IMPORTANT RULES:
- Write ONLY the body of the auto-reply message. Do not include subject lines, email headers, or meta-commentary.
- The message must feel completely unique and fresh. Avoid clichéd OOO phrases unless subverting them.
- Keep it to 3-6 sentences max. Punchy and memorable.
- If there's an emergency contact, mention them in a way that fits the tone.
- The dates and name must be accurate.
- Uniqueness seed (ignore this, it's just to ensure uniqueness): ${randomSeed}`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const generatedText = message.content[0].text;
    return res.status(200).json({ message: generatedText });
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: 'Failed to generate message. Check your API key.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
