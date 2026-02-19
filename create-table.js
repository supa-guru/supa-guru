const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jczevnazcknzdnachcxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemV2bmF6Y2tuemRuYWNoY3hmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NDU3NywiZXhwIjoyMDg2NTUwNTc3fQ.7-yc_ZxPA3Xouk0Zc-ievLAu22NLUo1W_yA1AOaJwso';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  try {
    // Use the Supabase client to execute raw SQL
    const { data, error } = await supabase
      .rpc('execute_sql', {
        sql: `CREATE TABLE IF NOT EXISTS gurus (
          guruId TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          capabilities TEXT[],
          contact TEXT,
          tags TEXT[]
        );`
      });

    if (error) {
      console.error('Error creating table:', error);
      return;
    }

    console.log('Table created successfully:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createTable();
