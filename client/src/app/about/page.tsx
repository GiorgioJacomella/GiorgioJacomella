'use client'

import React from 'react'
import { useLocale } from '../../hooks/useLocale'
import { Button } from '../../components/ui/Button'
import { PageLayout } from '../../components/PageLayout'
import portraitImage from '../../assets/images/portrait.jpg'

export default function AboutPage() {
  const locale = useLocale()
  
  const renderSkills = () => (
    <div className="skills-section">
      <h3>{locale.about.skills.title}</h3>
      <div className="skills-grid">
        {locale.about.skills.items.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTimeline = () => (
    <div className="timeline">
      {locale.about.timeline.items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-bullet"></div>
          <div className="timeline-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
      
      <div className="timeline-end">
        <div className="timeline-line"></div>
        <div className="timeline-final">
          <h3>{locale.about.timeline.end.title}</h3>
          <p>{locale.about.timeline.end.description}</p>
          <Button to="/contact" variant="primary" size="medium" className="about-contact-btn">
            {locale.about.timeline.end.button}
          </Button>
        </div>
      </div>
    </div>
  )
  
  return (
    <PageLayout className="about-page">
      <div className="about-content">
        <div className="about-left">
          <div className="about-header">
            <div className="portrait-container">
              <img src={portraitImage.src} alt="Giorgio Jacomella Portrait" className="portrait" />
            </div>
            <div className="about-description">
              <h2>{locale.about.header.title}</h2>
              <p>{locale.about.header.description}</p>
            </div>
          </div>
          {renderSkills()}
        </div>
        
        <div className="about-right">
          <h3 className="timeline-title">{locale.about.timeline.title}</h3>
          {renderTimeline()}
        </div>
      </div>
    </PageLayout>
  )
}
