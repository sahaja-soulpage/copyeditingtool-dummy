import React from 'react';

function PasswordSetEmailTemplate({username, link, text}) {
  return (
    <div>
      <div
        style={{
          background: '#eff1eb',
          height: '90%',
          width: '100%',
          fontFamily: 'inherit;font-size: 136%',
        }}
      >
        <br />
        <br />
        <div style={{padding: '18px'}}>
          Hi {username},<br />
          <br />
          <p style={{fontSize: '15px', color: '#707E8E', fontWeight: 'normal'}}>
            Please use below link to set your password.
          </p>
          <a href={link}>{text}</a>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default PasswordSetEmailTemplate;