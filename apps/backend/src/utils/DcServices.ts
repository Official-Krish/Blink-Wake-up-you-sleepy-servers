import axios from "axios";

export const sendDiscordNotification = async (webhookUrl: string, name: string, url: string, TimeStamp: string) => {
  try {
    const payload = {
      content: `Dear ${name}, We noticed that your server associated with ${url} is currently down. This may impact your services, and we recommend checking your server status as soon as possible. 
        Details: 
        Server Name/IP: ${url} 
        Detected Downtime: ${TimeStamp} 
        Possible Causes: Network issues, configuration changes, or resource limitations. If this was unexpected, please check your server logs or restart your instance. If you need any assistance, feel free to reach out to our support team at support@gmail.com. We’re here to help! 
        Best regards, 
        Team INITBOT`, 
      username: "Server Monitor", 
      avatar_url: "https://i.imgur.com/4M34hi2.png",
    };

    const response = await axios.post(webhookUrl, payload);
    console.log("Discord notification sent:", response.status);
  } catch (error) {
    console.error("Error sending Discord notification:", error);
  }
};
