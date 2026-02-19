// Test script to verify API fetch works in frontend environment
const fetch = require('node-fetch');

async function testFetch() {
  try {
    console.log('Testing API fetch...');
    
    const response = await fetch('https://supa-guru-ten.vercel.app/api/gurus');
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    console.log('Gurus count:', data.gurus ? data.gurus.length : 0);
    
    if (data.gurus && data.gurus.length > 0) {
      console.log('✅ API is working correctly!');
      console.log('First Guru:', data.gurus[0]);
    } else {
      console.log('❌ No Gurus returned');
    }
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
  }
}

testFetch();
