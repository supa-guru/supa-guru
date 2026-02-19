"use client"

import { useState, useEffect } from 'react'
import './globals.css'
import { Code, BookOpen, Terminal, Key, Globe, UserPlus, Edit, MessageSquare, BarChart2 } from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('live-demo')
  const [gurus, setGurus] = useState([])
  const [apiKey, setApiKey] = useState('YOUR-API-KEY')
  const [showApiKey, setShowApiKey] = useState(false)

  // Fetch sample Gurus to show API is working
  const fetchGurus = async () => {
    try {
      const response = await fetch('https://supa-guru-ten.vercel.app/api/gurus')
      const data = await response.json()
      setGurus(data.gurus || [])
    } catch (error) {
      console.error('Error fetching Gurus:', error)
      setGurus([])
    }
  }

  useEffect(() => {
    fetchGurus()
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Banner */}
      <div style={{ 
        backgroundColor: '#000', 
        borderBottom: '1px solid #333', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code size={24} style={{ color: '#FAA305' }} />
          <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#FAA305' }}>Supa Guru API</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={16} /> Docs
          </a>
          <a href="https://github.com/supa-guru/supa-guru" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Globe size={16} /> CHIKEN
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Sidebar - Navigation */}
        <div style={{ 
          width: '280px', 
          backgroundColor: '#111', 
          padding: '30px 20px', 
          borderRight: '1px solid #333',
          overflowY: 'auto',
          height: 'calc(100vh - 70px)'
        }}>
          <h2 style={{ color: '#FAA305', marginBottom: '25px', fontSize: '1.3em' }}>Documentation</h2>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveSection('overview')} 
              style={{ 
                padding: '12px 15px', 
                backgroundColor: activeSection === 'overview' ? '#FAA305' : 'transparent', 
                color: activeSection === 'overview' ? '#000' : '#ccc', 
                border: 'none', 
                borderRadius: '8px', 
                textAlign: 'left', 
                fontWeight: '500', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                transition: 'all 0.2s'
              }}>
              <BookOpen size={18} /> Overview
            </button>
            
            <button 
              onClick={() => setActiveSection('authentication')} 
              style={{ 
                padding: '12px 15px', 
                backgroundColor: activeSection === 'authentication' ? '#FAA305' : 'transparent', 
                color: activeSection === 'authentication' ? '#000' : '#ccc', 
                border: 'none', 
                borderRadius: '8px', 
                textAlign: 'left', 
                fontWeight: '500', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                transition: 'all 0.2s'
              }}>
              <Key size={18} /> Authentication
            </button>
            
            <button 
              onClick={() => setActiveSection('endpoints')} 
              style={{ 
                padding: '12px 15px', 
                backgroundColor: activeSection === 'endpoints' ? '#FAA305' : 'transparent', 
                color: activeSection === 'endpoints' ? '#000' : '#ccc', 
                border: 'none', 
                borderRadius: '8px', 
                textAlign: 'left', 
                fontWeight: '500', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                transition: 'all 0.2s'
              }}>
              <Terminal size={18} /> Endpoints
            </button>
            
