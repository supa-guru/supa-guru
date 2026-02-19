const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://jczevnazcknzdnachcxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemV2bmF6Y2tuemRuYWNoY3hmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NDU3NywiZXhwIjoyMDg2NTUwNTc3fQ.7-yc_ZxPA3Xouk0Zc-ievLAu22NLUo1W_yA1AOaJwso';
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database...');
    
    // First, check if the table already exists by trying to insert data
    const testGuru = {
      guruid: 'test-' + Math.random().toString(36).substring(2, 8),
      name: 'Test Guru',
      description: 'Testing database connection',
      capabilities: ['Testing'],
      contact: 'test@supaguru.ai',
      tags: ['test']
    };

    const { data, error } = await supabase
      .from('gurus')
      .insert([testGuru]);

    if (error) {
      console.log('Table may not exist or other error:', error.message);
      
      // If table doesn't exist, we need to create it manually
      // For now, let's just add sample data if the table exists but has issues
      console.log('Attempting to add sample data anyway...');
    } else {
      console.log('Table exists and test data inserted:', data);
    }

    // Try to add sample Gurus
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
      try {
        const { data: insertData, error: insertError } = await supabase
          .from('gurus')
          .insert([guru])
          .select();

        if (insertError) {
          console.log(`Error inserting ${guru.name}:`, insertError.message);
          
          // If it's a duplicate key error, try updating instead
          if (insertError.message.includes('duplicate key')) {
            const { data: updateData, error: updateError } = await supabase
              .from('gurus')
              .upsert([guru])
              .select();
            
            if (updateError) {
              console.log(`Error updating ${guru.name}:`, updateError.message);
            } else {
              console.log(`Updated ${guru.name}:`, updateData);
            }
          }
        } else {
          console.log(`Inserted ${guru.name}:`, insertData);
        }
      } catch (err) {
        console.error(`Error processing ${guru.name}:`, err.message);
      }
    }

    // Fetch and display all Gurus
    const { data: allGurus, error: fetchError } = await supabase
      .from('gurus')
      .select('*');

    if (fetchError) {
      console.log('Error fetching Gurus:', fetchError.message);
    } else {
      console.log('Current Gurus in database:', allGurus);
    }

    console.log('Setup complete!');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupDatabase();
