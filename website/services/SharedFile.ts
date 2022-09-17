import emailjs from "@emailjs/browser";

export const SharedFile = async (form: any) => {
  emailjs.sendForm(
    "service_c5ffuib",
    "template_4xt9nrx",
    form,
    "VW7qAV_japRnKHmtF"
  )
  .then(
    () => {
      alert("Message sent successfully.")
    },
    () => {
      alert('Failed to send the message, please try again')
    });
};