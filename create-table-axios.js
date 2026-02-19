const axios = require('axios');

const supabaseUrl = 'https://jczevnazcknzdnachcxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjemV2bmF6Y2tuemRuYWNoY3hmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NDU3NywiZXhwIjoyMDg2NTUwNTc3fQ.7-yc_ZxPA3Xouk0Zc-ievLAu22NLUo1W_yA1AOaJwso';

async function createTable() {
  try {
    // Use the Supabase REST API to create the table via SQL
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/`,
      {
        sql: `CREATE TABLE IF NOT EXISTS gurus (
          guruId TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          capabilities TEXT[],
          contact TEXT,
          tags TEXT[]
        );`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
          'Prefer': 'return=minimal'
        }
      }
    );

    console.log('Table created successfully:', response.data);
  } catch (err) {
    console.error('Error creating table:', err.response?.data || err.message);
  }
}

createTable();
