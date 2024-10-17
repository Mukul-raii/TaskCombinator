import * as React from 'react';
import { Html } from '@react-email/html';

const MailTemplate = ({ taskName, taskDescription, taskStatus, taskDueDate, taskPriority, assignTo }) => {
  return (
    <Html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center' }}>
            <h2 style={{ margin: '0', fontSize: '24px' }}>New Task Assigned to You!</h2>
          </div>

          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#333333', marginBottom: '10px' }}>Task: {taskName}</h3>
            <p style={{ color: '#666666', marginBottom: '8px' }}><strong>Description:</strong> {taskDescription}</p>
            <p style={{ color: '#666666', marginBottom: '8px' }}><strong>Status:</strong> {taskStatus}</p>
            <p style={{ color: '#666666', marginBottom: '8px' }}><strong>Due Date:</strong> {taskDueDate}</p>
            <p style={{ color: '#666666', marginBottom: '8px' }}><strong>Priority:</strong> <span style={{ fontWeight: 'bold', color: '#FF0000' }}>{taskPriority}</span></p>
            <p style={{ color: '#666666', marginBottom: '8px' }}><strong>Assigned by:</strong> {assignTo}</p>
         
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', color: '#666666', fontSize: '12px' }}>
            <p>Thank you for your hard work!</p>
            <p>– The TaskCombinator Team</p>
          </div>
        </div>
      </body>
    </Html>
  );
};

export default MailTemplate;
