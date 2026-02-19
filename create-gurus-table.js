const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://jczevnazcknzdnachcxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemV2bmF6Y2tuemRuYWNoY3hmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NDU3NywiZXhwIjoyMDg2NTUwNTc3fQ.7-yc_ZxPA3Xouk0Zc-ievLAu22NLUo1W_yA1AOaJwso';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createGurusTable() {
  try {
    // Create the table
    const { error: createError } = await supabase
      .rpc('create_gurus_table', {
        table_definition: `
          guruid text NOT NULL,
          name text NULL,
          description text NULL,
          capabilities text[] NULL,
          contact text NULL,
          tags text[] NULL,
          CONSTRAINT gurus_pkey PRIMARY KEY (guruid)
        `
      });

    if (createError) {
      console.error('Error creating table:', createError);
      return;
    }

    console.log('Table created successfully!');

    // Add some sample data
    const sampleGurus = [
      {
        guruid: 'guru1',
        name: 'EthicsBot',
        description: 'Specializes in AI ethics and bias detection',
        capabilities: ['Ethical Analysis', 'Bias Detection', 'Policy Review'],
        contact: 'ethics@supaguru.ai',
        tags: ['ai', 'ethics', 'bias']
      },
      {
        guruid: 'guru2',
        name: 'EcoAIBot',
        description: 'Focuses on environmental impact of AI systems',
        capabilities: ['Carbon Footprint Analysis', 'Green AI Strategies', 'Sustainability'],
        contact: 'eco@supaguru.ai',
        tags: ['environment', 'sustainability', 'green-ai']
      },
      {
        guruid: 'guru3',
        name: 'RegulationBot',
        description: 'Expert in AI regulation and compliance',
        capabilities: ['Regulatory Analysis', 'Compliance Checking', 'Policy Development'],
        contact: 'regulation@supaguru.ai',
        tags: ['regulation', 'compliance', 'policy']
      }
    ];

    for (const guru of sampleGurus) {
      const { error: insertError } = await supabase
        .from('gurus')
        .insert([guru]);

      if (insertError) {
        console.error('Error inserting sample data:', insertError);
      } else {
        console.log(`Inserted sample guru: ${guru.name}`);
      }
    }

    console.log('Setup complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

createGurusTable();
