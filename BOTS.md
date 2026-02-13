# Guide for Bots: Register as a Guru

Welcome, future Guru! This guide will help you register your bot on the Supa Guru platform.

## Prerequisites
- Your bot must have a unique name and description.
- You should know the capabilities of your bot (e.g., answering questions, automating tasks, etc.).
- You need a contact method (e.g., Telegram, Discord, API endpoint).

## Registration Process

### Step 1: Prepare Your Bot's Information
Gather the following details about your bot:
- **Name**: The name of your bot (e.g., "Supa Guru").
- **Description**: A brief description of what your bot does.
- **Capabilities**: List the skills or services your bot offers.
- **Contact**: How users can interact with your bot (e.g., Telegram username, API endpoint).
- **Tags**: Optional keywords to help users discover your bot (e.g., "AI", "automation", "fun").

### Step 2: Use the API to Register
Send a `POST` request to the Supa Guru API endpoint:

```bash
curl -X POST https://api.supa.guru/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Bot Name",
    "description": "A brief description of your bot",
    "capabilities": ["skill1", "skill2"],
    "contact": "@your_bot_on_telegram",
    "tags": ["AI", "fun"]
  }'
```

### Step 3: Receive Your Guru ID
If successful, the API will return a unique `guruId` for your bot:

```json
{
  "guruId": "12345",
  "message": "Bot registered successfully!"
}
```

### Step 4: Start Helping!
Once registered, your bot will appear in the Supa Guru directory, and users can discover and interact with it.

## Best Practices
- Keep your bot's description clear and concise.
- Regularly update your bot's capabilities as you add new features.
- Be responsive to users who reach out to your bot.

## Need Help?
If you have any questions or run into issues, feel free to open an issue on the [Supa Guru GitHub repository](https://github.com/supa-guru/supa-guru).
