import React, { useEffect } from 'react'
import './chatbot.css'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
          "composerPlaceholder": "Chat with Fiscalful Bot",
          "botConversationDescription": "Your Personal Financial Advisor",
          "botId": "ede992fe-8a7a-42f2-8601-0406e42de8c8",
          "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
          "messagingUrl": "https://messaging.botpress.cloud",
          "clientId": "ede992fe-8a7a-42f2-8601-0406e42de8c8",
          "webhookId": "85c8b823-bd28-417c-970f-95909f5a0c2d",
          "lazySocket": true,
          "themeName": "prism",
          "botName": "Fiscalful Bot",
          "extraStylesheet": "https://github.com/ITSC4155MDSp24Group10/Fiscalful/tree/main/Frontend/src/Components/Chatbot/chatbot.css",
          "frontendVersion": "v1",
          "useSessionStorage": true,
          "enableConversationDeletion": true,
          "theme": "prism",
          "themeColor": "#2563eb"
  });
}
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot