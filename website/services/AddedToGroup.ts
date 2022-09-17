import emailjs from "@emailjs/browser";

export const AddedToGroup = async (form: any) => {
  emailjs.sendForm(
    "service_c5ffuib",
    "template_o0j16ye",
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
