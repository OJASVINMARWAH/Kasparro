const OpenAI =
    require('openai');

const openai =
    new OpenAI({

        apiKey:
            process.env.OPENAI_API_KEY
    });

const analyzeTranscript =
    async (req, res) => {

        try {

            const {
                transcript
            } = req.body;

            const completion =
                await openai.chat.completions.create({

                    model:
                        'gpt-4.1-mini',

                    messages: [

                        {
                            role: 'system',

                            content: `

You are Aura,
an empathetic multilingual
AI customer support agent.

Respond ONLY in Hindi.

Be short, human,
professional and conversational.

Mention:
- claim understanding
- likely issue
- next workflow step

`
                        },

                        {
                            role: 'user',

                            content: transcript
                        }
                    ],

                    temperature: 0.7
                });

            const reply =

                completion.choices[0]
                    .message.content;

            res.status(200).json({

                success: true,

                reply
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    'AI analysis failed'
            });
        }
    };

module.exports = {
    analyzeTranscript
};